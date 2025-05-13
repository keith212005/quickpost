'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

export const signInWithCredentials = async (formData: FormData) => {
  const { email, password } = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      const errorMessage =
        authErrorMessages[result?.error as keyof typeof authErrorMessages] ??
        result?.error ??
        'Login failed';

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: true,
      url: result.url,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      // Try to extract the cause if available
      const causeMessage =
        typeof error.cause === 'object' &&
        error.cause &&
        'err' in error.cause &&
        error.cause.err instanceof Error
          ? error.cause.err.message
          : null;

      const fallbackMessage =
        authErrorMessages[error.type] || 'Authentication failed';

      return {
        success: false,
        error: causeMessage || fallbackMessage,
      };
    }

    return {
      success: false,
      error: 'Unexpected error occurred',
    };
  }
};

const authErrorMessages: Record<string, string> = {
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
