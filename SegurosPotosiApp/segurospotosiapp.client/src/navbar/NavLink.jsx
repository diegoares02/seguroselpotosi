import { NavLink as BootstrapNavLink } from 'react-bootstrap';

const NavLink = ({ to, children, ...props }) => (
  <BootstrapNavLink to={to} {...props}>
    {children}
  </BootstrapNavLink>
);

export default NavLink;
