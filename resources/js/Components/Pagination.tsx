import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
  return (
    <nav className="mt-6">
      <ul className="pagination flex justify-center">
        {links.map((link, index) => (
          <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
            {link.url ? (
              <Link className="page-link" href={link.url}>
                {link.label}
              </Link>
            ) : (
              <span className="page-link">{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
