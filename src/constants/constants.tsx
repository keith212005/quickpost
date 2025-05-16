import { ColumnDef } from '@tanstack/react-table';

import { StatusTab } from '@/components/tables/StatusTab';
import { TUserSchema } from '@/types/dbTablesTypes';

export const ADMIN_DASHBOARD_TABS = [
  { value: 'overview', label: 'Overview', route: '/admin/dashboard/overview' },
  {
    value: 'analytics',
    label: 'Analytics',
    route: '/admin/dashboard/analytics',
  },
  { value: 'reports', label: 'Reports', route: '/admin/dashboard/reports' },
];

export const authErrorMessages: Record<string, string> = {
  CredentialsSignin: 'Invalid credentials',
  AccessDenied: 'Access denied',
  AccountNotLinked: 'Account not linked',
  AdapterError: 'Authentication adapter failed',
  CallbackRouteError: 'Login callback failed',
  DuplicateConditionalUI: 'UI misconfiguration detected',
  EmailSignInError: 'Email login failed',
  ErrorPageLoop: 'Login error page loop',
  EventError: 'Login event failed',
  ExperimentalFeatureNotEnabled: 'Experimental feature not enabled',
  InvalidCallbackUrl: 'Invalid callback URL',
  InvalidCheck: 'Security check failed',
  InvalidEndpoints: 'OAuth provider misconfigured',
  InvalidProvider: 'Unsupported auth provider',
  JWTSessionError: 'JWT session failed',
  MissingAdapter: 'Database adapter not found',
  MissingAdapterMethods: 'Missing adapter methods',
  MissingAuthorize: 'Missing credentials auth method',
  MissingCSRF: 'Missing CSRF token',
  MissingSecret: 'Auth secret missing',
  MissingWebAuthnAutocomplete: 'WebAuthn UI misconfigured',
  OAuthAccountNotLinked: 'OAuth account not linked',
  OAuthCallbackError: 'OAuth callback error',
  OAuthProfileParseError: 'OAuth profile parsing failed',
  OAuthSignInError: 'OAuth login failed',
  SessionTokenError: 'Session token issue',
  SignOutError: 'Logout failed',
  UnknownAction: 'Unknown login action',
  UnsupportedStrategy: 'Unsupported login strategy',
  UntrustedHost: 'Untrusted host',
  Verification: 'Email verification failed',
  WebAuthnVerificationError: 'WebAuthn failed',
};

export const USER_TABLE_COLUMNS: ColumnDef<TUserSchema>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    enableResizing: true,
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue();
      return (
        <div className='max-w-[100px] truncate sm:max-w-[150px] md:max-w-[200px]'>
          {value as string}
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    size: 100,
    cell: ({ getValue }) => {
      const isActive = getValue();
      return (
        <div className='flex items-center justify-center'>
          <StatusTab user={{ isActive } as TUserSchema} />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableResizing: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableResizing: true,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    enableResizing: true,
    size: 5,
  },
  {
    accessorKey: 'isOAuth',
    header: 'isOAuth',
    enableResizing: true,
    size: 5,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    enableResizing: true,
    size: 5,
    cell: ({ getValue }) => {
      const value = getValue();
      return <div className='max-w-[200px] truncate'>{value as string}</div>;
    },
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    enableResizing: true,
    size: 5,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return createdAt.toLocaleString();
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'createdAt',
    enableResizing: true,
    size: 5,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return createdAt.toLocaleString();
    },
  },
  {
    accessorKey: 'emailVerified',
    header: 'emailVerified',
    enableResizing: true,
    size: 5,
    cell: ({ getValue }) => {
      const value = getValue() as Date;
      return value?.toLocaleString();
    },
  },
];
