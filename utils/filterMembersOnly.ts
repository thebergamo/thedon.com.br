export function filterMembersOnly(nav: NavLinkType, isAuthenticated: boolean) {
  if (isAuthenticated) return true;

  return true;
  return !nav.link.page?.membersOnly.membersOnly;
}

export function filterAvailablePages({ link: { page } }: NavLinkType) {
  return typeof page !== 'string';
}
