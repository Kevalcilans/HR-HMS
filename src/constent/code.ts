export enum ErrorCodes {
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    DATABASE_CONNECTION_ERROR = 'DATABASE_CONNECTION_ERROR',
    DATABASE_QUERY_ERROR = 'DATABASE_QUERY_ERROR',
    AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
    AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
    SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
    THIRD_PARTY_SERVICE_ERROR = 'THIRD_PARTY_SERVICE_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
    CONFLICT = 'CONFLICT',
    TIMEOUT = 'TIMEOUT',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}
