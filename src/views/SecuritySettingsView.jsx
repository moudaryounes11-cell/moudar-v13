/* global MOUDAR */
import React, { useState } from 'react';

export default function SecuritySettingsView({ lang = 'fr' }) {
  const t = (fr, en) => (lang === 'fr' ? fr : en);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [encryptionEnabled, setEncryptionEnabled] = useState(
    localStorage.getItem('MOUDAR_E2EE_ENABLED') === 'true'
  );
  const [status, setStatus] = useState(null);
  const [testData, setTestData] = useState('');
  const [encryptedResult, setEncryptedResult] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');

  const isSupported = MOUDAR.Crypto.isSupported();

  // Enable/disable encryption
  const toggleEncryption = () => {
    if (!encryptionEnabled && password.length < 8) {
      setStatus({
        type: 'error',
        message: t(
          'Le mot de passe doit contenir au moins 8 caractères',
          'Password must be at least 8 characters'
        ),
      });
      return;
    }
    if (!encryptionEnabled && password !== confirmPassword) {
      setStatus({
        type: 'error',
        message: t(
          'Les mots de passe ne correspondent pas',
          'Passwords do not match'
        ),
      });
      return;
    }
    const newState = !encryptionEnabled;
    setEncryptionEnabled(newState);
    localStorage.setItem('MOUDAR_E2EE_ENABLED', newState.toString());
    if (newState) {
      // Store password hash (not the password itself)
      MOUDAR.Crypto.hash(password).then((hash) => {
        localStorage.setItem('MOUDAR_E2EE_HASH', hash);
        setStatus({
          type: 'success',
          message: t('Chiffrement E2E activé', 'E2E Encryption enabled'),
        });
        MOUDAR.Feedback.success(
          t('Chiffrement E2E activé', 'E2E Encryption enabled')
        );
      });
    } else {
      localStorage.removeItem('MOUDAR_E2EE_HASH');
      setStatus({
        type: 'info',
        message: t('Chiffrement E2E désactivé', 'E2E Encryption disabled'),
      });
      MOUDAR.Feedback.info(
        t('Chiffrement E2E désactivé', 'E2E Encryption disabled')
      );
    }
    setPassword('');
    setConfirmPassword('');
  };

  // Test encryption
  const testEncrypt = async () => {
    if (!testData || !password) {
      setStatus({
        type: 'error',
        message: t(
          'Entrez des données et un mot de passe',
          'Enter data and password'
        ),
      });
      return;
    }
    try {
      const encrypted = await MOUDAR.Crypto.encrypt(
        {
          data: testData,
          timestamp: Date.now(),
        },
        password
      );
      setEncryptedResult(encrypted);
      setStatus({
        type: 'success',
        message: t(
          'Données chiffrées avec succès',
          'Data encrypted successfully'
        ),
      });
    } catch (e) {
      setStatus({
        type: 'error',
        message:
          t('Erreur de chiffrement: ', 'Encryption error: ') + e.message,
      });
    }
  };

  // Test decryption
  const testDecrypt = async () => {
    if (!encryptedResult || !password) {
      setStatus({
        type: 'error',
        message: t('Aucune donnée à déchiffrer', 'No data to decrypt'),
      });
      return;
    }
    try {
      const decrypted = await MOUDAR.Crypto.decrypt(encryptedResult, password);
      setDecryptedResult(JSON.stringify(decrypted, null, 2));
      setStatus({
        type: 'success',
        message: t(
          'Données déchiffrées avec succès',
          'Data decrypted successfully'
        ),
      });
    } catch (e) {
      setStatus({
        type: 'error',
        message: t(
          'Erreur de déchiffrement (mauvais mot de passe?)',
          'Decryption error (wrong password?)'
        ),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{'\uD83D\uDD10'}</span>
          <div>
            <h1 className="text-2xl font-bold">
              {t('Sécurité & Chiffrement', 'Security & Encryption')}
            </h1>
            <p className="text-slate-300">
              {t(
                'Chiffrement de bout en bout AES-256-GCM pour données sensibles',
                'End-to-End AES-256-GCM encryption for sensitive data'
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span
            className={
              'px-3 py-1 rounded-full text-sm ' +
              (isSupported
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300')
            }
          >
            {isSupported ? '\u2713 Web Crypto API' : '\u2717 Web Crypto API'}
          </span>
          <span
            className={
              'px-3 py-1 rounded-full text-sm ' +
              (encryptionEnabled
                ? 'bg-green-500/20 text-green-300'
                : 'bg-slate-500/20 text-slate-300')
            }
          >
            {encryptionEnabled
              ? '\uD83D\uDD12 E2EE Actif'
              : '\uD83D\uDD13 E2EE Inactif'}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
            v11.0 Scientific Excellence
          </span>
        </div>
      </div>

      {/* Status alert */}
      {status && (
        <div
          className={
            'p-4 rounded-xl flex items-center gap-3 ' +
            (status.type === 'success'
              ? 'bg-green-100 text-green-800'
              : status.type === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800')
          }
        >
          <span className="text-xl">
            {status.type === 'success'
              ? '\u2713'
              : status.type === 'error'
                ? '\u2717'
                : '\u2139'}
          </span>
          <span>{status.message}</span>
        </div>
      )}

      {/* Enable E2E Encryption section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          {'\uD83D\uDD12'} {t('Activer le chiffrement E2E', 'Enable E2E Encryption')}
        </h2>

        {!encryptionEnabled ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t(
                  'Mot de passe maître (min. 8 caractères)',
                  'Master password (min. 8 characters)'
                )}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('Confirmer le mot de passe', 'Confirm password')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500"
                placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
              />
            </div>
            <button
              onClick={toggleEncryption}
              disabled={!isSupported}
              className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 transition disabled:opacity-50"
            >
              {'\uD83D\uDD10'} {t('Activer le chiffrement E2E', 'Enable E2E Encryption')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <span className="text-2xl">{'\u2713'}</span>
                <span className="font-medium">
                  {t('Chiffrement E2E actif', 'E2E Encryption active')}
                </span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                {t(
                  'Vos projets sensibles sont protégés par AES-256-GCM',
                  'Your sensitive projects are protected by AES-256-GCM'
                )}
              </p>
            </div>
            <button
              onClick={toggleEncryption}
              className="w-full py-3 bg-red-100 text-red-700 font-semibold rounded-xl hover:bg-red-200 transition"
            >
              {'\uD83D\uDD13'} {t('Désactiver le chiffrement', 'Disable encryption')}
            </button>
          </div>
        )}
      </div>

      {/* Test Encryption section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          {'\uD83E\uDDEA'} {t('Tester le chiffrement', 'Test Encryption')}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Encrypt column */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">
              {t('1. Chiffrer', '1. Encrypt')}
            </h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg text-sm"
              placeholder={t('Mot de passe', 'Password')}
            />
            <textarea
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              className="w-full p-2 border rounded-lg text-sm"
              rows="3"
              placeholder={t('Données à chiffrer...', 'Data to encrypt...')}
            />
            <button
              onClick={testEncrypt}
              className="w-full py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 text-sm"
            >
              {'\uD83D\uDD12'} {t('Chiffrer', 'Encrypt')}
            </button>
            {encryptedResult && (
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">
                  {t('Résultat chiffré:', 'Encrypted result:')}
                </p>
                <code className="text-xs break-all">
                  {encryptedResult.substring(0, 100)}...
                </code>
              </div>
            )}
          </div>

          {/* Decrypt column */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">
              {t('2. Déchiffrer', '2. Decrypt')}
            </h3>
            <button
              onClick={testDecrypt}
              disabled={!encryptedResult}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm disabled:opacity-50"
            >
              {'\uD83D\uDD13'} {t('Déchiffrer', 'Decrypt')}
            </button>
            {decryptedResult && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-700 mb-1">
                  {t('Résultat déchiffré:', 'Decrypted result:')}
                </p>
                <pre className="text-xs text-green-800 whitespace-pre-wrap">
                  {decryptedResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Specifications */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          {'\uD83D\uDCCB'} {t('Spécifications de sécurité', 'Security Specifications')}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border">
            <div className="text-2xl mb-2">{'\uD83D\uDD10'}</div>
            <h3 className="font-medium text-gray-800">AES-256-GCM</h3>
            <p className="text-sm text-gray-600">
              {t(
                'Algorithme de chiffrement authentifié',
                'Authenticated encryption algorithm'
              )}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <div className="text-2xl mb-2">{'\uD83D\uDD11'}</div>
            <h3 className="font-medium text-gray-800">PBKDF2</h3>
            <p className="text-sm text-gray-600">
              {t(
                'Dérivation de clé (100k itérations)',
                'Key derivation (100k iterations)'
              )}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border">
            <div className="text-2xl mb-2">{'\uD83D\uDEE1\uFE0F'}</div>
            <h3 className="font-medium text-gray-800">SHA-256</h3>
            <p className="text-sm text-gray-600">
              {t('Hachage pour intégrité', 'Hashing for integrity')}
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            {'\u26A0\uFE0F'}{' '}
            {t(
              "Important: Le mot de passe n'est JAMAIS stocké ni transmis. Si vous l'oubliez, les données chiffrées seront irrécupérables.",
              'Important: The password is NEVER stored or transmitted. If you forget it, encrypted data will be unrecoverable.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
