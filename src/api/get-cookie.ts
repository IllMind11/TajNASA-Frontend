/* eslint-disable no-useless-escape */
export function getCookie(name: string) {
  function escape(s: string) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  }

  const match = document.cookie.match(
    RegExp(`(?:^|;\\s*)${escape(name)}=([^;]*)`),
  );

  return match ? match[1] : null;
}
