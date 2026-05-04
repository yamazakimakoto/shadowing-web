'use strict';

(function () {
  const SAVED_KEY  = 'shadowing_saved_model';
  const PACKS_KEY  = 'shadowing_pack_library';
  const ACTIVE_KEY = 'shadowing_active_pack';

  // ── エクスポート ──
  function exportBackup() {
    const savedTexts = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
    const packLib    = JSON.parse(localStorage.getItem(PACKS_KEY) || '[]');
    const activePack = localStorage.getItem(ACTIVE_KEY) || 'default';

    const backup = {
      app:        'shadowing-web',
      version:    '1.0',
      exportedAt: new Date().toISOString(),
      deviceId:   window.ShadowingAuth?.getDeviceId() || '',
      data: { savedTexts, packLibrary: packLib, activePackId: activePack }
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `shadowing-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    return { savedTexts: savedTexts.length, packs: packLib.length };
  }

  // ── インポート（ファイルから読み込み・検証のみ）──
  function importBackup(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const backup = JSON.parse(e.target.result);
          if (backup.app !== 'shadowing-web' || !backup.data) {
            throw new Error('このファイルはシャドウイングアプリのバックアップではありません');
          }
          const { savedTexts = [], packLibrary = [], activePackId = 'default' } = backup.data;
          resolve({
            savedTexts,
            packLibrary,
            activePackId,
            exportedAt: backup.exportedAt,
            fromDeviceId: backup.deviceId
          });
        } catch (err) { reject(err); }
      };
      reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
      reader.readAsText(file, 'utf-8');
    });
  }

  // ── 適用（localStorage に書き込み）──
  function applyBackup({ savedTexts, packLibrary, activePackId }) {
    localStorage.setItem(SAVED_KEY,  JSON.stringify(savedTexts));
    localStorage.setItem(PACKS_KEY,  JSON.stringify(packLibrary));
    localStorage.setItem(ACTIVE_KEY, activePackId);
  }

  window.ShadowingBackup = { exportBackup, importBackup, applyBackup };
})();
