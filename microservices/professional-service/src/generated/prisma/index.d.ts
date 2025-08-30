
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Professional
 * 
 */
export type Professional = $Result.DefaultSelection<Prisma.$ProfessionalPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ProfessionalLicense
 * 
 */
export type ProfessionalLicense = $Result.DefaultSelection<Prisma.$ProfessionalLicensePayload>
/**
 * Model ProfessionalSpecialization
 * 
 */
export type ProfessionalSpecialization = $Result.DefaultSelection<Prisma.$ProfessionalSpecializationPayload>
/**
 * Model ProfessionalAffiliation
 * 
 */
export type ProfessionalAffiliation = $Result.DefaultSelection<Prisma.$ProfessionalAffiliationPayload>
/**
 * Model ProfessionalCredential
 * 
 */
export type ProfessionalCredential = $Result.DefaultSelection<Prisma.$ProfessionalCredentialPayload>
/**
 * Model ProfessionalAvailability
 * 
 */
export type ProfessionalAvailability = $Result.DefaultSelection<Prisma.$ProfessionalAvailabilityPayload>
/**
 * Model ProfessionalReview
 * 
 */
export type ProfessionalReview = $Result.DefaultSelection<Prisma.$ProfessionalReviewPayload>
/**
 * Model UserSession
 * 
 */
export type UserSession = $Result.DefaultSelection<Prisma.$UserSessionPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model ProfessionalStatistic
 * 
 */
export type ProfessionalStatistic = $Result.DefaultSelection<Prisma.$ProfessionalStatisticPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProfessionalLevel: {
  RESIDENT: 'RESIDENT',
  FELLOW: 'FELLOW',
  ATTENDING: 'ATTENDING',
  PROFESSOR: 'PROFESSOR',
  EMERITUS: 'EMERITUS'
};

export type ProfessionalLevel = (typeof ProfessionalLevel)[keyof typeof ProfessionalLevel]


export const VerificationStatus: {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED',
  EXPIRED: 'EXPIRED'
};

export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus]


export const SpecializationLevel: {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  FELLOWSHIP: 'FELLOWSHIP',
  BOARD_CERTIFIED: 'BOARD_CERTIFIED'
};

export type SpecializationLevel = (typeof SpecializationLevel)[keyof typeof SpecializationLevel]


export const AvailabilityStatus: {
  AVAILABLE: 'AVAILABLE',
  BUSY: 'BUSY',
  AWAY: 'AWAY',
  DO_NOT_DISTURB: 'DO_NOT_DISTURB',
  OFFLINE: 'OFFLINE'
};

export type AvailabilityStatus = (typeof AvailabilityStatus)[keyof typeof AvailabilityStatus]


export const CommunicationChannel: {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  PHONE: 'PHONE',
  IN_APP: 'IN_APP'
};

export type CommunicationChannel = (typeof CommunicationChannel)[keyof typeof CommunicationChannel]

}

export type ProfessionalLevel = $Enums.ProfessionalLevel

export const ProfessionalLevel: typeof $Enums.ProfessionalLevel

export type VerificationStatus = $Enums.VerificationStatus

export const VerificationStatus: typeof $Enums.VerificationStatus

export type SpecializationLevel = $Enums.SpecializationLevel

export const SpecializationLevel: typeof $Enums.SpecializationLevel

export type AvailabilityStatus = $Enums.AvailabilityStatus

export const AvailabilityStatus: typeof $Enums.AvailabilityStatus

export type CommunicationChannel = $Enums.CommunicationChannel

export const CommunicationChannel: typeof $Enums.CommunicationChannel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Professionals
 * const professionals = await prisma.professional.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Professionals
   * const professionals = await prisma.professional.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.professional`: Exposes CRUD operations for the **Professional** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Professionals
    * const professionals = await prisma.professional.findMany()
    * ```
    */
  get professional(): Prisma.ProfessionalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalLicense`: Exposes CRUD operations for the **ProfessionalLicense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalLicenses
    * const professionalLicenses = await prisma.professionalLicense.findMany()
    * ```
    */
  get professionalLicense(): Prisma.ProfessionalLicenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalSpecialization`: Exposes CRUD operations for the **ProfessionalSpecialization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalSpecializations
    * const professionalSpecializations = await prisma.professionalSpecialization.findMany()
    * ```
    */
  get professionalSpecialization(): Prisma.ProfessionalSpecializationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalAffiliation`: Exposes CRUD operations for the **ProfessionalAffiliation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalAffiliations
    * const professionalAffiliations = await prisma.professionalAffiliation.findMany()
    * ```
    */
  get professionalAffiliation(): Prisma.ProfessionalAffiliationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalCredential`: Exposes CRUD operations for the **ProfessionalCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalCredentials
    * const professionalCredentials = await prisma.professionalCredential.findMany()
    * ```
    */
  get professionalCredential(): Prisma.ProfessionalCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalAvailability`: Exposes CRUD operations for the **ProfessionalAvailability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalAvailabilities
    * const professionalAvailabilities = await prisma.professionalAvailability.findMany()
    * ```
    */
  get professionalAvailability(): Prisma.ProfessionalAvailabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalReview`: Exposes CRUD operations for the **ProfessionalReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalReviews
    * const professionalReviews = await prisma.professionalReview.findMany()
    * ```
    */
  get professionalReview(): Prisma.ProfessionalReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSession`: Exposes CRUD operations for the **UserSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSessions
    * const userSessions = await prisma.userSession.findMany()
    * ```
    */
  get userSession(): Prisma.UserSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalStatistic`: Exposes CRUD operations for the **ProfessionalStatistic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalStatistics
    * const professionalStatistics = await prisma.professionalStatistic.findMany()
    * ```
    */
  get professionalStatistic(): Prisma.ProfessionalStatisticDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Professional: 'Professional',
    User: 'User',
    ProfessionalLicense: 'ProfessionalLicense',
    ProfessionalSpecialization: 'ProfessionalSpecialization',
    ProfessionalAffiliation: 'ProfessionalAffiliation',
    ProfessionalCredential: 'ProfessionalCredential',
    ProfessionalAvailability: 'ProfessionalAvailability',
    ProfessionalReview: 'ProfessionalReview',
    UserSession: 'UserSession',
    AuditLog: 'AuditLog',
    ProfessionalStatistic: 'ProfessionalStatistic'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "professional" | "user" | "professionalLicense" | "professionalSpecialization" | "professionalAffiliation" | "professionalCredential" | "professionalAvailability" | "professionalReview" | "userSession" | "auditLog" | "professionalStatistic"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Professional: {
        payload: Prisma.$ProfessionalPayload<ExtArgs>
        fields: Prisma.ProfessionalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          findMany: {
            args: Prisma.ProfessionalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>[]
          }
          create: {
            args: Prisma.ProfessionalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          createMany: {
            args: Prisma.ProfessionalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          update: {
            args: Prisma.ProfessionalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessional>
          }
          groupBy: {
            args: Prisma.ProfessionalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalLicense: {
        payload: Prisma.$ProfessionalLicensePayload<ExtArgs>
        fields: Prisma.ProfessionalLicenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalLicenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalLicenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          findFirst: {
            args: Prisma.ProfessionalLicenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalLicenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          findMany: {
            args: Prisma.ProfessionalLicenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>[]
          }
          create: {
            args: Prisma.ProfessionalLicenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          createMany: {
            args: Prisma.ProfessionalLicenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalLicenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>[]
          }
          delete: {
            args: Prisma.ProfessionalLicenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          update: {
            args: Prisma.ProfessionalLicenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalLicenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalLicenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalLicenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalLicenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalLicensePayload>
          }
          aggregate: {
            args: Prisma.ProfessionalLicenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalLicense>
          }
          groupBy: {
            args: Prisma.ProfessionalLicenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalLicenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalLicenseCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalLicenseCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalSpecialization: {
        payload: Prisma.$ProfessionalSpecializationPayload<ExtArgs>
        fields: Prisma.ProfessionalSpecializationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalSpecializationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalSpecializationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalSpecializationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalSpecializationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>
          }
          findMany: {
            args: Prisma.ProfessionalSpecializationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>[]
          }
          create: {
            args: Prisma.ProfessionalSpecializationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>
          }
          createMany: {
            args: Prisma.ProfessionalSpecializationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalSpecializationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalSpecializationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>
          }
          update: {
            args: Prisma.ProfessionalSpecializationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalSpecializationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalSpecializationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalSpecializationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalSpecializationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSpecializationPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalSpecializationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalSpecialization>
          }
          groupBy: {
            args: Prisma.ProfessionalSpecializationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalSpecializationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalSpecializationCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalSpecializationCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalAffiliation: {
        payload: Prisma.$ProfessionalAffiliationPayload<ExtArgs>
        fields: Prisma.ProfessionalAffiliationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalAffiliationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalAffiliationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalAffiliationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalAffiliationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          findMany: {
            args: Prisma.ProfessionalAffiliationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>[]
          }
          create: {
            args: Prisma.ProfessionalAffiliationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          createMany: {
            args: Prisma.ProfessionalAffiliationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalAffiliationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalAffiliationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          update: {
            args: Prisma.ProfessionalAffiliationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalAffiliationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalAffiliationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalAffiliationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalAffiliationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAffiliationPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalAffiliationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalAffiliation>
          }
          groupBy: {
            args: Prisma.ProfessionalAffiliationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalAffiliationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalAffiliationCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalAffiliationCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalCredential: {
        payload: Prisma.$ProfessionalCredentialPayload<ExtArgs>
        fields: Prisma.ProfessionalCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>
          }
          findMany: {
            args: Prisma.ProfessionalCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>[]
          }
          create: {
            args: Prisma.ProfessionalCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>
          }
          createMany: {
            args: Prisma.ProfessionalCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>
          }
          update: {
            args: Prisma.ProfessionalCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCredentialPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalCredential>
          }
          groupBy: {
            args: Prisma.ProfessionalCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalCredentialCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalAvailability: {
        payload: Prisma.$ProfessionalAvailabilityPayload<ExtArgs>
        fields: Prisma.ProfessionalAvailabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalAvailabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalAvailabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalAvailabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalAvailabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>
          }
          findMany: {
            args: Prisma.ProfessionalAvailabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>[]
          }
          create: {
            args: Prisma.ProfessionalAvailabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>
          }
          createMany: {
            args: Prisma.ProfessionalAvailabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalAvailabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalAvailabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>
          }
          update: {
            args: Prisma.ProfessionalAvailabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalAvailabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalAvailabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalAvailabilityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalAvailabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalAvailabilityPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalAvailabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalAvailability>
          }
          groupBy: {
            args: Prisma.ProfessionalAvailabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalAvailabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalAvailabilityCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalAvailabilityCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalReview: {
        payload: Prisma.$ProfessionalReviewPayload<ExtArgs>
        fields: Prisma.ProfessionalReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>
          }
          findMany: {
            args: Prisma.ProfessionalReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>[]
          }
          create: {
            args: Prisma.ProfessionalReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>
          }
          createMany: {
            args: Prisma.ProfessionalReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>
          }
          update: {
            args: Prisma.ProfessionalReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalReviewPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalReview>
          }
          groupBy: {
            args: Prisma.ProfessionalReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalReviewCountAggregateOutputType> | number
          }
        }
      }
      UserSession: {
        payload: Prisma.$UserSessionPayload<ExtArgs>
        fields: Prisma.UserSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findFirst: {
            args: Prisma.UserSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          findMany: {
            args: Prisma.UserSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          create: {
            args: Prisma.UserSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          createMany: {
            args: Prisma.UserSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          delete: {
            args: Prisma.UserSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          update: {
            args: Prisma.UserSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          deleteMany: {
            args: Prisma.UserSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>[]
          }
          upsert: {
            args: Prisma.UserSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSessionPayload>
          }
          aggregate: {
            args: Prisma.UserSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSession>
          }
          groupBy: {
            args: Prisma.UserSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSessionCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalStatistic: {
        payload: Prisma.$ProfessionalStatisticPayload<ExtArgs>
        fields: Prisma.ProfessionalStatisticFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalStatisticFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalStatisticFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalStatisticFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalStatisticFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>
          }
          findMany: {
            args: Prisma.ProfessionalStatisticFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>[]
          }
          create: {
            args: Prisma.ProfessionalStatisticCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>
          }
          createMany: {
            args: Prisma.ProfessionalStatisticCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalStatisticCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalStatisticDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>
          }
          update: {
            args: Prisma.ProfessionalStatisticUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalStatisticDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalStatisticUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalStatisticUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalStatisticUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalStatisticPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalStatisticAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalStatistic>
          }
          groupBy: {
            args: Prisma.ProfessionalStatisticGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalStatisticGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalStatisticCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalStatisticCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    professional?: ProfessionalOmit
    user?: UserOmit
    professionalLicense?: ProfessionalLicenseOmit
    professionalSpecialization?: ProfessionalSpecializationOmit
    professionalAffiliation?: ProfessionalAffiliationOmit
    professionalCredential?: ProfessionalCredentialOmit
    professionalAvailability?: ProfessionalAvailabilityOmit
    professionalReview?: ProfessionalReviewOmit
    userSession?: UserSessionOmit
    auditLog?: AuditLogOmit
    professionalStatistic?: ProfessionalStatisticOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfessionalCountOutputType
   */

  export type ProfessionalCountOutputType = {
    licenses: number
    specializations: number
    affiliations: number
    credentials: number
    availability: number
    reviews: number
  }

  export type ProfessionalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    licenses?: boolean | ProfessionalCountOutputTypeCountLicensesArgs
    specializations?: boolean | ProfessionalCountOutputTypeCountSpecializationsArgs
    affiliations?: boolean | ProfessionalCountOutputTypeCountAffiliationsArgs
    credentials?: boolean | ProfessionalCountOutputTypeCountCredentialsArgs
    availability?: boolean | ProfessionalCountOutputTypeCountAvailabilityArgs
    reviews?: boolean | ProfessionalCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCountOutputType
     */
    select?: ProfessionalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountLicensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalLicenseWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountSpecializationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalSpecializationWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountAffiliationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalAffiliationWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalCredentialWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountAvailabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalAvailabilityWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalReviewWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Professional
   */

  export type AggregateProfessional = {
    _count: ProfessionalCountAggregateOutputType | null
    _avg: ProfessionalAvgAggregateOutputType | null
    _sum: ProfessionalSumAggregateOutputType | null
    _min: ProfessionalMinAggregateOutputType | null
    _max: ProfessionalMaxAggregateOutputType | null
  }

  export type ProfessionalAvgAggregateOutputType = {
    yearsOfExperience: number | null
    maxCaseLoad: number | null
    currentCaseCount: number | null
  }

  export type ProfessionalSumAggregateOutputType = {
    yearsOfExperience: number | null
    maxCaseLoad: number | null
    currentCaseCount: number | null
  }

  export type ProfessionalMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    alternateEmail: string | null
    title: string | null
    level: $Enums.ProfessionalLevel | null
    yearsOfExperience: number | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    verifiedBy: string | null
    suspendedAt: Date | null
    suspendedUntil: Date | null
    suspensionReason: string | null
    biography: string | null
    availabilityStatus: $Enums.AvailabilityStatus | null
    maxCaseLoad: number | null
    currentCaseCount: number | null
    preferredCommunication: $Enums.CommunicationChannel | null
    timeZone: string | null
    profilePictureUrl: string | null
    profileVisibility: string | null
    acceptsNewCases: boolean | null
    requiresPreApproval: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    alternateEmail: string | null
    title: string | null
    level: $Enums.ProfessionalLevel | null
    yearsOfExperience: number | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    verifiedBy: string | null
    suspendedAt: Date | null
    suspendedUntil: Date | null
    suspensionReason: string | null
    biography: string | null
    availabilityStatus: $Enums.AvailabilityStatus | null
    maxCaseLoad: number | null
    currentCaseCount: number | null
    preferredCommunication: $Enums.CommunicationChannel | null
    timeZone: string | null
    profilePictureUrl: string | null
    profileVisibility: string | null
    acceptsNewCases: boolean | null
    requiresPreApproval: boolean | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalCountAggregateOutputType = {
    id: number
    firstName: number
    middleName: number
    lastName: number
    email: number
    phone: number
    alternateEmail: number
    title: number
    level: number
    yearsOfExperience: number
    verificationStatus: number
    verifiedAt: number
    verifiedBy: number
    suspendedAt: number
    suspendedUntil: number
    suspensionReason: number
    biography: number
    expertise: number
    researchInterests: number
    publications: number
    awards: number
    availabilityStatus: number
    maxCaseLoad: number
    currentCaseCount: number
    preferredCommunication: number
    timeZone: number
    workingHours: number
    profilePictureUrl: number
    profileVisibility: number
    acceptsNewCases: number
    requiresPreApproval: number
    userId: number
    metadata: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalAvgAggregateInputType = {
    yearsOfExperience?: true
    maxCaseLoad?: true
    currentCaseCount?: true
  }

  export type ProfessionalSumAggregateInputType = {
    yearsOfExperience?: true
    maxCaseLoad?: true
    currentCaseCount?: true
  }

  export type ProfessionalMinAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    email?: true
    phone?: true
    alternateEmail?: true
    title?: true
    level?: true
    yearsOfExperience?: true
    verificationStatus?: true
    verifiedAt?: true
    verifiedBy?: true
    suspendedAt?: true
    suspendedUntil?: true
    suspensionReason?: true
    biography?: true
    availabilityStatus?: true
    maxCaseLoad?: true
    currentCaseCount?: true
    preferredCommunication?: true
    timeZone?: true
    profilePictureUrl?: true
    profileVisibility?: true
    acceptsNewCases?: true
    requiresPreApproval?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalMaxAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    email?: true
    phone?: true
    alternateEmail?: true
    title?: true
    level?: true
    yearsOfExperience?: true
    verificationStatus?: true
    verifiedAt?: true
    verifiedBy?: true
    suspendedAt?: true
    suspendedUntil?: true
    suspensionReason?: true
    biography?: true
    availabilityStatus?: true
    maxCaseLoad?: true
    currentCaseCount?: true
    preferredCommunication?: true
    timeZone?: true
    profilePictureUrl?: true
    profileVisibility?: true
    acceptsNewCases?: true
    requiresPreApproval?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalCountAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    email?: true
    phone?: true
    alternateEmail?: true
    title?: true
    level?: true
    yearsOfExperience?: true
    verificationStatus?: true
    verifiedAt?: true
    verifiedBy?: true
    suspendedAt?: true
    suspendedUntil?: true
    suspensionReason?: true
    biography?: true
    expertise?: true
    researchInterests?: true
    publications?: true
    awards?: true
    availabilityStatus?: true
    maxCaseLoad?: true
    currentCaseCount?: true
    preferredCommunication?: true
    timeZone?: true
    workingHours?: true
    profilePictureUrl?: true
    profileVisibility?: true
    acceptsNewCases?: true
    requiresPreApproval?: true
    userId?: true
    metadata?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professional to aggregate.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Professionals
    **/
    _count?: true | ProfessionalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessionalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessionalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalMaxAggregateInputType
  }

  export type GetProfessionalAggregateType<T extends ProfessionalAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessional]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessional[P]>
      : GetScalarType<T[P], AggregateProfessional[P]>
  }




  export type ProfessionalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalWhereInput
    orderBy?: ProfessionalOrderByWithAggregationInput | ProfessionalOrderByWithAggregationInput[]
    by: ProfessionalScalarFieldEnum[] | ProfessionalScalarFieldEnum
    having?: ProfessionalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalCountAggregateInputType | true
    _avg?: ProfessionalAvgAggregateInputType
    _sum?: ProfessionalSumAggregateInputType
    _min?: ProfessionalMinAggregateInputType
    _max?: ProfessionalMaxAggregateInputType
  }

  export type ProfessionalGroupByOutputType = {
    id: string
    firstName: string
    middleName: string | null
    lastName: string
    email: string
    phone: string | null
    alternateEmail: string | null
    title: string | null
    level: $Enums.ProfessionalLevel
    yearsOfExperience: number | null
    verificationStatus: $Enums.VerificationStatus
    verifiedAt: Date | null
    verifiedBy: string | null
    suspendedAt: Date | null
    suspendedUntil: Date | null
    suspensionReason: string | null
    biography: string | null
    expertise: string[]
    researchInterests: string[]
    publications: JsonValue | null
    awards: JsonValue | null
    availabilityStatus: $Enums.AvailabilityStatus
    maxCaseLoad: number | null
    currentCaseCount: number
    preferredCommunication: $Enums.CommunicationChannel
    timeZone: string | null
    workingHours: JsonValue | null
    profilePictureUrl: string | null
    profileVisibility: string
    acceptsNewCases: boolean
    requiresPreApproval: boolean
    userId: string | null
    metadata: JsonValue | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalCountAggregateOutputType | null
    _avg: ProfessionalAvgAggregateOutputType | null
    _sum: ProfessionalSumAggregateOutputType | null
    _min: ProfessionalMinAggregateOutputType | null
    _max: ProfessionalMaxAggregateOutputType | null
  }

  type GetProfessionalGroupByPayload<T extends ProfessionalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    alternateEmail?: boolean
    title?: boolean
    level?: boolean
    yearsOfExperience?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    suspendedAt?: boolean
    suspendedUntil?: boolean
    suspensionReason?: boolean
    biography?: boolean
    expertise?: boolean
    researchInterests?: boolean
    publications?: boolean
    awards?: boolean
    availabilityStatus?: boolean
    maxCaseLoad?: boolean
    currentCaseCount?: boolean
    preferredCommunication?: boolean
    timeZone?: boolean
    workingHours?: boolean
    profilePictureUrl?: boolean
    profileVisibility?: boolean
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Professional$userArgs<ExtArgs>
    licenses?: boolean | Professional$licensesArgs<ExtArgs>
    specializations?: boolean | Professional$specializationsArgs<ExtArgs>
    affiliations?: boolean | Professional$affiliationsArgs<ExtArgs>
    credentials?: boolean | Professional$credentialsArgs<ExtArgs>
    availability?: boolean | Professional$availabilityArgs<ExtArgs>
    reviews?: boolean | Professional$reviewsArgs<ExtArgs>
    _count?: boolean | ProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professional"]>

  export type ProfessionalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    alternateEmail?: boolean
    title?: boolean
    level?: boolean
    yearsOfExperience?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    suspendedAt?: boolean
    suspendedUntil?: boolean
    suspensionReason?: boolean
    biography?: boolean
    expertise?: boolean
    researchInterests?: boolean
    publications?: boolean
    awards?: boolean
    availabilityStatus?: boolean
    maxCaseLoad?: boolean
    currentCaseCount?: boolean
    preferredCommunication?: boolean
    timeZone?: boolean
    workingHours?: boolean
    profilePictureUrl?: boolean
    profileVisibility?: boolean
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Professional$userArgs<ExtArgs>
  }, ExtArgs["result"]["professional"]>

  export type ProfessionalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    alternateEmail?: boolean
    title?: boolean
    level?: boolean
    yearsOfExperience?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    suspendedAt?: boolean
    suspendedUntil?: boolean
    suspensionReason?: boolean
    biography?: boolean
    expertise?: boolean
    researchInterests?: boolean
    publications?: boolean
    awards?: boolean
    availabilityStatus?: boolean
    maxCaseLoad?: boolean
    currentCaseCount?: boolean
    preferredCommunication?: boolean
    timeZone?: boolean
    workingHours?: boolean
    profilePictureUrl?: boolean
    profileVisibility?: boolean
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Professional$userArgs<ExtArgs>
  }, ExtArgs["result"]["professional"]>

  export type ProfessionalSelectScalar = {
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    alternateEmail?: boolean
    title?: boolean
    level?: boolean
    yearsOfExperience?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verifiedBy?: boolean
    suspendedAt?: boolean
    suspendedUntil?: boolean
    suspensionReason?: boolean
    biography?: boolean
    expertise?: boolean
    researchInterests?: boolean
    publications?: boolean
    awards?: boolean
    availabilityStatus?: boolean
    maxCaseLoad?: boolean
    currentCaseCount?: boolean
    preferredCommunication?: boolean
    timeZone?: boolean
    workingHours?: boolean
    profilePictureUrl?: boolean
    profileVisibility?: boolean
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "middleName" | "lastName" | "email" | "phone" | "alternateEmail" | "title" | "level" | "yearsOfExperience" | "verificationStatus" | "verifiedAt" | "verifiedBy" | "suspendedAt" | "suspendedUntil" | "suspensionReason" | "biography" | "expertise" | "researchInterests" | "publications" | "awards" | "availabilityStatus" | "maxCaseLoad" | "currentCaseCount" | "preferredCommunication" | "timeZone" | "workingHours" | "profilePictureUrl" | "profileVisibility" | "acceptsNewCases" | "requiresPreApproval" | "userId" | "metadata" | "tags" | "createdAt" | "updatedAt", ExtArgs["result"]["professional"]>
  export type ProfessionalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Professional$userArgs<ExtArgs>
    licenses?: boolean | Professional$licensesArgs<ExtArgs>
    specializations?: boolean | Professional$specializationsArgs<ExtArgs>
    affiliations?: boolean | Professional$affiliationsArgs<ExtArgs>
    credentials?: boolean | Professional$credentialsArgs<ExtArgs>
    availability?: boolean | Professional$availabilityArgs<ExtArgs>
    reviews?: boolean | Professional$reviewsArgs<ExtArgs>
    _count?: boolean | ProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfessionalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Professional$userArgs<ExtArgs>
  }
  export type ProfessionalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Professional$userArgs<ExtArgs>
  }

  export type $ProfessionalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Professional"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      licenses: Prisma.$ProfessionalLicensePayload<ExtArgs>[]
      specializations: Prisma.$ProfessionalSpecializationPayload<ExtArgs>[]
      affiliations: Prisma.$ProfessionalAffiliationPayload<ExtArgs>[]
      credentials: Prisma.$ProfessionalCredentialPayload<ExtArgs>[]
      availability: Prisma.$ProfessionalAvailabilityPayload<ExtArgs>[]
      reviews: Prisma.$ProfessionalReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      middleName: string | null
      lastName: string
      email: string
      phone: string | null
      alternateEmail: string | null
      title: string | null
      level: $Enums.ProfessionalLevel
      yearsOfExperience: number | null
      verificationStatus: $Enums.VerificationStatus
      verifiedAt: Date | null
      verifiedBy: string | null
      suspendedAt: Date | null
      suspendedUntil: Date | null
      suspensionReason: string | null
      biography: string | null
      expertise: string[]
      researchInterests: string[]
      publications: Prisma.JsonValue | null
      awards: Prisma.JsonValue | null
      availabilityStatus: $Enums.AvailabilityStatus
      maxCaseLoad: number | null
      currentCaseCount: number
      preferredCommunication: $Enums.CommunicationChannel
      timeZone: string | null
      workingHours: Prisma.JsonValue | null
      profilePictureUrl: string | null
      profileVisibility: string
      acceptsNewCases: boolean
      requiresPreApproval: boolean
      userId: string | null
      metadata: Prisma.JsonValue | null
      tags: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professional"]>
    composites: {}
  }

  type ProfessionalGetPayload<S extends boolean | null | undefined | ProfessionalDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalPayload, S>

  type ProfessionalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalCountAggregateInputType | true
    }

  export interface ProfessionalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Professional'], meta: { name: 'Professional' } }
    /**
     * Find zero or one Professional that matches the filter.
     * @param {ProfessionalFindUniqueArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalFindUniqueArgs>(args: SelectSubset<T, ProfessionalFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Professional that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalFindUniqueOrThrowArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professional that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalFindFirstArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalFindFirstArgs>(args?: SelectSubset<T, ProfessionalFindFirstArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professional that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalFindFirstOrThrowArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Professionals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Professionals
     * const professionals = await prisma.professional.findMany()
     * 
     * // Get first 10 Professionals
     * const professionals = await prisma.professional.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalWithIdOnly = await prisma.professional.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalFindManyArgs>(args?: SelectSubset<T, ProfessionalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Professional.
     * @param {ProfessionalCreateArgs} args - Arguments to create a Professional.
     * @example
     * // Create one Professional
     * const Professional = await prisma.professional.create({
     *   data: {
     *     // ... data to create a Professional
     *   }
     * })
     * 
     */
    create<T extends ProfessionalCreateArgs>(args: SelectSubset<T, ProfessionalCreateArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Professionals.
     * @param {ProfessionalCreateManyArgs} args - Arguments to create many Professionals.
     * @example
     * // Create many Professionals
     * const professional = await prisma.professional.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalCreateManyArgs>(args?: SelectSubset<T, ProfessionalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Professionals and returns the data saved in the database.
     * @param {ProfessionalCreateManyAndReturnArgs} args - Arguments to create many Professionals.
     * @example
     * // Create many Professionals
     * const professional = await prisma.professional.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Professionals and only return the `id`
     * const professionalWithIdOnly = await prisma.professional.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Professional.
     * @param {ProfessionalDeleteArgs} args - Arguments to delete one Professional.
     * @example
     * // Delete one Professional
     * const Professional = await prisma.professional.delete({
     *   where: {
     *     // ... filter to delete one Professional
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalDeleteArgs>(args: SelectSubset<T, ProfessionalDeleteArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Professional.
     * @param {ProfessionalUpdateArgs} args - Arguments to update one Professional.
     * @example
     * // Update one Professional
     * const professional = await prisma.professional.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalUpdateArgs>(args: SelectSubset<T, ProfessionalUpdateArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Professionals.
     * @param {ProfessionalDeleteManyArgs} args - Arguments to filter Professionals to delete.
     * @example
     * // Delete a few Professionals
     * const { count } = await prisma.professional.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalDeleteManyArgs>(args?: SelectSubset<T, ProfessionalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Professionals
     * const professional = await prisma.professional.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalUpdateManyArgs>(args: SelectSubset<T, ProfessionalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professionals and returns the data updated in the database.
     * @param {ProfessionalUpdateManyAndReturnArgs} args - Arguments to update many Professionals.
     * @example
     * // Update many Professionals
     * const professional = await prisma.professional.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Professionals and only return the `id`
     * const professionalWithIdOnly = await prisma.professional.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Professional.
     * @param {ProfessionalUpsertArgs} args - Arguments to update or create a Professional.
     * @example
     * // Update or create a Professional
     * const professional = await prisma.professional.upsert({
     *   create: {
     *     // ... data to create a Professional
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Professional we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalUpsertArgs>(args: SelectSubset<T, ProfessionalUpsertArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Professionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCountArgs} args - Arguments to filter Professionals to count.
     * @example
     * // Count the number of Professionals
     * const count = await prisma.professional.count({
     *   where: {
     *     // ... the filter for the Professionals we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalCountArgs>(
      args?: Subset<T, ProfessionalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Professional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalAggregateArgs>(args: Subset<T, ProfessionalAggregateArgs>): Prisma.PrismaPromise<GetProfessionalAggregateType<T>>

    /**
     * Group by Professional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Professional model
   */
  readonly fields: ProfessionalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Professional.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Professional$userArgs<ExtArgs> = {}>(args?: Subset<T, Professional$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    licenses<T extends Professional$licensesArgs<ExtArgs> = {}>(args?: Subset<T, Professional$licensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specializations<T extends Professional$specializationsArgs<ExtArgs> = {}>(args?: Subset<T, Professional$specializationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    affiliations<T extends Professional$affiliationsArgs<ExtArgs> = {}>(args?: Subset<T, Professional$affiliationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    credentials<T extends Professional$credentialsArgs<ExtArgs> = {}>(args?: Subset<T, Professional$credentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    availability<T extends Professional$availabilityArgs<ExtArgs> = {}>(args?: Subset<T, Professional$availabilityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Professional$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Professional$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Professional model
   */
  interface ProfessionalFieldRefs {
    readonly id: FieldRef<"Professional", 'String'>
    readonly firstName: FieldRef<"Professional", 'String'>
    readonly middleName: FieldRef<"Professional", 'String'>
    readonly lastName: FieldRef<"Professional", 'String'>
    readonly email: FieldRef<"Professional", 'String'>
    readonly phone: FieldRef<"Professional", 'String'>
    readonly alternateEmail: FieldRef<"Professional", 'String'>
    readonly title: FieldRef<"Professional", 'String'>
    readonly level: FieldRef<"Professional", 'ProfessionalLevel'>
    readonly yearsOfExperience: FieldRef<"Professional", 'Int'>
    readonly verificationStatus: FieldRef<"Professional", 'VerificationStatus'>
    readonly verifiedAt: FieldRef<"Professional", 'DateTime'>
    readonly verifiedBy: FieldRef<"Professional", 'String'>
    readonly suspendedAt: FieldRef<"Professional", 'DateTime'>
    readonly suspendedUntil: FieldRef<"Professional", 'DateTime'>
    readonly suspensionReason: FieldRef<"Professional", 'String'>
    readonly biography: FieldRef<"Professional", 'String'>
    readonly expertise: FieldRef<"Professional", 'String[]'>
    readonly researchInterests: FieldRef<"Professional", 'String[]'>
    readonly publications: FieldRef<"Professional", 'Json'>
    readonly awards: FieldRef<"Professional", 'Json'>
    readonly availabilityStatus: FieldRef<"Professional", 'AvailabilityStatus'>
    readonly maxCaseLoad: FieldRef<"Professional", 'Int'>
    readonly currentCaseCount: FieldRef<"Professional", 'Int'>
    readonly preferredCommunication: FieldRef<"Professional", 'CommunicationChannel'>
    readonly timeZone: FieldRef<"Professional", 'String'>
    readonly workingHours: FieldRef<"Professional", 'Json'>
    readonly profilePictureUrl: FieldRef<"Professional", 'String'>
    readonly profileVisibility: FieldRef<"Professional", 'String'>
    readonly acceptsNewCases: FieldRef<"Professional", 'Boolean'>
    readonly requiresPreApproval: FieldRef<"Professional", 'Boolean'>
    readonly userId: FieldRef<"Professional", 'String'>
    readonly metadata: FieldRef<"Professional", 'Json'>
    readonly tags: FieldRef<"Professional", 'String[]'>
    readonly createdAt: FieldRef<"Professional", 'DateTime'>
    readonly updatedAt: FieldRef<"Professional", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Professional findUnique
   */
  export type ProfessionalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional findUniqueOrThrow
   */
  export type ProfessionalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional findFirst
   */
  export type ProfessionalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professionals.
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professionals.
     */
    distinct?: ProfessionalScalarFieldEnum | ProfessionalScalarFieldEnum[]
  }

  /**
   * Professional findFirstOrThrow
   */
  export type ProfessionalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professionals.
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professionals.
     */
    distinct?: ProfessionalScalarFieldEnum | ProfessionalScalarFieldEnum[]
  }

  /**
   * Professional findMany
   */
  export type ProfessionalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professionals to fetch.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Professionals.
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    distinct?: ProfessionalScalarFieldEnum | ProfessionalScalarFieldEnum[]
  }

  /**
   * Professional create
   */
  export type ProfessionalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * The data needed to create a Professional.
     */
    data: XOR<ProfessionalCreateInput, ProfessionalUncheckedCreateInput>
  }

  /**
   * Professional createMany
   */
  export type ProfessionalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Professionals.
     */
    data: ProfessionalCreateManyInput | ProfessionalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Professional createManyAndReturn
   */
  export type ProfessionalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * The data used to create many Professionals.
     */
    data: ProfessionalCreateManyInput | ProfessionalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Professional update
   */
  export type ProfessionalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * The data needed to update a Professional.
     */
    data: XOR<ProfessionalUpdateInput, ProfessionalUncheckedUpdateInput>
    /**
     * Choose, which Professional to update.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional updateMany
   */
  export type ProfessionalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Professionals.
     */
    data: XOR<ProfessionalUpdateManyMutationInput, ProfessionalUncheckedUpdateManyInput>
    /**
     * Filter which Professionals to update
     */
    where?: ProfessionalWhereInput
    /**
     * Limit how many Professionals to update.
     */
    limit?: number
  }

  /**
   * Professional updateManyAndReturn
   */
  export type ProfessionalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * The data used to update Professionals.
     */
    data: XOR<ProfessionalUpdateManyMutationInput, ProfessionalUncheckedUpdateManyInput>
    /**
     * Filter which Professionals to update
     */
    where?: ProfessionalWhereInput
    /**
     * Limit how many Professionals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Professional upsert
   */
  export type ProfessionalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * The filter to search for the Professional to update in case it exists.
     */
    where: ProfessionalWhereUniqueInput
    /**
     * In case the Professional found by the `where` argument doesn't exist, create a new Professional with this data.
     */
    create: XOR<ProfessionalCreateInput, ProfessionalUncheckedCreateInput>
    /**
     * In case the Professional was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalUpdateInput, ProfessionalUncheckedUpdateInput>
  }

  /**
   * Professional delete
   */
  export type ProfessionalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter which Professional to delete.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional deleteMany
   */
  export type ProfessionalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professionals to delete
     */
    where?: ProfessionalWhereInput
    /**
     * Limit how many Professionals to delete.
     */
    limit?: number
  }

  /**
   * Professional.user
   */
  export type Professional$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Professional.licenses
   */
  export type Professional$licensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    where?: ProfessionalLicenseWhereInput
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    cursor?: ProfessionalLicenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * Professional.specializations
   */
  export type Professional$specializationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    where?: ProfessionalSpecializationWhereInput
    orderBy?: ProfessionalSpecializationOrderByWithRelationInput | ProfessionalSpecializationOrderByWithRelationInput[]
    cursor?: ProfessionalSpecializationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalSpecializationScalarFieldEnum | ProfessionalSpecializationScalarFieldEnum[]
  }

  /**
   * Professional.affiliations
   */
  export type Professional$affiliationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    where?: ProfessionalAffiliationWhereInput
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    cursor?: ProfessionalAffiliationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * Professional.credentials
   */
  export type Professional$credentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    where?: ProfessionalCredentialWhereInput
    orderBy?: ProfessionalCredentialOrderByWithRelationInput | ProfessionalCredentialOrderByWithRelationInput[]
    cursor?: ProfessionalCredentialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalCredentialScalarFieldEnum | ProfessionalCredentialScalarFieldEnum[]
  }

  /**
   * Professional.availability
   */
  export type Professional$availabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    where?: ProfessionalAvailabilityWhereInput
    orderBy?: ProfessionalAvailabilityOrderByWithRelationInput | ProfessionalAvailabilityOrderByWithRelationInput[]
    cursor?: ProfessionalAvailabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalAvailabilityScalarFieldEnum | ProfessionalAvailabilityScalarFieldEnum[]
  }

  /**
   * Professional.reviews
   */
  export type Professional$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    where?: ProfessionalReviewWhereInput
    orderBy?: ProfessionalReviewOrderByWithRelationInput | ProfessionalReviewOrderByWithRelationInput[]
    cursor?: ProfessionalReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalReviewScalarFieldEnum | ProfessionalReviewScalarFieldEnum[]
  }

  /**
   * Professional without action
   */
  export type ProfessionalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserSumAggregateOutputType = {
    failedLoginAttempts: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    emailVerified: boolean | null
    emailVerifiedAt: Date | null
    twoFactorEnabled: boolean | null
    twoFactorSecret: string | null
    twoFactorMethod: string | null
    lastLoginAt: Date | null
    lastLoginIP: string | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    passwordChangedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    emailVerified: boolean | null
    emailVerifiedAt: Date | null
    twoFactorEnabled: boolean | null
    twoFactorSecret: string | null
    twoFactorMethod: string | null
    lastLoginAt: Date | null
    lastLoginIP: string | null
    failedLoginAttempts: number | null
    lockedUntil: Date | null
    passwordChangedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    hashedPassword: number
    emailVerified: number
    emailVerifiedAt: number
    twoFactorEnabled: number
    twoFactorSecret: number
    twoFactorMethod: number
    lastLoginAt: number
    lastLoginIP: number
    failedLoginAttempts: number
    lockedUntil: number
    passwordChangedAt: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserSumAggregateInputType = {
    failedLoginAttempts?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    emailVerified?: true
    emailVerifiedAt?: true
    twoFactorEnabled?: true
    twoFactorSecret?: true
    twoFactorMethod?: true
    lastLoginAt?: true
    lastLoginIP?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    passwordChangedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    emailVerified?: true
    emailVerifiedAt?: true
    twoFactorEnabled?: true
    twoFactorSecret?: true
    twoFactorMethod?: true
    lastLoginAt?: true
    lastLoginIP?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    passwordChangedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    emailVerified?: true
    emailVerifiedAt?: true
    twoFactorEnabled?: true
    twoFactorSecret?: true
    twoFactorMethod?: true
    lastLoginAt?: true
    lastLoginIP?: true
    failedLoginAttempts?: true
    lockedUntil?: true
    passwordChangedAt?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    hashedPassword: string
    emailVerified: boolean
    emailVerifiedAt: Date | null
    twoFactorEnabled: boolean
    twoFactorSecret: string | null
    twoFactorMethod: string | null
    lastLoginAt: Date | null
    lastLoginIP: string | null
    failedLoginAttempts: number
    lockedUntil: Date | null
    passwordChangedAt: Date
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    twoFactorMethod?: boolean
    lastLoginAt?: boolean
    lastLoginIP?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordChangedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | User$professionalArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    twoFactorMethod?: boolean
    lastLoginAt?: boolean
    lastLoginIP?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordChangedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    twoFactorMethod?: boolean
    lastLoginAt?: boolean
    lastLoginIP?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordChangedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    emailVerified?: boolean
    emailVerifiedAt?: boolean
    twoFactorEnabled?: boolean
    twoFactorSecret?: boolean
    twoFactorMethod?: boolean
    lastLoginAt?: boolean
    lastLoginIP?: boolean
    failedLoginAttempts?: boolean
    lockedUntil?: boolean
    passwordChangedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "hashedPassword" | "emailVerified" | "emailVerifiedAt" | "twoFactorEnabled" | "twoFactorSecret" | "twoFactorMethod" | "lastLoginAt" | "lastLoginIP" | "failedLoginAttempts" | "lockedUntil" | "passwordChangedAt" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | User$professionalArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs> | null
      sessions: Prisma.$UserSessionPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      hashedPassword: string
      emailVerified: boolean
      emailVerifiedAt: Date | null
      twoFactorEnabled: boolean
      twoFactorSecret: string | null
      twoFactorMethod: string | null
      lastLoginAt: Date | null
      lastLoginIP: string | null
      failedLoginAttempts: number
      lockedUntil: Date | null
      passwordChangedAt: Date
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends User$professionalArgs<ExtArgs> = {}>(args?: Subset<T, User$professionalArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly hashedPassword: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly emailVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly twoFactorEnabled: FieldRef<"User", 'Boolean'>
    readonly twoFactorSecret: FieldRef<"User", 'String'>
    readonly twoFactorMethod: FieldRef<"User", 'String'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginIP: FieldRef<"User", 'String'>
    readonly failedLoginAttempts: FieldRef<"User", 'Int'>
    readonly lockedUntil: FieldRef<"User", 'DateTime'>
    readonly passwordChangedAt: FieldRef<"User", 'DateTime'>
    readonly metadata: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.professional
   */
  export type User$professionalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    where?: ProfessionalWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    cursor?: UserSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalLicense
   */

  export type AggregateProfessionalLicense = {
    _count: ProfessionalLicenseCountAggregateOutputType | null
    _min: ProfessionalLicenseMinAggregateOutputType | null
    _max: ProfessionalLicenseMaxAggregateOutputType | null
  }

  export type ProfessionalLicenseMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    licenseNumber: string | null
    licenseType: string | null
    issuingAuthority: string | null
    issuingState: string | null
    issuingCountry: string | null
    issuedDate: Date | null
    expirationDate: Date | null
    isActive: boolean | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    verificationNotes: string | null
    documentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalLicenseMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    licenseNumber: string | null
    licenseType: string | null
    issuingAuthority: string | null
    issuingState: string | null
    issuingCountry: string | null
    issuedDate: Date | null
    expirationDate: Date | null
    isActive: boolean | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    verificationNotes: string | null
    documentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalLicenseCountAggregateOutputType = {
    id: number
    professionalId: number
    licenseNumber: number
    licenseType: number
    issuingAuthority: number
    issuingState: number
    issuingCountry: number
    issuedDate: number
    expirationDate: number
    isActive: number
    verificationStatus: number
    verifiedAt: number
    verificationNotes: number
    documentUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalLicenseMinAggregateInputType = {
    id?: true
    professionalId?: true
    licenseNumber?: true
    licenseType?: true
    issuingAuthority?: true
    issuingState?: true
    issuingCountry?: true
    issuedDate?: true
    expirationDate?: true
    isActive?: true
    verificationStatus?: true
    verifiedAt?: true
    verificationNotes?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalLicenseMaxAggregateInputType = {
    id?: true
    professionalId?: true
    licenseNumber?: true
    licenseType?: true
    issuingAuthority?: true
    issuingState?: true
    issuingCountry?: true
    issuedDate?: true
    expirationDate?: true
    isActive?: true
    verificationStatus?: true
    verifiedAt?: true
    verificationNotes?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalLicenseCountAggregateInputType = {
    id?: true
    professionalId?: true
    licenseNumber?: true
    licenseType?: true
    issuingAuthority?: true
    issuingState?: true
    issuingCountry?: true
    issuedDate?: true
    expirationDate?: true
    isActive?: true
    verificationStatus?: true
    verifiedAt?: true
    verificationNotes?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalLicenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalLicense to aggregate.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalLicenses
    **/
    _count?: true | ProfessionalLicenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalLicenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalLicenseMaxAggregateInputType
  }

  export type GetProfessionalLicenseAggregateType<T extends ProfessionalLicenseAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalLicense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalLicense[P]>
      : GetScalarType<T[P], AggregateProfessionalLicense[P]>
  }




  export type ProfessionalLicenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalLicenseWhereInput
    orderBy?: ProfessionalLicenseOrderByWithAggregationInput | ProfessionalLicenseOrderByWithAggregationInput[]
    by: ProfessionalLicenseScalarFieldEnum[] | ProfessionalLicenseScalarFieldEnum
    having?: ProfessionalLicenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalLicenseCountAggregateInputType | true
    _min?: ProfessionalLicenseMinAggregateInputType
    _max?: ProfessionalLicenseMaxAggregateInputType
  }

  export type ProfessionalLicenseGroupByOutputType = {
    id: string
    professionalId: string
    licenseNumber: string
    licenseType: string
    issuingAuthority: string
    issuingState: string | null
    issuingCountry: string
    issuedDate: Date
    expirationDate: Date | null
    isActive: boolean
    verificationStatus: $Enums.VerificationStatus
    verifiedAt: Date | null
    verificationNotes: string | null
    documentUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalLicenseCountAggregateOutputType | null
    _min: ProfessionalLicenseMinAggregateOutputType | null
    _max: ProfessionalLicenseMaxAggregateOutputType | null
  }

  type GetProfessionalLicenseGroupByPayload<T extends ProfessionalLicenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalLicenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalLicenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalLicenseGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalLicenseGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalLicenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    issuingAuthority?: boolean
    issuingState?: boolean
    issuingCountry?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    isActive?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationNotes?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalLicense"]>

  export type ProfessionalLicenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    issuingAuthority?: boolean
    issuingState?: boolean
    issuingCountry?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    isActive?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationNotes?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalLicense"]>

  export type ProfessionalLicenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    issuingAuthority?: boolean
    issuingState?: boolean
    issuingCountry?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    isActive?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationNotes?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalLicense"]>

  export type ProfessionalLicenseSelectScalar = {
    id?: boolean
    professionalId?: boolean
    licenseNumber?: boolean
    licenseType?: boolean
    issuingAuthority?: boolean
    issuingState?: boolean
    issuingCountry?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    isActive?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationNotes?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalLicenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "licenseNumber" | "licenseType" | "issuingAuthority" | "issuingState" | "issuingCountry" | "issuedDate" | "expirationDate" | "isActive" | "verificationStatus" | "verifiedAt" | "verificationNotes" | "documentUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["professionalLicense"]>
  export type ProfessionalLicenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalLicenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalLicenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalLicensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalLicense"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      licenseNumber: string
      licenseType: string
      issuingAuthority: string
      issuingState: string | null
      issuingCountry: string
      issuedDate: Date
      expirationDate: Date | null
      isActive: boolean
      verificationStatus: $Enums.VerificationStatus
      verifiedAt: Date | null
      verificationNotes: string | null
      documentUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professionalLicense"]>
    composites: {}
  }

  type ProfessionalLicenseGetPayload<S extends boolean | null | undefined | ProfessionalLicenseDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalLicensePayload, S>

  type ProfessionalLicenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalLicenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalLicenseCountAggregateInputType | true
    }

  export interface ProfessionalLicenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalLicense'], meta: { name: 'ProfessionalLicense' } }
    /**
     * Find zero or one ProfessionalLicense that matches the filter.
     * @param {ProfessionalLicenseFindUniqueArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalLicenseFindUniqueArgs>(args: SelectSubset<T, ProfessionalLicenseFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalLicense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalLicenseFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalLicenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalLicenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalLicense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseFindFirstArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalLicenseFindFirstArgs>(args?: SelectSubset<T, ProfessionalLicenseFindFirstArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalLicense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseFindFirstOrThrowArgs} args - Arguments to find a ProfessionalLicense
     * @example
     * // Get one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalLicenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalLicenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalLicenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalLicenses
     * const professionalLicenses = await prisma.professionalLicense.findMany()
     * 
     * // Get first 10 ProfessionalLicenses
     * const professionalLicenses = await prisma.professionalLicense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalLicenseWithIdOnly = await prisma.professionalLicense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalLicenseFindManyArgs>(args?: SelectSubset<T, ProfessionalLicenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalLicense.
     * @param {ProfessionalLicenseCreateArgs} args - Arguments to create a ProfessionalLicense.
     * @example
     * // Create one ProfessionalLicense
     * const ProfessionalLicense = await prisma.professionalLicense.create({
     *   data: {
     *     // ... data to create a ProfessionalLicense
     *   }
     * })
     * 
     */
    create<T extends ProfessionalLicenseCreateArgs>(args: SelectSubset<T, ProfessionalLicenseCreateArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalLicenses.
     * @param {ProfessionalLicenseCreateManyArgs} args - Arguments to create many ProfessionalLicenses.
     * @example
     * // Create many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalLicenseCreateManyArgs>(args?: SelectSubset<T, ProfessionalLicenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalLicenses and returns the data saved in the database.
     * @param {ProfessionalLicenseCreateManyAndReturnArgs} args - Arguments to create many ProfessionalLicenses.
     * @example
     * // Create many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalLicenses and only return the `id`
     * const professionalLicenseWithIdOnly = await prisma.professionalLicense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalLicenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalLicenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalLicense.
     * @param {ProfessionalLicenseDeleteArgs} args - Arguments to delete one ProfessionalLicense.
     * @example
     * // Delete one ProfessionalLicense
     * const ProfessionalLicense = await prisma.professionalLicense.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalLicense
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalLicenseDeleteArgs>(args: SelectSubset<T, ProfessionalLicenseDeleteArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalLicense.
     * @param {ProfessionalLicenseUpdateArgs} args - Arguments to update one ProfessionalLicense.
     * @example
     * // Update one ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalLicenseUpdateArgs>(args: SelectSubset<T, ProfessionalLicenseUpdateArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalLicenses.
     * @param {ProfessionalLicenseDeleteManyArgs} args - Arguments to filter ProfessionalLicenses to delete.
     * @example
     * // Delete a few ProfessionalLicenses
     * const { count } = await prisma.professionalLicense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalLicenseDeleteManyArgs>(args?: SelectSubset<T, ProfessionalLicenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalLicenseUpdateManyArgs>(args: SelectSubset<T, ProfessionalLicenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalLicenses and returns the data updated in the database.
     * @param {ProfessionalLicenseUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalLicenses.
     * @example
     * // Update many ProfessionalLicenses
     * const professionalLicense = await prisma.professionalLicense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalLicenses and only return the `id`
     * const professionalLicenseWithIdOnly = await prisma.professionalLicense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalLicenseUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalLicenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalLicense.
     * @param {ProfessionalLicenseUpsertArgs} args - Arguments to update or create a ProfessionalLicense.
     * @example
     * // Update or create a ProfessionalLicense
     * const professionalLicense = await prisma.professionalLicense.upsert({
     *   create: {
     *     // ... data to create a ProfessionalLicense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalLicense we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalLicenseUpsertArgs>(args: SelectSubset<T, ProfessionalLicenseUpsertArgs<ExtArgs>>): Prisma__ProfessionalLicenseClient<$Result.GetResult<Prisma.$ProfessionalLicensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseCountArgs} args - Arguments to filter ProfessionalLicenses to count.
     * @example
     * // Count the number of ProfessionalLicenses
     * const count = await prisma.professionalLicense.count({
     *   where: {
     *     // ... the filter for the ProfessionalLicenses we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalLicenseCountArgs>(
      args?: Subset<T, ProfessionalLicenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalLicenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalLicenseAggregateArgs>(args: Subset<T, ProfessionalLicenseAggregateArgs>): Prisma.PrismaPromise<GetProfessionalLicenseAggregateType<T>>

    /**
     * Group by ProfessionalLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalLicenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalLicenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalLicenseGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalLicenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalLicenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalLicenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalLicense model
   */
  readonly fields: ProfessionalLicenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalLicense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalLicenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalLicense model
   */
  interface ProfessionalLicenseFieldRefs {
    readonly id: FieldRef<"ProfessionalLicense", 'String'>
    readonly professionalId: FieldRef<"ProfessionalLicense", 'String'>
    readonly licenseNumber: FieldRef<"ProfessionalLicense", 'String'>
    readonly licenseType: FieldRef<"ProfessionalLicense", 'String'>
    readonly issuingAuthority: FieldRef<"ProfessionalLicense", 'String'>
    readonly issuingState: FieldRef<"ProfessionalLicense", 'String'>
    readonly issuingCountry: FieldRef<"ProfessionalLicense", 'String'>
    readonly issuedDate: FieldRef<"ProfessionalLicense", 'DateTime'>
    readonly expirationDate: FieldRef<"ProfessionalLicense", 'DateTime'>
    readonly isActive: FieldRef<"ProfessionalLicense", 'Boolean'>
    readonly verificationStatus: FieldRef<"ProfessionalLicense", 'VerificationStatus'>
    readonly verifiedAt: FieldRef<"ProfessionalLicense", 'DateTime'>
    readonly verificationNotes: FieldRef<"ProfessionalLicense", 'String'>
    readonly documentUrl: FieldRef<"ProfessionalLicense", 'String'>
    readonly createdAt: FieldRef<"ProfessionalLicense", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalLicense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalLicense findUnique
   */
  export type ProfessionalLicenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense findUniqueOrThrow
   */
  export type ProfessionalLicenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense findFirst
   */
  export type ProfessionalLicenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalLicenses.
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalLicenses.
     */
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * ProfessionalLicense findFirstOrThrow
   */
  export type ProfessionalLicenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicense to fetch.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalLicenses.
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalLicenses.
     */
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * ProfessionalLicense findMany
   */
  export type ProfessionalLicenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalLicenses to fetch.
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalLicenses to fetch.
     */
    orderBy?: ProfessionalLicenseOrderByWithRelationInput | ProfessionalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalLicenses.
     */
    cursor?: ProfessionalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalLicenses.
     */
    skip?: number
    distinct?: ProfessionalLicenseScalarFieldEnum | ProfessionalLicenseScalarFieldEnum[]
  }

  /**
   * ProfessionalLicense create
   */
  export type ProfessionalLicenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalLicense.
     */
    data: XOR<ProfessionalLicenseCreateInput, ProfessionalLicenseUncheckedCreateInput>
  }

  /**
   * ProfessionalLicense createMany
   */
  export type ProfessionalLicenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalLicenses.
     */
    data: ProfessionalLicenseCreateManyInput | ProfessionalLicenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalLicense createManyAndReturn
   */
  export type ProfessionalLicenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalLicenses.
     */
    data: ProfessionalLicenseCreateManyInput | ProfessionalLicenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalLicense update
   */
  export type ProfessionalLicenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalLicense.
     */
    data: XOR<ProfessionalLicenseUpdateInput, ProfessionalLicenseUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalLicense to update.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense updateMany
   */
  export type ProfessionalLicenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalLicenses.
     */
    data: XOR<ProfessionalLicenseUpdateManyMutationInput, ProfessionalLicenseUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalLicenses to update
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * Limit how many ProfessionalLicenses to update.
     */
    limit?: number
  }

  /**
   * ProfessionalLicense updateManyAndReturn
   */
  export type ProfessionalLicenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalLicenses.
     */
    data: XOR<ProfessionalLicenseUpdateManyMutationInput, ProfessionalLicenseUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalLicenses to update
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * Limit how many ProfessionalLicenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalLicense upsert
   */
  export type ProfessionalLicenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalLicense to update in case it exists.
     */
    where: ProfessionalLicenseWhereUniqueInput
    /**
     * In case the ProfessionalLicense found by the `where` argument doesn't exist, create a new ProfessionalLicense with this data.
     */
    create: XOR<ProfessionalLicenseCreateInput, ProfessionalLicenseUncheckedCreateInput>
    /**
     * In case the ProfessionalLicense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalLicenseUpdateInput, ProfessionalLicenseUncheckedUpdateInput>
  }

  /**
   * ProfessionalLicense delete
   */
  export type ProfessionalLicenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalLicense to delete.
     */
    where: ProfessionalLicenseWhereUniqueInput
  }

  /**
   * ProfessionalLicense deleteMany
   */
  export type ProfessionalLicenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalLicenses to delete
     */
    where?: ProfessionalLicenseWhereInput
    /**
     * Limit how many ProfessionalLicenses to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalLicense without action
   */
  export type ProfessionalLicenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalLicense
     */
    select?: ProfessionalLicenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalLicense
     */
    omit?: ProfessionalLicenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalLicenseInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalSpecialization
   */

  export type AggregateProfessionalSpecialization = {
    _count: ProfessionalSpecializationCountAggregateOutputType | null
    _min: ProfessionalSpecializationMinAggregateOutputType | null
    _max: ProfessionalSpecializationMaxAggregateOutputType | null
  }

  export type ProfessionalSpecializationMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    specialty: string | null
    subspecialty: string | null
    level: $Enums.SpecializationLevel | null
    boardName: string | null
    certificationDate: Date | null
    expirationDate: Date | null
    certificationNumber: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    documentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalSpecializationMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    specialty: string | null
    subspecialty: string | null
    level: $Enums.SpecializationLevel | null
    boardName: string | null
    certificationDate: Date | null
    expirationDate: Date | null
    certificationNumber: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    documentUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalSpecializationCountAggregateOutputType = {
    id: number
    professionalId: number
    specialty: number
    subspecialty: number
    level: number
    boardName: number
    certificationDate: number
    expirationDate: number
    certificationNumber: number
    verificationStatus: number
    verifiedAt: number
    documentUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalSpecializationMinAggregateInputType = {
    id?: true
    professionalId?: true
    specialty?: true
    subspecialty?: true
    level?: true
    boardName?: true
    certificationDate?: true
    expirationDate?: true
    certificationNumber?: true
    verificationStatus?: true
    verifiedAt?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalSpecializationMaxAggregateInputType = {
    id?: true
    professionalId?: true
    specialty?: true
    subspecialty?: true
    level?: true
    boardName?: true
    certificationDate?: true
    expirationDate?: true
    certificationNumber?: true
    verificationStatus?: true
    verifiedAt?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalSpecializationCountAggregateInputType = {
    id?: true
    professionalId?: true
    specialty?: true
    subspecialty?: true
    level?: true
    boardName?: true
    certificationDate?: true
    expirationDate?: true
    certificationNumber?: true
    verificationStatus?: true
    verifiedAt?: true
    documentUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalSpecializationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalSpecialization to aggregate.
     */
    where?: ProfessionalSpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSpecializations to fetch.
     */
    orderBy?: ProfessionalSpecializationOrderByWithRelationInput | ProfessionalSpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalSpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSpecializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSpecializations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalSpecializations
    **/
    _count?: true | ProfessionalSpecializationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalSpecializationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalSpecializationMaxAggregateInputType
  }

  export type GetProfessionalSpecializationAggregateType<T extends ProfessionalSpecializationAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalSpecialization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalSpecialization[P]>
      : GetScalarType<T[P], AggregateProfessionalSpecialization[P]>
  }




  export type ProfessionalSpecializationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalSpecializationWhereInput
    orderBy?: ProfessionalSpecializationOrderByWithAggregationInput | ProfessionalSpecializationOrderByWithAggregationInput[]
    by: ProfessionalSpecializationScalarFieldEnum[] | ProfessionalSpecializationScalarFieldEnum
    having?: ProfessionalSpecializationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalSpecializationCountAggregateInputType | true
    _min?: ProfessionalSpecializationMinAggregateInputType
    _max?: ProfessionalSpecializationMaxAggregateInputType
  }

  export type ProfessionalSpecializationGroupByOutputType = {
    id: string
    professionalId: string
    specialty: string
    subspecialty: string | null
    level: $Enums.SpecializationLevel
    boardName: string | null
    certificationDate: Date | null
    expirationDate: Date | null
    certificationNumber: string | null
    verificationStatus: $Enums.VerificationStatus
    verifiedAt: Date | null
    documentUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalSpecializationCountAggregateOutputType | null
    _min: ProfessionalSpecializationMinAggregateOutputType | null
    _max: ProfessionalSpecializationMaxAggregateOutputType | null
  }

  type GetProfessionalSpecializationGroupByPayload<T extends ProfessionalSpecializationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalSpecializationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalSpecializationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalSpecializationGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalSpecializationGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalSpecializationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    specialty?: boolean
    subspecialty?: boolean
    level?: boolean
    boardName?: boolean
    certificationDate?: boolean
    expirationDate?: boolean
    certificationNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalSpecialization"]>

  export type ProfessionalSpecializationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    specialty?: boolean
    subspecialty?: boolean
    level?: boolean
    boardName?: boolean
    certificationDate?: boolean
    expirationDate?: boolean
    certificationNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalSpecialization"]>

  export type ProfessionalSpecializationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    specialty?: boolean
    subspecialty?: boolean
    level?: boolean
    boardName?: boolean
    certificationDate?: boolean
    expirationDate?: boolean
    certificationNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalSpecialization"]>

  export type ProfessionalSpecializationSelectScalar = {
    id?: boolean
    professionalId?: boolean
    specialty?: boolean
    subspecialty?: boolean
    level?: boolean
    boardName?: boolean
    certificationDate?: boolean
    expirationDate?: boolean
    certificationNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalSpecializationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "specialty" | "subspecialty" | "level" | "boardName" | "certificationDate" | "expirationDate" | "certificationNumber" | "verificationStatus" | "verifiedAt" | "documentUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["professionalSpecialization"]>
  export type ProfessionalSpecializationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalSpecializationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalSpecializationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalSpecializationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalSpecialization"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      specialty: string
      subspecialty: string | null
      level: $Enums.SpecializationLevel
      boardName: string | null
      certificationDate: Date | null
      expirationDate: Date | null
      certificationNumber: string | null
      verificationStatus: $Enums.VerificationStatus
      verifiedAt: Date | null
      documentUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professionalSpecialization"]>
    composites: {}
  }

  type ProfessionalSpecializationGetPayload<S extends boolean | null | undefined | ProfessionalSpecializationDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalSpecializationPayload, S>

  type ProfessionalSpecializationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalSpecializationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalSpecializationCountAggregateInputType | true
    }

  export interface ProfessionalSpecializationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalSpecialization'], meta: { name: 'ProfessionalSpecialization' } }
    /**
     * Find zero or one ProfessionalSpecialization that matches the filter.
     * @param {ProfessionalSpecializationFindUniqueArgs} args - Arguments to find a ProfessionalSpecialization
     * @example
     * // Get one ProfessionalSpecialization
     * const professionalSpecialization = await prisma.professionalSpecialization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalSpecializationFindUniqueArgs>(args: SelectSubset<T, ProfessionalSpecializationFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalSpecialization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalSpecializationFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalSpecialization
     * @example
     * // Get one ProfessionalSpecialization
     * const professionalSpecialization = await prisma.professionalSpecialization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalSpecializationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalSpecializationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalSpecialization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSpecializationFindFirstArgs} args - Arguments to find a ProfessionalSpecialization
     * @example
     * // Get one ProfessionalSpecialization
     * const professionalSpecialization = await prisma.professionalSpecialization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalSpecializationFindFirstArgs>(args?: SelectSubset<T, ProfessionalSpecializationFindFirstArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalSpecialization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSpecializationFindFirstOrThrowArgs} args - Arguments to find a ProfessionalSpecialization
     * @example
     * // Get one ProfessionalSpecialization
     * const professionalSpecialization = await prisma.professionalSpecialization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalSpecializationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalSpecializationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalSpecializations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSpecializationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalSpecializations
     * const professionalSpecializations = await prisma.professionalSpecialization.findMany()
     * 
     * // Get first 10 ProfessionalSpecializations
     * const professionalSpecializations = await prisma.professionalSpecialization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalSpecializationWithIdOnly = await prisma.professionalSpecialization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalSpecializationFindManyArgs>(args?: SelectSubset<T, ProfessionalSpecializationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalSpecialization.
     * @param {ProfessionalSpecializationCreateArgs} args - Arguments to create a ProfessionalSpecialization.
     * @example
     * // Create one ProfessionalSpecialization
     * const ProfessionalSpecialization = await prisma.professionalSpecialization.create({
     *   data: {
     *     // ... data to create a ProfessionalSpecialization
     *   }
     * })
     * 
     */
    create<T extends ProfessionalSpecializationCreateArgs>(args: SelectSubset<T, ProfessionalSpecializationCreateArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalSpecializations.
     * @param {ProfessionalSpecializationCreateManyArgs} args - Arguments to create many ProfessionalSpecializations.
     * @example
     * // Create many ProfessionalSpecializations
     * const professionalSpecialization = await prisma.professionalSpecialization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalSpecializationCreateManyArgs>(args?: SelectSubset<T, ProfessionalSpecializationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalSpecializations and returns the data saved in the database.
     * @param {ProfessionalSpecializationCreateManyAndReturnArgs} args - Arguments to create many ProfessionalSpecializations.
     * @example
     * // Create many ProfessionalSpecializations
     * const professionalSpecialization = await prisma.professionalSpecialization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalSpecializations and only return the `id`
     * const professionalSpecializationWithIdOnly = await prisma.professionalSpecialization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalSpecializationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalSpecializationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalSpecialization.
     * @param {ProfessionalSpecializationDeleteArgs} args - Arguments to delete one ProfessionalSpecialization.
     * @example
     * // Delete one ProfessionalSpecialization
     * const ProfessionalSpecialization = await prisma.professionalSpecialization.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalSpecialization
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalSpecializationDeleteArgs>(args: SelectSubset<T, ProfessionalSpecializationDeleteArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalSpecialization.
     * @param {ProfessionalSpecializationUpdateArgs} args - Arguments to update one ProfessionalSpecialization.
     * @example
     * // Update one ProfessionalSpecialization
     * const professionalSpecialization = await prisma.professionalSpecialization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalSpecializationUpdateArgs>(args: SelectSubset<T, ProfessionalSpecializationUpdateArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalSpecializations.
     * @param {ProfessionalSpecializationDeleteManyArgs} args - Arguments to filter ProfessionalSpecializations to delete.
     * @example
     * // Delete a few ProfessionalSpecializations
     * const { count } = await prisma.professionalSpecialization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalSpecializationDeleteManyArgs>(args?: SelectSubset<T, ProfessionalSpecializationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalSpecializations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSpecializationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalSpecializations
     * const professionalSpecialization = await prisma.professionalSpecialization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalSpecializationUpdateManyArgs>(args: SelectSubset<T, ProfessionalSpecializationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalSpecializations and returns the data updated in the database.
     * @param {ProfessionalSpecializationUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalSpecializations.
     * @example
     * // Update many ProfessionalSpecializations
     * const professionalSpecialization = await prisma.professionalSpecialization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalSpecializations and only return the `id`
     * const professionalSpecializationWithIdOnly = await prisma.professionalSpecialization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalSpecializationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalSpecializationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalSpecialization.
     * @param {ProfessionalSpecializationUpsertArgs} args - Arguments to update or create a ProfessionalSpecialization.
     * @example
     * // Update or create a ProfessionalSpecialization
     * const professionalSpecialization = await prisma.professionalSpecialization.upsert({
     *   create: {
     *     // ... data to create a ProfessionalSpecialization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalSpecialization we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalSpecializationUpsertArgs>(args: SelectSubset<T, ProfessionalSpecializationUpsertArgs<ExtArgs>>): Prisma__ProfessionalSpecializationClient<$Result.GetResult<Prisma.$ProfessionalSpecializationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalSpecializations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSpecializationCountArgs} args - Arguments to filter ProfessionalSpecializations to count.
     * @example
     * // Count the number of ProfessionalSpecializations
     * const count = await prisma.professionalSpecialization.count({
     *   where: {
     *     // ... the filter for the ProfessionalSpecializations we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalSpecializationCountArgs>(
      args?: Subset<T, ProfessionalSpecializationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalSpecializationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalSpecialization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSpecializationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalSpecializationAggregateArgs>(args: Subset<T, ProfessionalSpecializationAggregateArgs>): Prisma.PrismaPromise<GetProfessionalSpecializationAggregateType<T>>

    /**
     * Group by ProfessionalSpecialization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSpecializationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalSpecializationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalSpecializationGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalSpecializationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalSpecializationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalSpecializationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalSpecialization model
   */
  readonly fields: ProfessionalSpecializationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalSpecialization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalSpecializationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalSpecialization model
   */
  interface ProfessionalSpecializationFieldRefs {
    readonly id: FieldRef<"ProfessionalSpecialization", 'String'>
    readonly professionalId: FieldRef<"ProfessionalSpecialization", 'String'>
    readonly specialty: FieldRef<"ProfessionalSpecialization", 'String'>
    readonly subspecialty: FieldRef<"ProfessionalSpecialization", 'String'>
    readonly level: FieldRef<"ProfessionalSpecialization", 'SpecializationLevel'>
    readonly boardName: FieldRef<"ProfessionalSpecialization", 'String'>
    readonly certificationDate: FieldRef<"ProfessionalSpecialization", 'DateTime'>
    readonly expirationDate: FieldRef<"ProfessionalSpecialization", 'DateTime'>
    readonly certificationNumber: FieldRef<"ProfessionalSpecialization", 'String'>
    readonly verificationStatus: FieldRef<"ProfessionalSpecialization", 'VerificationStatus'>
    readonly verifiedAt: FieldRef<"ProfessionalSpecialization", 'DateTime'>
    readonly documentUrl: FieldRef<"ProfessionalSpecialization", 'String'>
    readonly createdAt: FieldRef<"ProfessionalSpecialization", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalSpecialization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalSpecialization findUnique
   */
  export type ProfessionalSpecializationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSpecialization to fetch.
     */
    where: ProfessionalSpecializationWhereUniqueInput
  }

  /**
   * ProfessionalSpecialization findUniqueOrThrow
   */
  export type ProfessionalSpecializationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSpecialization to fetch.
     */
    where: ProfessionalSpecializationWhereUniqueInput
  }

  /**
   * ProfessionalSpecialization findFirst
   */
  export type ProfessionalSpecializationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSpecialization to fetch.
     */
    where?: ProfessionalSpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSpecializations to fetch.
     */
    orderBy?: ProfessionalSpecializationOrderByWithRelationInput | ProfessionalSpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalSpecializations.
     */
    cursor?: ProfessionalSpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSpecializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSpecializations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalSpecializations.
     */
    distinct?: ProfessionalSpecializationScalarFieldEnum | ProfessionalSpecializationScalarFieldEnum[]
  }

  /**
   * ProfessionalSpecialization findFirstOrThrow
   */
  export type ProfessionalSpecializationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSpecialization to fetch.
     */
    where?: ProfessionalSpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSpecializations to fetch.
     */
    orderBy?: ProfessionalSpecializationOrderByWithRelationInput | ProfessionalSpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalSpecializations.
     */
    cursor?: ProfessionalSpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSpecializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSpecializations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalSpecializations.
     */
    distinct?: ProfessionalSpecializationScalarFieldEnum | ProfessionalSpecializationScalarFieldEnum[]
  }

  /**
   * ProfessionalSpecialization findMany
   */
  export type ProfessionalSpecializationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSpecializations to fetch.
     */
    where?: ProfessionalSpecializationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSpecializations to fetch.
     */
    orderBy?: ProfessionalSpecializationOrderByWithRelationInput | ProfessionalSpecializationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalSpecializations.
     */
    cursor?: ProfessionalSpecializationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSpecializations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSpecializations.
     */
    skip?: number
    distinct?: ProfessionalSpecializationScalarFieldEnum | ProfessionalSpecializationScalarFieldEnum[]
  }

  /**
   * ProfessionalSpecialization create
   */
  export type ProfessionalSpecializationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalSpecialization.
     */
    data: XOR<ProfessionalSpecializationCreateInput, ProfessionalSpecializationUncheckedCreateInput>
  }

  /**
   * ProfessionalSpecialization createMany
   */
  export type ProfessionalSpecializationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalSpecializations.
     */
    data: ProfessionalSpecializationCreateManyInput | ProfessionalSpecializationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalSpecialization createManyAndReturn
   */
  export type ProfessionalSpecializationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalSpecializations.
     */
    data: ProfessionalSpecializationCreateManyInput | ProfessionalSpecializationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalSpecialization update
   */
  export type ProfessionalSpecializationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalSpecialization.
     */
    data: XOR<ProfessionalSpecializationUpdateInput, ProfessionalSpecializationUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalSpecialization to update.
     */
    where: ProfessionalSpecializationWhereUniqueInput
  }

  /**
   * ProfessionalSpecialization updateMany
   */
  export type ProfessionalSpecializationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalSpecializations.
     */
    data: XOR<ProfessionalSpecializationUpdateManyMutationInput, ProfessionalSpecializationUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalSpecializations to update
     */
    where?: ProfessionalSpecializationWhereInput
    /**
     * Limit how many ProfessionalSpecializations to update.
     */
    limit?: number
  }

  /**
   * ProfessionalSpecialization updateManyAndReturn
   */
  export type ProfessionalSpecializationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalSpecializations.
     */
    data: XOR<ProfessionalSpecializationUpdateManyMutationInput, ProfessionalSpecializationUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalSpecializations to update
     */
    where?: ProfessionalSpecializationWhereInput
    /**
     * Limit how many ProfessionalSpecializations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalSpecialization upsert
   */
  export type ProfessionalSpecializationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalSpecialization to update in case it exists.
     */
    where: ProfessionalSpecializationWhereUniqueInput
    /**
     * In case the ProfessionalSpecialization found by the `where` argument doesn't exist, create a new ProfessionalSpecialization with this data.
     */
    create: XOR<ProfessionalSpecializationCreateInput, ProfessionalSpecializationUncheckedCreateInput>
    /**
     * In case the ProfessionalSpecialization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalSpecializationUpdateInput, ProfessionalSpecializationUncheckedUpdateInput>
  }

  /**
   * ProfessionalSpecialization delete
   */
  export type ProfessionalSpecializationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalSpecialization to delete.
     */
    where: ProfessionalSpecializationWhereUniqueInput
  }

  /**
   * ProfessionalSpecialization deleteMany
   */
  export type ProfessionalSpecializationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalSpecializations to delete
     */
    where?: ProfessionalSpecializationWhereInput
    /**
     * Limit how many ProfessionalSpecializations to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalSpecialization without action
   */
  export type ProfessionalSpecializationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSpecialization
     */
    select?: ProfessionalSpecializationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSpecialization
     */
    omit?: ProfessionalSpecializationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSpecializationInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalAffiliation
   */

  export type AggregateProfessionalAffiliation = {
    _count: ProfessionalAffiliationCountAggregateOutputType | null
    _min: ProfessionalAffiliationMinAggregateOutputType | null
    _max: ProfessionalAffiliationMaxAggregateOutputType | null
  }

  export type ProfessionalAffiliationMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    institutionName: string | null
    institutionType: string | null
    department: string | null
    position: string | null
    startDate: Date | null
    endDate: Date | null
    isCurrent: boolean | null
    isPrimary: boolean | null
    phone: string | null
    website: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    verificationContact: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalAffiliationMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    institutionName: string | null
    institutionType: string | null
    department: string | null
    position: string | null
    startDate: Date | null
    endDate: Date | null
    isCurrent: boolean | null
    isPrimary: boolean | null
    phone: string | null
    website: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    verificationContact: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalAffiliationCountAggregateOutputType = {
    id: number
    professionalId: number
    institutionName: number
    institutionType: number
    department: number
    position: number
    startDate: number
    endDate: number
    isCurrent: number
    isPrimary: number
    address: number
    phone: number
    website: number
    verificationStatus: number
    verifiedAt: number
    verificationContact: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalAffiliationMinAggregateInputType = {
    id?: true
    professionalId?: true
    institutionName?: true
    institutionType?: true
    department?: true
    position?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    isPrimary?: true
    phone?: true
    website?: true
    verificationStatus?: true
    verifiedAt?: true
    verificationContact?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalAffiliationMaxAggregateInputType = {
    id?: true
    professionalId?: true
    institutionName?: true
    institutionType?: true
    department?: true
    position?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    isPrimary?: true
    phone?: true
    website?: true
    verificationStatus?: true
    verifiedAt?: true
    verificationContact?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalAffiliationCountAggregateInputType = {
    id?: true
    professionalId?: true
    institutionName?: true
    institutionType?: true
    department?: true
    position?: true
    startDate?: true
    endDate?: true
    isCurrent?: true
    isPrimary?: true
    address?: true
    phone?: true
    website?: true
    verificationStatus?: true
    verifiedAt?: true
    verificationContact?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalAffiliationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalAffiliation to aggregate.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalAffiliations
    **/
    _count?: true | ProfessionalAffiliationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalAffiliationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalAffiliationMaxAggregateInputType
  }

  export type GetProfessionalAffiliationAggregateType<T extends ProfessionalAffiliationAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalAffiliation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalAffiliation[P]>
      : GetScalarType<T[P], AggregateProfessionalAffiliation[P]>
  }




  export type ProfessionalAffiliationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalAffiliationWhereInput
    orderBy?: ProfessionalAffiliationOrderByWithAggregationInput | ProfessionalAffiliationOrderByWithAggregationInput[]
    by: ProfessionalAffiliationScalarFieldEnum[] | ProfessionalAffiliationScalarFieldEnum
    having?: ProfessionalAffiliationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalAffiliationCountAggregateInputType | true
    _min?: ProfessionalAffiliationMinAggregateInputType
    _max?: ProfessionalAffiliationMaxAggregateInputType
  }

  export type ProfessionalAffiliationGroupByOutputType = {
    id: string
    professionalId: string
    institutionName: string
    institutionType: string
    department: string | null
    position: string | null
    startDate: Date
    endDate: Date | null
    isCurrent: boolean
    isPrimary: boolean
    address: JsonValue | null
    phone: string | null
    website: string | null
    verificationStatus: $Enums.VerificationStatus
    verifiedAt: Date | null
    verificationContact: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalAffiliationCountAggregateOutputType | null
    _min: ProfessionalAffiliationMinAggregateOutputType | null
    _max: ProfessionalAffiliationMaxAggregateOutputType | null
  }

  type GetProfessionalAffiliationGroupByPayload<T extends ProfessionalAffiliationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalAffiliationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalAffiliationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalAffiliationGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalAffiliationGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalAffiliationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    institutionName?: boolean
    institutionType?: boolean
    department?: boolean
    position?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    isPrimary?: boolean
    address?: boolean
    phone?: boolean
    website?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationContact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAffiliation"]>

  export type ProfessionalAffiliationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    institutionName?: boolean
    institutionType?: boolean
    department?: boolean
    position?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    isPrimary?: boolean
    address?: boolean
    phone?: boolean
    website?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationContact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAffiliation"]>

  export type ProfessionalAffiliationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    institutionName?: boolean
    institutionType?: boolean
    department?: boolean
    position?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    isPrimary?: boolean
    address?: boolean
    phone?: boolean
    website?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationContact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAffiliation"]>

  export type ProfessionalAffiliationSelectScalar = {
    id?: boolean
    professionalId?: boolean
    institutionName?: boolean
    institutionType?: boolean
    department?: boolean
    position?: boolean
    startDate?: boolean
    endDate?: boolean
    isCurrent?: boolean
    isPrimary?: boolean
    address?: boolean
    phone?: boolean
    website?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    verificationContact?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalAffiliationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "institutionName" | "institutionType" | "department" | "position" | "startDate" | "endDate" | "isCurrent" | "isPrimary" | "address" | "phone" | "website" | "verificationStatus" | "verifiedAt" | "verificationContact" | "createdAt" | "updatedAt", ExtArgs["result"]["professionalAffiliation"]>
  export type ProfessionalAffiliationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalAffiliationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalAffiliationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalAffiliationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalAffiliation"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      institutionName: string
      institutionType: string
      department: string | null
      position: string | null
      startDate: Date
      endDate: Date | null
      isCurrent: boolean
      isPrimary: boolean
      address: Prisma.JsonValue | null
      phone: string | null
      website: string | null
      verificationStatus: $Enums.VerificationStatus
      verifiedAt: Date | null
      verificationContact: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professionalAffiliation"]>
    composites: {}
  }

  type ProfessionalAffiliationGetPayload<S extends boolean | null | undefined | ProfessionalAffiliationDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalAffiliationPayload, S>

  type ProfessionalAffiliationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalAffiliationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalAffiliationCountAggregateInputType | true
    }

  export interface ProfessionalAffiliationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalAffiliation'], meta: { name: 'ProfessionalAffiliation' } }
    /**
     * Find zero or one ProfessionalAffiliation that matches the filter.
     * @param {ProfessionalAffiliationFindUniqueArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalAffiliationFindUniqueArgs>(args: SelectSubset<T, ProfessionalAffiliationFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalAffiliation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalAffiliationFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalAffiliationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalAffiliationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalAffiliation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationFindFirstArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalAffiliationFindFirstArgs>(args?: SelectSubset<T, ProfessionalAffiliationFindFirstArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalAffiliation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationFindFirstOrThrowArgs} args - Arguments to find a ProfessionalAffiliation
     * @example
     * // Get one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalAffiliationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalAffiliationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalAffiliations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalAffiliations
     * const professionalAffiliations = await prisma.professionalAffiliation.findMany()
     * 
     * // Get first 10 ProfessionalAffiliations
     * const professionalAffiliations = await prisma.professionalAffiliation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalAffiliationWithIdOnly = await prisma.professionalAffiliation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalAffiliationFindManyArgs>(args?: SelectSubset<T, ProfessionalAffiliationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalAffiliation.
     * @param {ProfessionalAffiliationCreateArgs} args - Arguments to create a ProfessionalAffiliation.
     * @example
     * // Create one ProfessionalAffiliation
     * const ProfessionalAffiliation = await prisma.professionalAffiliation.create({
     *   data: {
     *     // ... data to create a ProfessionalAffiliation
     *   }
     * })
     * 
     */
    create<T extends ProfessionalAffiliationCreateArgs>(args: SelectSubset<T, ProfessionalAffiliationCreateArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalAffiliations.
     * @param {ProfessionalAffiliationCreateManyArgs} args - Arguments to create many ProfessionalAffiliations.
     * @example
     * // Create many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalAffiliationCreateManyArgs>(args?: SelectSubset<T, ProfessionalAffiliationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalAffiliations and returns the data saved in the database.
     * @param {ProfessionalAffiliationCreateManyAndReturnArgs} args - Arguments to create many ProfessionalAffiliations.
     * @example
     * // Create many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalAffiliations and only return the `id`
     * const professionalAffiliationWithIdOnly = await prisma.professionalAffiliation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalAffiliationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalAffiliationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalAffiliation.
     * @param {ProfessionalAffiliationDeleteArgs} args - Arguments to delete one ProfessionalAffiliation.
     * @example
     * // Delete one ProfessionalAffiliation
     * const ProfessionalAffiliation = await prisma.professionalAffiliation.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalAffiliation
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalAffiliationDeleteArgs>(args: SelectSubset<T, ProfessionalAffiliationDeleteArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalAffiliation.
     * @param {ProfessionalAffiliationUpdateArgs} args - Arguments to update one ProfessionalAffiliation.
     * @example
     * // Update one ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalAffiliationUpdateArgs>(args: SelectSubset<T, ProfessionalAffiliationUpdateArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalAffiliations.
     * @param {ProfessionalAffiliationDeleteManyArgs} args - Arguments to filter ProfessionalAffiliations to delete.
     * @example
     * // Delete a few ProfessionalAffiliations
     * const { count } = await prisma.professionalAffiliation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalAffiliationDeleteManyArgs>(args?: SelectSubset<T, ProfessionalAffiliationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalAffiliations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalAffiliationUpdateManyArgs>(args: SelectSubset<T, ProfessionalAffiliationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalAffiliations and returns the data updated in the database.
     * @param {ProfessionalAffiliationUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalAffiliations.
     * @example
     * // Update many ProfessionalAffiliations
     * const professionalAffiliation = await prisma.professionalAffiliation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalAffiliations and only return the `id`
     * const professionalAffiliationWithIdOnly = await prisma.professionalAffiliation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalAffiliationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalAffiliationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalAffiliation.
     * @param {ProfessionalAffiliationUpsertArgs} args - Arguments to update or create a ProfessionalAffiliation.
     * @example
     * // Update or create a ProfessionalAffiliation
     * const professionalAffiliation = await prisma.professionalAffiliation.upsert({
     *   create: {
     *     // ... data to create a ProfessionalAffiliation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalAffiliation we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalAffiliationUpsertArgs>(args: SelectSubset<T, ProfessionalAffiliationUpsertArgs<ExtArgs>>): Prisma__ProfessionalAffiliationClient<$Result.GetResult<Prisma.$ProfessionalAffiliationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalAffiliations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationCountArgs} args - Arguments to filter ProfessionalAffiliations to count.
     * @example
     * // Count the number of ProfessionalAffiliations
     * const count = await prisma.professionalAffiliation.count({
     *   where: {
     *     // ... the filter for the ProfessionalAffiliations we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalAffiliationCountArgs>(
      args?: Subset<T, ProfessionalAffiliationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalAffiliationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalAffiliation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalAffiliationAggregateArgs>(args: Subset<T, ProfessionalAffiliationAggregateArgs>): Prisma.PrismaPromise<GetProfessionalAffiliationAggregateType<T>>

    /**
     * Group by ProfessionalAffiliation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAffiliationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalAffiliationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalAffiliationGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalAffiliationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalAffiliationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalAffiliationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalAffiliation model
   */
  readonly fields: ProfessionalAffiliationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalAffiliation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalAffiliationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalAffiliation model
   */
  interface ProfessionalAffiliationFieldRefs {
    readonly id: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly professionalId: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly institutionName: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly institutionType: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly department: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly position: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly startDate: FieldRef<"ProfessionalAffiliation", 'DateTime'>
    readonly endDate: FieldRef<"ProfessionalAffiliation", 'DateTime'>
    readonly isCurrent: FieldRef<"ProfessionalAffiliation", 'Boolean'>
    readonly isPrimary: FieldRef<"ProfessionalAffiliation", 'Boolean'>
    readonly address: FieldRef<"ProfessionalAffiliation", 'Json'>
    readonly phone: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly website: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly verificationStatus: FieldRef<"ProfessionalAffiliation", 'VerificationStatus'>
    readonly verifiedAt: FieldRef<"ProfessionalAffiliation", 'DateTime'>
    readonly verificationContact: FieldRef<"ProfessionalAffiliation", 'String'>
    readonly createdAt: FieldRef<"ProfessionalAffiliation", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalAffiliation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalAffiliation findUnique
   */
  export type ProfessionalAffiliationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation findUniqueOrThrow
   */
  export type ProfessionalAffiliationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation findFirst
   */
  export type ProfessionalAffiliationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalAffiliations.
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalAffiliations.
     */
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * ProfessionalAffiliation findFirstOrThrow
   */
  export type ProfessionalAffiliationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliation to fetch.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalAffiliations.
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalAffiliations.
     */
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * ProfessionalAffiliation findMany
   */
  export type ProfessionalAffiliationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAffiliations to fetch.
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAffiliations to fetch.
     */
    orderBy?: ProfessionalAffiliationOrderByWithRelationInput | ProfessionalAffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalAffiliations.
     */
    cursor?: ProfessionalAffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAffiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAffiliations.
     */
    skip?: number
    distinct?: ProfessionalAffiliationScalarFieldEnum | ProfessionalAffiliationScalarFieldEnum[]
  }

  /**
   * ProfessionalAffiliation create
   */
  export type ProfessionalAffiliationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalAffiliation.
     */
    data: XOR<ProfessionalAffiliationCreateInput, ProfessionalAffiliationUncheckedCreateInput>
  }

  /**
   * ProfessionalAffiliation createMany
   */
  export type ProfessionalAffiliationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalAffiliations.
     */
    data: ProfessionalAffiliationCreateManyInput | ProfessionalAffiliationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalAffiliation createManyAndReturn
   */
  export type ProfessionalAffiliationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalAffiliations.
     */
    data: ProfessionalAffiliationCreateManyInput | ProfessionalAffiliationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalAffiliation update
   */
  export type ProfessionalAffiliationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalAffiliation.
     */
    data: XOR<ProfessionalAffiliationUpdateInput, ProfessionalAffiliationUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalAffiliation to update.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation updateMany
   */
  export type ProfessionalAffiliationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalAffiliations.
     */
    data: XOR<ProfessionalAffiliationUpdateManyMutationInput, ProfessionalAffiliationUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalAffiliations to update
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * Limit how many ProfessionalAffiliations to update.
     */
    limit?: number
  }

  /**
   * ProfessionalAffiliation updateManyAndReturn
   */
  export type ProfessionalAffiliationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalAffiliations.
     */
    data: XOR<ProfessionalAffiliationUpdateManyMutationInput, ProfessionalAffiliationUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalAffiliations to update
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * Limit how many ProfessionalAffiliations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalAffiliation upsert
   */
  export type ProfessionalAffiliationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalAffiliation to update in case it exists.
     */
    where: ProfessionalAffiliationWhereUniqueInput
    /**
     * In case the ProfessionalAffiliation found by the `where` argument doesn't exist, create a new ProfessionalAffiliation with this data.
     */
    create: XOR<ProfessionalAffiliationCreateInput, ProfessionalAffiliationUncheckedCreateInput>
    /**
     * In case the ProfessionalAffiliation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalAffiliationUpdateInput, ProfessionalAffiliationUncheckedUpdateInput>
  }

  /**
   * ProfessionalAffiliation delete
   */
  export type ProfessionalAffiliationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalAffiliation to delete.
     */
    where: ProfessionalAffiliationWhereUniqueInput
  }

  /**
   * ProfessionalAffiliation deleteMany
   */
  export type ProfessionalAffiliationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalAffiliations to delete
     */
    where?: ProfessionalAffiliationWhereInput
    /**
     * Limit how many ProfessionalAffiliations to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalAffiliation without action
   */
  export type ProfessionalAffiliationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAffiliation
     */
    select?: ProfessionalAffiliationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAffiliation
     */
    omit?: ProfessionalAffiliationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAffiliationInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalCredential
   */

  export type AggregateProfessionalCredential = {
    _count: ProfessionalCredentialCountAggregateOutputType | null
    _avg: ProfessionalCredentialAvgAggregateOutputType | null
    _sum: ProfessionalCredentialSumAggregateOutputType | null
    _min: ProfessionalCredentialMinAggregateOutputType | null
    _max: ProfessionalCredentialMaxAggregateOutputType | null
  }

  export type ProfessionalCredentialAvgAggregateOutputType = {
    continuingEducationHours: number | null
  }

  export type ProfessionalCredentialSumAggregateOutputType = {
    continuingEducationHours: number | null
  }

  export type ProfessionalCredentialMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    credentialType: string | null
    credentialName: string | null
    issuingOrganization: string | null
    issuedDate: Date | null
    expirationDate: Date | null
    credentialNumber: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    documentUrl: string | null
    description: string | null
    continuingEducationHours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalCredentialMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    credentialType: string | null
    credentialName: string | null
    issuingOrganization: string | null
    issuedDate: Date | null
    expirationDate: Date | null
    credentialNumber: string | null
    verificationStatus: $Enums.VerificationStatus | null
    verifiedAt: Date | null
    documentUrl: string | null
    description: string | null
    continuingEducationHours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalCredentialCountAggregateOutputType = {
    id: number
    professionalId: number
    credentialType: number
    credentialName: number
    issuingOrganization: number
    issuedDate: number
    expirationDate: number
    credentialNumber: number
    verificationStatus: number
    verifiedAt: number
    documentUrl: number
    description: number
    continuingEducationHours: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalCredentialAvgAggregateInputType = {
    continuingEducationHours?: true
  }

  export type ProfessionalCredentialSumAggregateInputType = {
    continuingEducationHours?: true
  }

  export type ProfessionalCredentialMinAggregateInputType = {
    id?: true
    professionalId?: true
    credentialType?: true
    credentialName?: true
    issuingOrganization?: true
    issuedDate?: true
    expirationDate?: true
    credentialNumber?: true
    verificationStatus?: true
    verifiedAt?: true
    documentUrl?: true
    description?: true
    continuingEducationHours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalCredentialMaxAggregateInputType = {
    id?: true
    professionalId?: true
    credentialType?: true
    credentialName?: true
    issuingOrganization?: true
    issuedDate?: true
    expirationDate?: true
    credentialNumber?: true
    verificationStatus?: true
    verifiedAt?: true
    documentUrl?: true
    description?: true
    continuingEducationHours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalCredentialCountAggregateInputType = {
    id?: true
    professionalId?: true
    credentialType?: true
    credentialName?: true
    issuingOrganization?: true
    issuedDate?: true
    expirationDate?: true
    credentialNumber?: true
    verificationStatus?: true
    verifiedAt?: true
    documentUrl?: true
    description?: true
    continuingEducationHours?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalCredential to aggregate.
     */
    where?: ProfessionalCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCredentials to fetch.
     */
    orderBy?: ProfessionalCredentialOrderByWithRelationInput | ProfessionalCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalCredentials
    **/
    _count?: true | ProfessionalCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessionalCredentialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessionalCredentialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalCredentialMaxAggregateInputType
  }

  export type GetProfessionalCredentialAggregateType<T extends ProfessionalCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalCredential[P]>
      : GetScalarType<T[P], AggregateProfessionalCredential[P]>
  }




  export type ProfessionalCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalCredentialWhereInput
    orderBy?: ProfessionalCredentialOrderByWithAggregationInput | ProfessionalCredentialOrderByWithAggregationInput[]
    by: ProfessionalCredentialScalarFieldEnum[] | ProfessionalCredentialScalarFieldEnum
    having?: ProfessionalCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalCredentialCountAggregateInputType | true
    _avg?: ProfessionalCredentialAvgAggregateInputType
    _sum?: ProfessionalCredentialSumAggregateInputType
    _min?: ProfessionalCredentialMinAggregateInputType
    _max?: ProfessionalCredentialMaxAggregateInputType
  }

  export type ProfessionalCredentialGroupByOutputType = {
    id: string
    professionalId: string
    credentialType: string
    credentialName: string
    issuingOrganization: string
    issuedDate: Date
    expirationDate: Date | null
    credentialNumber: string | null
    verificationStatus: $Enums.VerificationStatus
    verifiedAt: Date | null
    documentUrl: string | null
    description: string | null
    continuingEducationHours: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalCredentialCountAggregateOutputType | null
    _avg: ProfessionalCredentialAvgAggregateOutputType | null
    _sum: ProfessionalCredentialSumAggregateOutputType | null
    _min: ProfessionalCredentialMinAggregateOutputType | null
    _max: ProfessionalCredentialMaxAggregateOutputType | null
  }

  type GetProfessionalCredentialGroupByPayload<T extends ProfessionalCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalCredentialGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    credentialType?: boolean
    credentialName?: boolean
    issuingOrganization?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    credentialNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    description?: boolean
    continuingEducationHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalCredential"]>

  export type ProfessionalCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    credentialType?: boolean
    credentialName?: boolean
    issuingOrganization?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    credentialNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    description?: boolean
    continuingEducationHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalCredential"]>

  export type ProfessionalCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    credentialType?: boolean
    credentialName?: boolean
    issuingOrganization?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    credentialNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    description?: boolean
    continuingEducationHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalCredential"]>

  export type ProfessionalCredentialSelectScalar = {
    id?: boolean
    professionalId?: boolean
    credentialType?: boolean
    credentialName?: boolean
    issuingOrganization?: boolean
    issuedDate?: boolean
    expirationDate?: boolean
    credentialNumber?: boolean
    verificationStatus?: boolean
    verifiedAt?: boolean
    documentUrl?: boolean
    description?: boolean
    continuingEducationHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "credentialType" | "credentialName" | "issuingOrganization" | "issuedDate" | "expirationDate" | "credentialNumber" | "verificationStatus" | "verifiedAt" | "documentUrl" | "description" | "continuingEducationHours" | "createdAt" | "updatedAt", ExtArgs["result"]["professionalCredential"]>
  export type ProfessionalCredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalCredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalCredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalCredential"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      credentialType: string
      credentialName: string
      issuingOrganization: string
      issuedDate: Date
      expirationDate: Date | null
      credentialNumber: string | null
      verificationStatus: $Enums.VerificationStatus
      verifiedAt: Date | null
      documentUrl: string | null
      description: string | null
      continuingEducationHours: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professionalCredential"]>
    composites: {}
  }

  type ProfessionalCredentialGetPayload<S extends boolean | null | undefined | ProfessionalCredentialDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalCredentialPayload, S>

  type ProfessionalCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalCredentialCountAggregateInputType | true
    }

  export interface ProfessionalCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalCredential'], meta: { name: 'ProfessionalCredential' } }
    /**
     * Find zero or one ProfessionalCredential that matches the filter.
     * @param {ProfessionalCredentialFindUniqueArgs} args - Arguments to find a ProfessionalCredential
     * @example
     * // Get one ProfessionalCredential
     * const professionalCredential = await prisma.professionalCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalCredentialFindUniqueArgs>(args: SelectSubset<T, ProfessionalCredentialFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalCredentialFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalCredential
     * @example
     * // Get one ProfessionalCredential
     * const professionalCredential = await prisma.professionalCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCredentialFindFirstArgs} args - Arguments to find a ProfessionalCredential
     * @example
     * // Get one ProfessionalCredential
     * const professionalCredential = await prisma.professionalCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalCredentialFindFirstArgs>(args?: SelectSubset<T, ProfessionalCredentialFindFirstArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCredentialFindFirstOrThrowArgs} args - Arguments to find a ProfessionalCredential
     * @example
     * // Get one ProfessionalCredential
     * const professionalCredential = await prisma.professionalCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalCredentials
     * const professionalCredentials = await prisma.professionalCredential.findMany()
     * 
     * // Get first 10 ProfessionalCredentials
     * const professionalCredentials = await prisma.professionalCredential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalCredentialWithIdOnly = await prisma.professionalCredential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalCredentialFindManyArgs>(args?: SelectSubset<T, ProfessionalCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalCredential.
     * @param {ProfessionalCredentialCreateArgs} args - Arguments to create a ProfessionalCredential.
     * @example
     * // Create one ProfessionalCredential
     * const ProfessionalCredential = await prisma.professionalCredential.create({
     *   data: {
     *     // ... data to create a ProfessionalCredential
     *   }
     * })
     * 
     */
    create<T extends ProfessionalCredentialCreateArgs>(args: SelectSubset<T, ProfessionalCredentialCreateArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalCredentials.
     * @param {ProfessionalCredentialCreateManyArgs} args - Arguments to create many ProfessionalCredentials.
     * @example
     * // Create many ProfessionalCredentials
     * const professionalCredential = await prisma.professionalCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalCredentialCreateManyArgs>(args?: SelectSubset<T, ProfessionalCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalCredentials and returns the data saved in the database.
     * @param {ProfessionalCredentialCreateManyAndReturnArgs} args - Arguments to create many ProfessionalCredentials.
     * @example
     * // Create many ProfessionalCredentials
     * const professionalCredential = await prisma.professionalCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalCredentials and only return the `id`
     * const professionalCredentialWithIdOnly = await prisma.professionalCredential.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalCredential.
     * @param {ProfessionalCredentialDeleteArgs} args - Arguments to delete one ProfessionalCredential.
     * @example
     * // Delete one ProfessionalCredential
     * const ProfessionalCredential = await prisma.professionalCredential.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalCredential
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalCredentialDeleteArgs>(args: SelectSubset<T, ProfessionalCredentialDeleteArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalCredential.
     * @param {ProfessionalCredentialUpdateArgs} args - Arguments to update one ProfessionalCredential.
     * @example
     * // Update one ProfessionalCredential
     * const professionalCredential = await prisma.professionalCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalCredentialUpdateArgs>(args: SelectSubset<T, ProfessionalCredentialUpdateArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalCredentials.
     * @param {ProfessionalCredentialDeleteManyArgs} args - Arguments to filter ProfessionalCredentials to delete.
     * @example
     * // Delete a few ProfessionalCredentials
     * const { count } = await prisma.professionalCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalCredentialDeleteManyArgs>(args?: SelectSubset<T, ProfessionalCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalCredentials
     * const professionalCredential = await prisma.professionalCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalCredentialUpdateManyArgs>(args: SelectSubset<T, ProfessionalCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalCredentials and returns the data updated in the database.
     * @param {ProfessionalCredentialUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalCredentials.
     * @example
     * // Update many ProfessionalCredentials
     * const professionalCredential = await prisma.professionalCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalCredentials and only return the `id`
     * const professionalCredentialWithIdOnly = await prisma.professionalCredential.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalCredential.
     * @param {ProfessionalCredentialUpsertArgs} args - Arguments to update or create a ProfessionalCredential.
     * @example
     * // Update or create a ProfessionalCredential
     * const professionalCredential = await prisma.professionalCredential.upsert({
     *   create: {
     *     // ... data to create a ProfessionalCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalCredential we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalCredentialUpsertArgs>(args: SelectSubset<T, ProfessionalCredentialUpsertArgs<ExtArgs>>): Prisma__ProfessionalCredentialClient<$Result.GetResult<Prisma.$ProfessionalCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCredentialCountArgs} args - Arguments to filter ProfessionalCredentials to count.
     * @example
     * // Count the number of ProfessionalCredentials
     * const count = await prisma.professionalCredential.count({
     *   where: {
     *     // ... the filter for the ProfessionalCredentials we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalCredentialCountArgs>(
      args?: Subset<T, ProfessionalCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalCredentialAggregateArgs>(args: Subset<T, ProfessionalCredentialAggregateArgs>): Prisma.PrismaPromise<GetProfessionalCredentialAggregateType<T>>

    /**
     * Group by ProfessionalCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalCredentialGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalCredential model
   */
  readonly fields: ProfessionalCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalCredential model
   */
  interface ProfessionalCredentialFieldRefs {
    readonly id: FieldRef<"ProfessionalCredential", 'String'>
    readonly professionalId: FieldRef<"ProfessionalCredential", 'String'>
    readonly credentialType: FieldRef<"ProfessionalCredential", 'String'>
    readonly credentialName: FieldRef<"ProfessionalCredential", 'String'>
    readonly issuingOrganization: FieldRef<"ProfessionalCredential", 'String'>
    readonly issuedDate: FieldRef<"ProfessionalCredential", 'DateTime'>
    readonly expirationDate: FieldRef<"ProfessionalCredential", 'DateTime'>
    readonly credentialNumber: FieldRef<"ProfessionalCredential", 'String'>
    readonly verificationStatus: FieldRef<"ProfessionalCredential", 'VerificationStatus'>
    readonly verifiedAt: FieldRef<"ProfessionalCredential", 'DateTime'>
    readonly documentUrl: FieldRef<"ProfessionalCredential", 'String'>
    readonly description: FieldRef<"ProfessionalCredential", 'String'>
    readonly continuingEducationHours: FieldRef<"ProfessionalCredential", 'Int'>
    readonly createdAt: FieldRef<"ProfessionalCredential", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalCredential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalCredential findUnique
   */
  export type ProfessionalCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCredential to fetch.
     */
    where: ProfessionalCredentialWhereUniqueInput
  }

  /**
   * ProfessionalCredential findUniqueOrThrow
   */
  export type ProfessionalCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCredential to fetch.
     */
    where: ProfessionalCredentialWhereUniqueInput
  }

  /**
   * ProfessionalCredential findFirst
   */
  export type ProfessionalCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCredential to fetch.
     */
    where?: ProfessionalCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCredentials to fetch.
     */
    orderBy?: ProfessionalCredentialOrderByWithRelationInput | ProfessionalCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalCredentials.
     */
    cursor?: ProfessionalCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalCredentials.
     */
    distinct?: ProfessionalCredentialScalarFieldEnum | ProfessionalCredentialScalarFieldEnum[]
  }

  /**
   * ProfessionalCredential findFirstOrThrow
   */
  export type ProfessionalCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCredential to fetch.
     */
    where?: ProfessionalCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCredentials to fetch.
     */
    orderBy?: ProfessionalCredentialOrderByWithRelationInput | ProfessionalCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalCredentials.
     */
    cursor?: ProfessionalCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalCredentials.
     */
    distinct?: ProfessionalCredentialScalarFieldEnum | ProfessionalCredentialScalarFieldEnum[]
  }

  /**
   * ProfessionalCredential findMany
   */
  export type ProfessionalCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCredentials to fetch.
     */
    where?: ProfessionalCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCredentials to fetch.
     */
    orderBy?: ProfessionalCredentialOrderByWithRelationInput | ProfessionalCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalCredentials.
     */
    cursor?: ProfessionalCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCredentials.
     */
    skip?: number
    distinct?: ProfessionalCredentialScalarFieldEnum | ProfessionalCredentialScalarFieldEnum[]
  }

  /**
   * ProfessionalCredential create
   */
  export type ProfessionalCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalCredential.
     */
    data: XOR<ProfessionalCredentialCreateInput, ProfessionalCredentialUncheckedCreateInput>
  }

  /**
   * ProfessionalCredential createMany
   */
  export type ProfessionalCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalCredentials.
     */
    data: ProfessionalCredentialCreateManyInput | ProfessionalCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalCredential createManyAndReturn
   */
  export type ProfessionalCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalCredentials.
     */
    data: ProfessionalCredentialCreateManyInput | ProfessionalCredentialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalCredential update
   */
  export type ProfessionalCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalCredential.
     */
    data: XOR<ProfessionalCredentialUpdateInput, ProfessionalCredentialUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalCredential to update.
     */
    where: ProfessionalCredentialWhereUniqueInput
  }

  /**
   * ProfessionalCredential updateMany
   */
  export type ProfessionalCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalCredentials.
     */
    data: XOR<ProfessionalCredentialUpdateManyMutationInput, ProfessionalCredentialUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalCredentials to update
     */
    where?: ProfessionalCredentialWhereInput
    /**
     * Limit how many ProfessionalCredentials to update.
     */
    limit?: number
  }

  /**
   * ProfessionalCredential updateManyAndReturn
   */
  export type ProfessionalCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalCredentials.
     */
    data: XOR<ProfessionalCredentialUpdateManyMutationInput, ProfessionalCredentialUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalCredentials to update
     */
    where?: ProfessionalCredentialWhereInput
    /**
     * Limit how many ProfessionalCredentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalCredential upsert
   */
  export type ProfessionalCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalCredential to update in case it exists.
     */
    where: ProfessionalCredentialWhereUniqueInput
    /**
     * In case the ProfessionalCredential found by the `where` argument doesn't exist, create a new ProfessionalCredential with this data.
     */
    create: XOR<ProfessionalCredentialCreateInput, ProfessionalCredentialUncheckedCreateInput>
    /**
     * In case the ProfessionalCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalCredentialUpdateInput, ProfessionalCredentialUncheckedUpdateInput>
  }

  /**
   * ProfessionalCredential delete
   */
  export type ProfessionalCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalCredential to delete.
     */
    where: ProfessionalCredentialWhereUniqueInput
  }

  /**
   * ProfessionalCredential deleteMany
   */
  export type ProfessionalCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalCredentials to delete
     */
    where?: ProfessionalCredentialWhereInput
    /**
     * Limit how many ProfessionalCredentials to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalCredential without action
   */
  export type ProfessionalCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCredential
     */
    select?: ProfessionalCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCredential
     */
    omit?: ProfessionalCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCredentialInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalAvailability
   */

  export type AggregateProfessionalAvailability = {
    _count: ProfessionalAvailabilityCountAggregateOutputType | null
    _avg: ProfessionalAvailabilityAvgAggregateOutputType | null
    _sum: ProfessionalAvailabilitySumAggregateOutputType | null
    _min: ProfessionalAvailabilityMinAggregateOutputType | null
    _max: ProfessionalAvailabilityMaxAggregateOutputType | null
  }

  export type ProfessionalAvailabilityAvgAggregateOutputType = {
    dayOfWeek: number | null
    maxCases: number | null
  }

  export type ProfessionalAvailabilitySumAggregateOutputType = {
    dayOfWeek: number | null
    maxCases: number | null
  }

  export type ProfessionalAvailabilityMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    dayOfWeek: number | null
    startTime: string | null
    endTime: string | null
    timeZone: string | null
    availabilityType: string | null
    maxCases: number | null
    isRecurring: boolean | null
    effectiveFrom: Date | null
    effectiveUntil: Date | null
    isActive: boolean | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalAvailabilityMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    dayOfWeek: number | null
    startTime: string | null
    endTime: string | null
    timeZone: string | null
    availabilityType: string | null
    maxCases: number | null
    isRecurring: boolean | null
    effectiveFrom: Date | null
    effectiveUntil: Date | null
    isActive: boolean | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalAvailabilityCountAggregateOutputType = {
    id: number
    professionalId: number
    dayOfWeek: number
    startTime: number
    endTime: number
    timeZone: number
    availabilityType: number
    maxCases: number
    isRecurring: number
    effectiveFrom: number
    effectiveUntil: number
    isActive: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalAvailabilityAvgAggregateInputType = {
    dayOfWeek?: true
    maxCases?: true
  }

  export type ProfessionalAvailabilitySumAggregateInputType = {
    dayOfWeek?: true
    maxCases?: true
  }

  export type ProfessionalAvailabilityMinAggregateInputType = {
    id?: true
    professionalId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    timeZone?: true
    availabilityType?: true
    maxCases?: true
    isRecurring?: true
    effectiveFrom?: true
    effectiveUntil?: true
    isActive?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalAvailabilityMaxAggregateInputType = {
    id?: true
    professionalId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    timeZone?: true
    availabilityType?: true
    maxCases?: true
    isRecurring?: true
    effectiveFrom?: true
    effectiveUntil?: true
    isActive?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalAvailabilityCountAggregateInputType = {
    id?: true
    professionalId?: true
    dayOfWeek?: true
    startTime?: true
    endTime?: true
    timeZone?: true
    availabilityType?: true
    maxCases?: true
    isRecurring?: true
    effectiveFrom?: true
    effectiveUntil?: true
    isActive?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalAvailabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalAvailability to aggregate.
     */
    where?: ProfessionalAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAvailabilities to fetch.
     */
    orderBy?: ProfessionalAvailabilityOrderByWithRelationInput | ProfessionalAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalAvailabilities
    **/
    _count?: true | ProfessionalAvailabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessionalAvailabilityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessionalAvailabilitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalAvailabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalAvailabilityMaxAggregateInputType
  }

  export type GetProfessionalAvailabilityAggregateType<T extends ProfessionalAvailabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalAvailability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalAvailability[P]>
      : GetScalarType<T[P], AggregateProfessionalAvailability[P]>
  }




  export type ProfessionalAvailabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalAvailabilityWhereInput
    orderBy?: ProfessionalAvailabilityOrderByWithAggregationInput | ProfessionalAvailabilityOrderByWithAggregationInput[]
    by: ProfessionalAvailabilityScalarFieldEnum[] | ProfessionalAvailabilityScalarFieldEnum
    having?: ProfessionalAvailabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalAvailabilityCountAggregateInputType | true
    _avg?: ProfessionalAvailabilityAvgAggregateInputType
    _sum?: ProfessionalAvailabilitySumAggregateInputType
    _min?: ProfessionalAvailabilityMinAggregateInputType
    _max?: ProfessionalAvailabilityMaxAggregateInputType
  }

  export type ProfessionalAvailabilityGroupByOutputType = {
    id: string
    professionalId: string
    dayOfWeek: number
    startTime: string
    endTime: string
    timeZone: string
    availabilityType: string
    maxCases: number | null
    isRecurring: boolean
    effectiveFrom: Date
    effectiveUntil: Date | null
    isActive: boolean
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalAvailabilityCountAggregateOutputType | null
    _avg: ProfessionalAvailabilityAvgAggregateOutputType | null
    _sum: ProfessionalAvailabilitySumAggregateOutputType | null
    _min: ProfessionalAvailabilityMinAggregateOutputType | null
    _max: ProfessionalAvailabilityMaxAggregateOutputType | null
  }

  type GetProfessionalAvailabilityGroupByPayload<T extends ProfessionalAvailabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalAvailabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalAvailabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalAvailabilityGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalAvailabilityGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalAvailabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    timeZone?: boolean
    availabilityType?: boolean
    maxCases?: boolean
    isRecurring?: boolean
    effectiveFrom?: boolean
    effectiveUntil?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAvailability"]>

  export type ProfessionalAvailabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    timeZone?: boolean
    availabilityType?: boolean
    maxCases?: boolean
    isRecurring?: boolean
    effectiveFrom?: boolean
    effectiveUntil?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAvailability"]>

  export type ProfessionalAvailabilitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    timeZone?: boolean
    availabilityType?: boolean
    maxCases?: boolean
    isRecurring?: boolean
    effectiveFrom?: boolean
    effectiveUntil?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalAvailability"]>

  export type ProfessionalAvailabilitySelectScalar = {
    id?: boolean
    professionalId?: boolean
    dayOfWeek?: boolean
    startTime?: boolean
    endTime?: boolean
    timeZone?: boolean
    availabilityType?: boolean
    maxCases?: boolean
    isRecurring?: boolean
    effectiveFrom?: boolean
    effectiveUntil?: boolean
    isActive?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalAvailabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "dayOfWeek" | "startTime" | "endTime" | "timeZone" | "availabilityType" | "maxCases" | "isRecurring" | "effectiveFrom" | "effectiveUntil" | "isActive" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["professionalAvailability"]>
  export type ProfessionalAvailabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalAvailabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalAvailabilityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalAvailabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalAvailability"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      dayOfWeek: number
      startTime: string
      endTime: string
      timeZone: string
      availabilityType: string
      maxCases: number | null
      isRecurring: boolean
      effectiveFrom: Date
      effectiveUntil: Date | null
      isActive: boolean
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professionalAvailability"]>
    composites: {}
  }

  type ProfessionalAvailabilityGetPayload<S extends boolean | null | undefined | ProfessionalAvailabilityDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalAvailabilityPayload, S>

  type ProfessionalAvailabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalAvailabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalAvailabilityCountAggregateInputType | true
    }

  export interface ProfessionalAvailabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalAvailability'], meta: { name: 'ProfessionalAvailability' } }
    /**
     * Find zero or one ProfessionalAvailability that matches the filter.
     * @param {ProfessionalAvailabilityFindUniqueArgs} args - Arguments to find a ProfessionalAvailability
     * @example
     * // Get one ProfessionalAvailability
     * const professionalAvailability = await prisma.professionalAvailability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalAvailabilityFindUniqueArgs>(args: SelectSubset<T, ProfessionalAvailabilityFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalAvailability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalAvailabilityFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalAvailability
     * @example
     * // Get one ProfessionalAvailability
     * const professionalAvailability = await prisma.professionalAvailability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalAvailabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalAvailabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalAvailability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAvailabilityFindFirstArgs} args - Arguments to find a ProfessionalAvailability
     * @example
     * // Get one ProfessionalAvailability
     * const professionalAvailability = await prisma.professionalAvailability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalAvailabilityFindFirstArgs>(args?: SelectSubset<T, ProfessionalAvailabilityFindFirstArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalAvailability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAvailabilityFindFirstOrThrowArgs} args - Arguments to find a ProfessionalAvailability
     * @example
     * // Get one ProfessionalAvailability
     * const professionalAvailability = await prisma.professionalAvailability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalAvailabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalAvailabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalAvailabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAvailabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalAvailabilities
     * const professionalAvailabilities = await prisma.professionalAvailability.findMany()
     * 
     * // Get first 10 ProfessionalAvailabilities
     * const professionalAvailabilities = await prisma.professionalAvailability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalAvailabilityWithIdOnly = await prisma.professionalAvailability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalAvailabilityFindManyArgs>(args?: SelectSubset<T, ProfessionalAvailabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalAvailability.
     * @param {ProfessionalAvailabilityCreateArgs} args - Arguments to create a ProfessionalAvailability.
     * @example
     * // Create one ProfessionalAvailability
     * const ProfessionalAvailability = await prisma.professionalAvailability.create({
     *   data: {
     *     // ... data to create a ProfessionalAvailability
     *   }
     * })
     * 
     */
    create<T extends ProfessionalAvailabilityCreateArgs>(args: SelectSubset<T, ProfessionalAvailabilityCreateArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalAvailabilities.
     * @param {ProfessionalAvailabilityCreateManyArgs} args - Arguments to create many ProfessionalAvailabilities.
     * @example
     * // Create many ProfessionalAvailabilities
     * const professionalAvailability = await prisma.professionalAvailability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalAvailabilityCreateManyArgs>(args?: SelectSubset<T, ProfessionalAvailabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalAvailabilities and returns the data saved in the database.
     * @param {ProfessionalAvailabilityCreateManyAndReturnArgs} args - Arguments to create many ProfessionalAvailabilities.
     * @example
     * // Create many ProfessionalAvailabilities
     * const professionalAvailability = await prisma.professionalAvailability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalAvailabilities and only return the `id`
     * const professionalAvailabilityWithIdOnly = await prisma.professionalAvailability.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalAvailabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalAvailabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalAvailability.
     * @param {ProfessionalAvailabilityDeleteArgs} args - Arguments to delete one ProfessionalAvailability.
     * @example
     * // Delete one ProfessionalAvailability
     * const ProfessionalAvailability = await prisma.professionalAvailability.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalAvailability
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalAvailabilityDeleteArgs>(args: SelectSubset<T, ProfessionalAvailabilityDeleteArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalAvailability.
     * @param {ProfessionalAvailabilityUpdateArgs} args - Arguments to update one ProfessionalAvailability.
     * @example
     * // Update one ProfessionalAvailability
     * const professionalAvailability = await prisma.professionalAvailability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalAvailabilityUpdateArgs>(args: SelectSubset<T, ProfessionalAvailabilityUpdateArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalAvailabilities.
     * @param {ProfessionalAvailabilityDeleteManyArgs} args - Arguments to filter ProfessionalAvailabilities to delete.
     * @example
     * // Delete a few ProfessionalAvailabilities
     * const { count } = await prisma.professionalAvailability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalAvailabilityDeleteManyArgs>(args?: SelectSubset<T, ProfessionalAvailabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAvailabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalAvailabilities
     * const professionalAvailability = await prisma.professionalAvailability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalAvailabilityUpdateManyArgs>(args: SelectSubset<T, ProfessionalAvailabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalAvailabilities and returns the data updated in the database.
     * @param {ProfessionalAvailabilityUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalAvailabilities.
     * @example
     * // Update many ProfessionalAvailabilities
     * const professionalAvailability = await prisma.professionalAvailability.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalAvailabilities and only return the `id`
     * const professionalAvailabilityWithIdOnly = await prisma.professionalAvailability.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalAvailabilityUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalAvailabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalAvailability.
     * @param {ProfessionalAvailabilityUpsertArgs} args - Arguments to update or create a ProfessionalAvailability.
     * @example
     * // Update or create a ProfessionalAvailability
     * const professionalAvailability = await prisma.professionalAvailability.upsert({
     *   create: {
     *     // ... data to create a ProfessionalAvailability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalAvailability we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalAvailabilityUpsertArgs>(args: SelectSubset<T, ProfessionalAvailabilityUpsertArgs<ExtArgs>>): Prisma__ProfessionalAvailabilityClient<$Result.GetResult<Prisma.$ProfessionalAvailabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalAvailabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAvailabilityCountArgs} args - Arguments to filter ProfessionalAvailabilities to count.
     * @example
     * // Count the number of ProfessionalAvailabilities
     * const count = await prisma.professionalAvailability.count({
     *   where: {
     *     // ... the filter for the ProfessionalAvailabilities we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalAvailabilityCountArgs>(
      args?: Subset<T, ProfessionalAvailabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalAvailabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAvailabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalAvailabilityAggregateArgs>(args: Subset<T, ProfessionalAvailabilityAggregateArgs>): Prisma.PrismaPromise<GetProfessionalAvailabilityAggregateType<T>>

    /**
     * Group by ProfessionalAvailability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAvailabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalAvailabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalAvailabilityGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalAvailabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalAvailabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalAvailabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalAvailability model
   */
  readonly fields: ProfessionalAvailabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalAvailability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalAvailabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalAvailability model
   */
  interface ProfessionalAvailabilityFieldRefs {
    readonly id: FieldRef<"ProfessionalAvailability", 'String'>
    readonly professionalId: FieldRef<"ProfessionalAvailability", 'String'>
    readonly dayOfWeek: FieldRef<"ProfessionalAvailability", 'Int'>
    readonly startTime: FieldRef<"ProfessionalAvailability", 'String'>
    readonly endTime: FieldRef<"ProfessionalAvailability", 'String'>
    readonly timeZone: FieldRef<"ProfessionalAvailability", 'String'>
    readonly availabilityType: FieldRef<"ProfessionalAvailability", 'String'>
    readonly maxCases: FieldRef<"ProfessionalAvailability", 'Int'>
    readonly isRecurring: FieldRef<"ProfessionalAvailability", 'Boolean'>
    readonly effectiveFrom: FieldRef<"ProfessionalAvailability", 'DateTime'>
    readonly effectiveUntil: FieldRef<"ProfessionalAvailability", 'DateTime'>
    readonly isActive: FieldRef<"ProfessionalAvailability", 'Boolean'>
    readonly notes: FieldRef<"ProfessionalAvailability", 'String'>
    readonly createdAt: FieldRef<"ProfessionalAvailability", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalAvailability", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalAvailability findUnique
   */
  export type ProfessionalAvailabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAvailability to fetch.
     */
    where: ProfessionalAvailabilityWhereUniqueInput
  }

  /**
   * ProfessionalAvailability findUniqueOrThrow
   */
  export type ProfessionalAvailabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAvailability to fetch.
     */
    where: ProfessionalAvailabilityWhereUniqueInput
  }

  /**
   * ProfessionalAvailability findFirst
   */
  export type ProfessionalAvailabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAvailability to fetch.
     */
    where?: ProfessionalAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAvailabilities to fetch.
     */
    orderBy?: ProfessionalAvailabilityOrderByWithRelationInput | ProfessionalAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalAvailabilities.
     */
    cursor?: ProfessionalAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalAvailabilities.
     */
    distinct?: ProfessionalAvailabilityScalarFieldEnum | ProfessionalAvailabilityScalarFieldEnum[]
  }

  /**
   * ProfessionalAvailability findFirstOrThrow
   */
  export type ProfessionalAvailabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAvailability to fetch.
     */
    where?: ProfessionalAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAvailabilities to fetch.
     */
    orderBy?: ProfessionalAvailabilityOrderByWithRelationInput | ProfessionalAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalAvailabilities.
     */
    cursor?: ProfessionalAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAvailabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalAvailabilities.
     */
    distinct?: ProfessionalAvailabilityScalarFieldEnum | ProfessionalAvailabilityScalarFieldEnum[]
  }

  /**
   * ProfessionalAvailability findMany
   */
  export type ProfessionalAvailabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalAvailabilities to fetch.
     */
    where?: ProfessionalAvailabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalAvailabilities to fetch.
     */
    orderBy?: ProfessionalAvailabilityOrderByWithRelationInput | ProfessionalAvailabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalAvailabilities.
     */
    cursor?: ProfessionalAvailabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalAvailabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalAvailabilities.
     */
    skip?: number
    distinct?: ProfessionalAvailabilityScalarFieldEnum | ProfessionalAvailabilityScalarFieldEnum[]
  }

  /**
   * ProfessionalAvailability create
   */
  export type ProfessionalAvailabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalAvailability.
     */
    data: XOR<ProfessionalAvailabilityCreateInput, ProfessionalAvailabilityUncheckedCreateInput>
  }

  /**
   * ProfessionalAvailability createMany
   */
  export type ProfessionalAvailabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalAvailabilities.
     */
    data: ProfessionalAvailabilityCreateManyInput | ProfessionalAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalAvailability createManyAndReturn
   */
  export type ProfessionalAvailabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalAvailabilities.
     */
    data: ProfessionalAvailabilityCreateManyInput | ProfessionalAvailabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalAvailability update
   */
  export type ProfessionalAvailabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalAvailability.
     */
    data: XOR<ProfessionalAvailabilityUpdateInput, ProfessionalAvailabilityUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalAvailability to update.
     */
    where: ProfessionalAvailabilityWhereUniqueInput
  }

  /**
   * ProfessionalAvailability updateMany
   */
  export type ProfessionalAvailabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalAvailabilities.
     */
    data: XOR<ProfessionalAvailabilityUpdateManyMutationInput, ProfessionalAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalAvailabilities to update
     */
    where?: ProfessionalAvailabilityWhereInput
    /**
     * Limit how many ProfessionalAvailabilities to update.
     */
    limit?: number
  }

  /**
   * ProfessionalAvailability updateManyAndReturn
   */
  export type ProfessionalAvailabilityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalAvailabilities.
     */
    data: XOR<ProfessionalAvailabilityUpdateManyMutationInput, ProfessionalAvailabilityUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalAvailabilities to update
     */
    where?: ProfessionalAvailabilityWhereInput
    /**
     * Limit how many ProfessionalAvailabilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalAvailability upsert
   */
  export type ProfessionalAvailabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalAvailability to update in case it exists.
     */
    where: ProfessionalAvailabilityWhereUniqueInput
    /**
     * In case the ProfessionalAvailability found by the `where` argument doesn't exist, create a new ProfessionalAvailability with this data.
     */
    create: XOR<ProfessionalAvailabilityCreateInput, ProfessionalAvailabilityUncheckedCreateInput>
    /**
     * In case the ProfessionalAvailability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalAvailabilityUpdateInput, ProfessionalAvailabilityUncheckedUpdateInput>
  }

  /**
   * ProfessionalAvailability delete
   */
  export type ProfessionalAvailabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalAvailability to delete.
     */
    where: ProfessionalAvailabilityWhereUniqueInput
  }

  /**
   * ProfessionalAvailability deleteMany
   */
  export type ProfessionalAvailabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalAvailabilities to delete
     */
    where?: ProfessionalAvailabilityWhereInput
    /**
     * Limit how many ProfessionalAvailabilities to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalAvailability without action
   */
  export type ProfessionalAvailabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalAvailability
     */
    select?: ProfessionalAvailabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalAvailability
     */
    omit?: ProfessionalAvailabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalAvailabilityInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalReview
   */

  export type AggregateProfessionalReview = {
    _count: ProfessionalReviewCountAggregateOutputType | null
    _avg: ProfessionalReviewAvgAggregateOutputType | null
    _sum: ProfessionalReviewSumAggregateOutputType | null
    _min: ProfessionalReviewMinAggregateOutputType | null
    _max: ProfessionalReviewMaxAggregateOutputType | null
  }

  export type ProfessionalReviewAvgAggregateOutputType = {
    rating: number | null
    expertise: number | null
    communication: number | null
    timeliness: number | null
    professionalism: number | null
  }

  export type ProfessionalReviewSumAggregateOutputType = {
    rating: number | null
    expertise: number | null
    communication: number | null
    timeliness: number | null
    professionalism: number | null
  }

  export type ProfessionalReviewMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    reviewerId: string | null
    reviewerType: string | null
    caseId: string | null
    rating: number | null
    title: string | null
    review: string | null
    expertise: number | null
    communication: number | null
    timeliness: number | null
    professionalism: number | null
    isPublic: boolean | null
    isVerified: boolean | null
    moderationStatus: string | null
    moderatedBy: string | null
    moderatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalReviewMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    reviewerId: string | null
    reviewerType: string | null
    caseId: string | null
    rating: number | null
    title: string | null
    review: string | null
    expertise: number | null
    communication: number | null
    timeliness: number | null
    professionalism: number | null
    isPublic: boolean | null
    isVerified: boolean | null
    moderationStatus: string | null
    moderatedBy: string | null
    moderatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalReviewCountAggregateOutputType = {
    id: number
    professionalId: number
    reviewerId: number
    reviewerType: number
    caseId: number
    rating: number
    title: number
    review: number
    expertise: number
    communication: number
    timeliness: number
    professionalism: number
    isPublic: number
    isVerified: number
    moderationStatus: number
    moderatedBy: number
    moderatedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalReviewAvgAggregateInputType = {
    rating?: true
    expertise?: true
    communication?: true
    timeliness?: true
    professionalism?: true
  }

  export type ProfessionalReviewSumAggregateInputType = {
    rating?: true
    expertise?: true
    communication?: true
    timeliness?: true
    professionalism?: true
  }

  export type ProfessionalReviewMinAggregateInputType = {
    id?: true
    professionalId?: true
    reviewerId?: true
    reviewerType?: true
    caseId?: true
    rating?: true
    title?: true
    review?: true
    expertise?: true
    communication?: true
    timeliness?: true
    professionalism?: true
    isPublic?: true
    isVerified?: true
    moderationStatus?: true
    moderatedBy?: true
    moderatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalReviewMaxAggregateInputType = {
    id?: true
    professionalId?: true
    reviewerId?: true
    reviewerType?: true
    caseId?: true
    rating?: true
    title?: true
    review?: true
    expertise?: true
    communication?: true
    timeliness?: true
    professionalism?: true
    isPublic?: true
    isVerified?: true
    moderationStatus?: true
    moderatedBy?: true
    moderatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalReviewCountAggregateInputType = {
    id?: true
    professionalId?: true
    reviewerId?: true
    reviewerType?: true
    caseId?: true
    rating?: true
    title?: true
    review?: true
    expertise?: true
    communication?: true
    timeliness?: true
    professionalism?: true
    isPublic?: true
    isVerified?: true
    moderationStatus?: true
    moderatedBy?: true
    moderatedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalReview to aggregate.
     */
    where?: ProfessionalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalReviews to fetch.
     */
    orderBy?: ProfessionalReviewOrderByWithRelationInput | ProfessionalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalReviews
    **/
    _count?: true | ProfessionalReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessionalReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessionalReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalReviewMaxAggregateInputType
  }

  export type GetProfessionalReviewAggregateType<T extends ProfessionalReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalReview[P]>
      : GetScalarType<T[P], AggregateProfessionalReview[P]>
  }




  export type ProfessionalReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalReviewWhereInput
    orderBy?: ProfessionalReviewOrderByWithAggregationInput | ProfessionalReviewOrderByWithAggregationInput[]
    by: ProfessionalReviewScalarFieldEnum[] | ProfessionalReviewScalarFieldEnum
    having?: ProfessionalReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalReviewCountAggregateInputType | true
    _avg?: ProfessionalReviewAvgAggregateInputType
    _sum?: ProfessionalReviewSumAggregateInputType
    _min?: ProfessionalReviewMinAggregateInputType
    _max?: ProfessionalReviewMaxAggregateInputType
  }

  export type ProfessionalReviewGroupByOutputType = {
    id: string
    professionalId: string
    reviewerId: string
    reviewerType: string
    caseId: string | null
    rating: number
    title: string | null
    review: string | null
    expertise: number | null
    communication: number | null
    timeliness: number | null
    professionalism: number | null
    isPublic: boolean
    isVerified: boolean
    moderationStatus: string
    moderatedBy: string | null
    moderatedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalReviewCountAggregateOutputType | null
    _avg: ProfessionalReviewAvgAggregateOutputType | null
    _sum: ProfessionalReviewSumAggregateOutputType | null
    _min: ProfessionalReviewMinAggregateOutputType | null
    _max: ProfessionalReviewMaxAggregateOutputType | null
  }

  type GetProfessionalReviewGroupByPayload<T extends ProfessionalReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalReviewGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    caseId?: boolean
    rating?: boolean
    title?: boolean
    review?: boolean
    expertise?: boolean
    communication?: boolean
    timeliness?: boolean
    professionalism?: boolean
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: boolean
    moderatedBy?: boolean
    moderatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalReview"]>

  export type ProfessionalReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    caseId?: boolean
    rating?: boolean
    title?: boolean
    review?: boolean
    expertise?: boolean
    communication?: boolean
    timeliness?: boolean
    professionalism?: boolean
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: boolean
    moderatedBy?: boolean
    moderatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalReview"]>

  export type ProfessionalReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    caseId?: boolean
    rating?: boolean
    title?: boolean
    review?: boolean
    expertise?: boolean
    communication?: boolean
    timeliness?: boolean
    professionalism?: boolean
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: boolean
    moderatedBy?: boolean
    moderatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalReview"]>

  export type ProfessionalReviewSelectScalar = {
    id?: boolean
    professionalId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    caseId?: boolean
    rating?: boolean
    title?: boolean
    review?: boolean
    expertise?: boolean
    communication?: boolean
    timeliness?: boolean
    professionalism?: boolean
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: boolean
    moderatedBy?: boolean
    moderatedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "reviewerId" | "reviewerType" | "caseId" | "rating" | "title" | "review" | "expertise" | "communication" | "timeliness" | "professionalism" | "isPublic" | "isVerified" | "moderationStatus" | "moderatedBy" | "moderatedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["professionalReview"]>
  export type ProfessionalReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalReview"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      reviewerId: string
      reviewerType: string
      caseId: string | null
      rating: number
      title: string | null
      review: string | null
      expertise: number | null
      communication: number | null
      timeliness: number | null
      professionalism: number | null
      isPublic: boolean
      isVerified: boolean
      moderationStatus: string
      moderatedBy: string | null
      moderatedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professionalReview"]>
    composites: {}
  }

  type ProfessionalReviewGetPayload<S extends boolean | null | undefined | ProfessionalReviewDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalReviewPayload, S>

  type ProfessionalReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalReviewCountAggregateInputType | true
    }

  export interface ProfessionalReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalReview'], meta: { name: 'ProfessionalReview' } }
    /**
     * Find zero or one ProfessionalReview that matches the filter.
     * @param {ProfessionalReviewFindUniqueArgs} args - Arguments to find a ProfessionalReview
     * @example
     * // Get one ProfessionalReview
     * const professionalReview = await prisma.professionalReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalReviewFindUniqueArgs>(args: SelectSubset<T, ProfessionalReviewFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalReviewFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalReview
     * @example
     * // Get one ProfessionalReview
     * const professionalReview = await prisma.professionalReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalReviewFindFirstArgs} args - Arguments to find a ProfessionalReview
     * @example
     * // Get one ProfessionalReview
     * const professionalReview = await prisma.professionalReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalReviewFindFirstArgs>(args?: SelectSubset<T, ProfessionalReviewFindFirstArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalReviewFindFirstOrThrowArgs} args - Arguments to find a ProfessionalReview
     * @example
     * // Get one ProfessionalReview
     * const professionalReview = await prisma.professionalReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalReviews
     * const professionalReviews = await prisma.professionalReview.findMany()
     * 
     * // Get first 10 ProfessionalReviews
     * const professionalReviews = await prisma.professionalReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalReviewWithIdOnly = await prisma.professionalReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalReviewFindManyArgs>(args?: SelectSubset<T, ProfessionalReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalReview.
     * @param {ProfessionalReviewCreateArgs} args - Arguments to create a ProfessionalReview.
     * @example
     * // Create one ProfessionalReview
     * const ProfessionalReview = await prisma.professionalReview.create({
     *   data: {
     *     // ... data to create a ProfessionalReview
     *   }
     * })
     * 
     */
    create<T extends ProfessionalReviewCreateArgs>(args: SelectSubset<T, ProfessionalReviewCreateArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalReviews.
     * @param {ProfessionalReviewCreateManyArgs} args - Arguments to create many ProfessionalReviews.
     * @example
     * // Create many ProfessionalReviews
     * const professionalReview = await prisma.professionalReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalReviewCreateManyArgs>(args?: SelectSubset<T, ProfessionalReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalReviews and returns the data saved in the database.
     * @param {ProfessionalReviewCreateManyAndReturnArgs} args - Arguments to create many ProfessionalReviews.
     * @example
     * // Create many ProfessionalReviews
     * const professionalReview = await prisma.professionalReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalReviews and only return the `id`
     * const professionalReviewWithIdOnly = await prisma.professionalReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalReview.
     * @param {ProfessionalReviewDeleteArgs} args - Arguments to delete one ProfessionalReview.
     * @example
     * // Delete one ProfessionalReview
     * const ProfessionalReview = await prisma.professionalReview.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalReview
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalReviewDeleteArgs>(args: SelectSubset<T, ProfessionalReviewDeleteArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalReview.
     * @param {ProfessionalReviewUpdateArgs} args - Arguments to update one ProfessionalReview.
     * @example
     * // Update one ProfessionalReview
     * const professionalReview = await prisma.professionalReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalReviewUpdateArgs>(args: SelectSubset<T, ProfessionalReviewUpdateArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalReviews.
     * @param {ProfessionalReviewDeleteManyArgs} args - Arguments to filter ProfessionalReviews to delete.
     * @example
     * // Delete a few ProfessionalReviews
     * const { count } = await prisma.professionalReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalReviewDeleteManyArgs>(args?: SelectSubset<T, ProfessionalReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalReviews
     * const professionalReview = await prisma.professionalReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalReviewUpdateManyArgs>(args: SelectSubset<T, ProfessionalReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalReviews and returns the data updated in the database.
     * @param {ProfessionalReviewUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalReviews.
     * @example
     * // Update many ProfessionalReviews
     * const professionalReview = await prisma.professionalReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalReviews and only return the `id`
     * const professionalReviewWithIdOnly = await prisma.professionalReview.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalReview.
     * @param {ProfessionalReviewUpsertArgs} args - Arguments to update or create a ProfessionalReview.
     * @example
     * // Update or create a ProfessionalReview
     * const professionalReview = await prisma.professionalReview.upsert({
     *   create: {
     *     // ... data to create a ProfessionalReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalReview we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalReviewUpsertArgs>(args: SelectSubset<T, ProfessionalReviewUpsertArgs<ExtArgs>>): Prisma__ProfessionalReviewClient<$Result.GetResult<Prisma.$ProfessionalReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalReviewCountArgs} args - Arguments to filter ProfessionalReviews to count.
     * @example
     * // Count the number of ProfessionalReviews
     * const count = await prisma.professionalReview.count({
     *   where: {
     *     // ... the filter for the ProfessionalReviews we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalReviewCountArgs>(
      args?: Subset<T, ProfessionalReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalReviewAggregateArgs>(args: Subset<T, ProfessionalReviewAggregateArgs>): Prisma.PrismaPromise<GetProfessionalReviewAggregateType<T>>

    /**
     * Group by ProfessionalReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalReviewGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalReview model
   */
  readonly fields: ProfessionalReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalReview model
   */
  interface ProfessionalReviewFieldRefs {
    readonly id: FieldRef<"ProfessionalReview", 'String'>
    readonly professionalId: FieldRef<"ProfessionalReview", 'String'>
    readonly reviewerId: FieldRef<"ProfessionalReview", 'String'>
    readonly reviewerType: FieldRef<"ProfessionalReview", 'String'>
    readonly caseId: FieldRef<"ProfessionalReview", 'String'>
    readonly rating: FieldRef<"ProfessionalReview", 'Float'>
    readonly title: FieldRef<"ProfessionalReview", 'String'>
    readonly review: FieldRef<"ProfessionalReview", 'String'>
    readonly expertise: FieldRef<"ProfessionalReview", 'Float'>
    readonly communication: FieldRef<"ProfessionalReview", 'Float'>
    readonly timeliness: FieldRef<"ProfessionalReview", 'Float'>
    readonly professionalism: FieldRef<"ProfessionalReview", 'Float'>
    readonly isPublic: FieldRef<"ProfessionalReview", 'Boolean'>
    readonly isVerified: FieldRef<"ProfessionalReview", 'Boolean'>
    readonly moderationStatus: FieldRef<"ProfessionalReview", 'String'>
    readonly moderatedBy: FieldRef<"ProfessionalReview", 'String'>
    readonly moderatedAt: FieldRef<"ProfessionalReview", 'DateTime'>
    readonly createdAt: FieldRef<"ProfessionalReview", 'DateTime'>
    readonly updatedAt: FieldRef<"ProfessionalReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalReview findUnique
   */
  export type ProfessionalReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalReview to fetch.
     */
    where: ProfessionalReviewWhereUniqueInput
  }

  /**
   * ProfessionalReview findUniqueOrThrow
   */
  export type ProfessionalReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalReview to fetch.
     */
    where: ProfessionalReviewWhereUniqueInput
  }

  /**
   * ProfessionalReview findFirst
   */
  export type ProfessionalReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalReview to fetch.
     */
    where?: ProfessionalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalReviews to fetch.
     */
    orderBy?: ProfessionalReviewOrderByWithRelationInput | ProfessionalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalReviews.
     */
    cursor?: ProfessionalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalReviews.
     */
    distinct?: ProfessionalReviewScalarFieldEnum | ProfessionalReviewScalarFieldEnum[]
  }

  /**
   * ProfessionalReview findFirstOrThrow
   */
  export type ProfessionalReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalReview to fetch.
     */
    where?: ProfessionalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalReviews to fetch.
     */
    orderBy?: ProfessionalReviewOrderByWithRelationInput | ProfessionalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalReviews.
     */
    cursor?: ProfessionalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalReviews.
     */
    distinct?: ProfessionalReviewScalarFieldEnum | ProfessionalReviewScalarFieldEnum[]
  }

  /**
   * ProfessionalReview findMany
   */
  export type ProfessionalReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalReviews to fetch.
     */
    where?: ProfessionalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalReviews to fetch.
     */
    orderBy?: ProfessionalReviewOrderByWithRelationInput | ProfessionalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalReviews.
     */
    cursor?: ProfessionalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalReviews.
     */
    skip?: number
    distinct?: ProfessionalReviewScalarFieldEnum | ProfessionalReviewScalarFieldEnum[]
  }

  /**
   * ProfessionalReview create
   */
  export type ProfessionalReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalReview.
     */
    data: XOR<ProfessionalReviewCreateInput, ProfessionalReviewUncheckedCreateInput>
  }

  /**
   * ProfessionalReview createMany
   */
  export type ProfessionalReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalReviews.
     */
    data: ProfessionalReviewCreateManyInput | ProfessionalReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalReview createManyAndReturn
   */
  export type ProfessionalReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalReviews.
     */
    data: ProfessionalReviewCreateManyInput | ProfessionalReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalReview update
   */
  export type ProfessionalReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalReview.
     */
    data: XOR<ProfessionalReviewUpdateInput, ProfessionalReviewUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalReview to update.
     */
    where: ProfessionalReviewWhereUniqueInput
  }

  /**
   * ProfessionalReview updateMany
   */
  export type ProfessionalReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalReviews.
     */
    data: XOR<ProfessionalReviewUpdateManyMutationInput, ProfessionalReviewUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalReviews to update
     */
    where?: ProfessionalReviewWhereInput
    /**
     * Limit how many ProfessionalReviews to update.
     */
    limit?: number
  }

  /**
   * ProfessionalReview updateManyAndReturn
   */
  export type ProfessionalReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalReviews.
     */
    data: XOR<ProfessionalReviewUpdateManyMutationInput, ProfessionalReviewUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalReviews to update
     */
    where?: ProfessionalReviewWhereInput
    /**
     * Limit how many ProfessionalReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalReview upsert
   */
  export type ProfessionalReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalReview to update in case it exists.
     */
    where: ProfessionalReviewWhereUniqueInput
    /**
     * In case the ProfessionalReview found by the `where` argument doesn't exist, create a new ProfessionalReview with this data.
     */
    create: XOR<ProfessionalReviewCreateInput, ProfessionalReviewUncheckedCreateInput>
    /**
     * In case the ProfessionalReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalReviewUpdateInput, ProfessionalReviewUncheckedUpdateInput>
  }

  /**
   * ProfessionalReview delete
   */
  export type ProfessionalReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalReview to delete.
     */
    where: ProfessionalReviewWhereUniqueInput
  }

  /**
   * ProfessionalReview deleteMany
   */
  export type ProfessionalReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalReviews to delete
     */
    where?: ProfessionalReviewWhereInput
    /**
     * Limit how many ProfessionalReviews to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalReview without action
   */
  export type ProfessionalReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalReview
     */
    select?: ProfessionalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalReview
     */
    omit?: ProfessionalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalReviewInclude<ExtArgs> | null
  }


  /**
   * Model UserSession
   */

  export type AggregateUserSession = {
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  export type UserSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    ipAddress: string | null
    userAgent: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type UserSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tokenHash: string | null
    ipAddress: string | null
    userAgent: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type UserSessionCountAggregateOutputType = {
    id: number
    userId: number
    tokenHash: number
    deviceInfo: number
    ipAddress: number
    userAgent: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type UserSessionMinAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    ipAddress?: true
    userAgent?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type UserSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    ipAddress?: true
    userAgent?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type UserSessionCountAggregateInputType = {
    id?: true
    userId?: true
    tokenHash?: true
    deviceInfo?: true
    ipAddress?: true
    userAgent?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type UserSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSession to aggregate.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSessions
    **/
    _count?: true | UserSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSessionMaxAggregateInputType
  }

  export type GetUserSessionAggregateType<T extends UserSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSession[P]>
      : GetScalarType<T[P], AggregateUserSession[P]>
  }




  export type UserSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSessionWhereInput
    orderBy?: UserSessionOrderByWithAggregationInput | UserSessionOrderByWithAggregationInput[]
    by: UserSessionScalarFieldEnum[] | UserSessionScalarFieldEnum
    having?: UserSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSessionCountAggregateInputType | true
    _min?: UserSessionMinAggregateInputType
    _max?: UserSessionMaxAggregateInputType
  }

  export type UserSessionGroupByOutputType = {
    id: string
    userId: string
    tokenHash: string
    deviceInfo: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    expiresAt: Date
    revokedAt: Date | null
    createdAt: Date
    _count: UserSessionCountAggregateOutputType | null
    _min: UserSessionMinAggregateOutputType | null
    _max: UserSessionMaxAggregateOutputType | null
  }

  type GetUserSessionGroupByPayload<T extends UserSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSessionGroupByOutputType[P]>
        }
      >
    >


  export type UserSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSession"]>

  export type UserSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    tokenHash?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type UserSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tokenHash" | "deviceInfo" | "ipAddress" | "userAgent" | "expiresAt" | "revokedAt" | "createdAt", ExtArgs["result"]["userSession"]>
  export type UserSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tokenHash: string
      deviceInfo: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      expiresAt: Date
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["userSession"]>
    composites: {}
  }

  type UserSessionGetPayload<S extends boolean | null | undefined | UserSessionDefaultArgs> = $Result.GetResult<Prisma.$UserSessionPayload, S>

  type UserSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSessionCountAggregateInputType | true
    }

  export interface UserSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSession'], meta: { name: 'UserSession' } }
    /**
     * Find zero or one UserSession that matches the filter.
     * @param {UserSessionFindUniqueArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSessionFindUniqueArgs>(args: SelectSubset<T, UserSessionFindUniqueArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSessionFindUniqueOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSessionFindFirstArgs>(args?: SelectSubset<T, UserSessionFindFirstArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindFirstOrThrowArgs} args - Arguments to find a UserSession
     * @example
     * // Get one UserSession
     * const userSession = await prisma.userSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSessions
     * const userSessions = await prisma.userSession.findMany()
     * 
     * // Get first 10 UserSessions
     * const userSessions = await prisma.userSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSessionWithIdOnly = await prisma.userSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSessionFindManyArgs>(args?: SelectSubset<T, UserSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSession.
     * @param {UserSessionCreateArgs} args - Arguments to create a UserSession.
     * @example
     * // Create one UserSession
     * const UserSession = await prisma.userSession.create({
     *   data: {
     *     // ... data to create a UserSession
     *   }
     * })
     * 
     */
    create<T extends UserSessionCreateArgs>(args: SelectSubset<T, UserSessionCreateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSessions.
     * @param {UserSessionCreateManyArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSessionCreateManyArgs>(args?: SelectSubset<T, UserSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSessions and returns the data saved in the database.
     * @param {UserSessionCreateManyAndReturnArgs} args - Arguments to create many UserSessions.
     * @example
     * // Create many UserSessions
     * const userSession = await prisma.userSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSession.
     * @param {UserSessionDeleteArgs} args - Arguments to delete one UserSession.
     * @example
     * // Delete one UserSession
     * const UserSession = await prisma.userSession.delete({
     *   where: {
     *     // ... filter to delete one UserSession
     *   }
     * })
     * 
     */
    delete<T extends UserSessionDeleteArgs>(args: SelectSubset<T, UserSessionDeleteArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSession.
     * @param {UserSessionUpdateArgs} args - Arguments to update one UserSession.
     * @example
     * // Update one UserSession
     * const userSession = await prisma.userSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSessionUpdateArgs>(args: SelectSubset<T, UserSessionUpdateArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSessions.
     * @param {UserSessionDeleteManyArgs} args - Arguments to filter UserSessions to delete.
     * @example
     * // Delete a few UserSessions
     * const { count } = await prisma.userSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSessionDeleteManyArgs>(args?: SelectSubset<T, UserSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSessionUpdateManyArgs>(args: SelectSubset<T, UserSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSessions and returns the data updated in the database.
     * @param {UserSessionUpdateManyAndReturnArgs} args - Arguments to update many UserSessions.
     * @example
     * // Update many UserSessions
     * const userSession = await prisma.userSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSessions and only return the `id`
     * const userSessionWithIdOnly = await prisma.userSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSession.
     * @param {UserSessionUpsertArgs} args - Arguments to update or create a UserSession.
     * @example
     * // Update or create a UserSession
     * const userSession = await prisma.userSession.upsert({
     *   create: {
     *     // ... data to create a UserSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSession we want to update
     *   }
     * })
     */
    upsert<T extends UserSessionUpsertArgs>(args: SelectSubset<T, UserSessionUpsertArgs<ExtArgs>>): Prisma__UserSessionClient<$Result.GetResult<Prisma.$UserSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionCountArgs} args - Arguments to filter UserSessions to count.
     * @example
     * // Count the number of UserSessions
     * const count = await prisma.userSession.count({
     *   where: {
     *     // ... the filter for the UserSessions we want to count
     *   }
     * })
    **/
    count<T extends UserSessionCountArgs>(
      args?: Subset<T, UserSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSessionAggregateArgs>(args: Subset<T, UserSessionAggregateArgs>): Prisma.PrismaPromise<GetUserSessionAggregateType<T>>

    /**
     * Group by UserSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSessionGroupByArgs['orderBy'] }
        : { orderBy?: UserSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSession model
   */
  readonly fields: UserSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSession model
   */
  interface UserSessionFieldRefs {
    readonly id: FieldRef<"UserSession", 'String'>
    readonly userId: FieldRef<"UserSession", 'String'>
    readonly tokenHash: FieldRef<"UserSession", 'String'>
    readonly deviceInfo: FieldRef<"UserSession", 'Json'>
    readonly ipAddress: FieldRef<"UserSession", 'String'>
    readonly userAgent: FieldRef<"UserSession", 'String'>
    readonly expiresAt: FieldRef<"UserSession", 'DateTime'>
    readonly revokedAt: FieldRef<"UserSession", 'DateTime'>
    readonly createdAt: FieldRef<"UserSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSession findUnique
   */
  export type UserSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findUniqueOrThrow
   */
  export type UserSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession findFirst
   */
  export type UserSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findFirstOrThrow
   */
  export type UserSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSession to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSessions.
     */
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession findMany
   */
  export type UserSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter, which UserSessions to fetch.
     */
    where?: UserSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSessions to fetch.
     */
    orderBy?: UserSessionOrderByWithRelationInput | UserSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSessions.
     */
    cursor?: UserSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSessions.
     */
    skip?: number
    distinct?: UserSessionScalarFieldEnum | UserSessionScalarFieldEnum[]
  }

  /**
   * UserSession create
   */
  export type UserSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSession.
     */
    data: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
  }

  /**
   * UserSession createMany
   */
  export type UserSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSession createManyAndReturn
   */
  export type UserSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UserSessions.
     */
    data: UserSessionCreateManyInput | UserSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession update
   */
  export type UserSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSession.
     */
    data: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
    /**
     * Choose, which UserSession to update.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession updateMany
   */
  export type UserSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
  }

  /**
   * UserSession updateManyAndReturn
   */
  export type UserSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * The data used to update UserSessions.
     */
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyInput>
    /**
     * Filter which UserSessions to update
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSession upsert
   */
  export type UserSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSession to update in case it exists.
     */
    where: UserSessionWhereUniqueInput
    /**
     * In case the UserSession found by the `where` argument doesn't exist, create a new UserSession with this data.
     */
    create: XOR<UserSessionCreateInput, UserSessionUncheckedCreateInput>
    /**
     * In case the UserSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSessionUpdateInput, UserSessionUncheckedUpdateInput>
  }

  /**
   * UserSession delete
   */
  export type UserSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
    /**
     * Filter which UserSession to delete.
     */
    where: UserSessionWhereUniqueInput
  }

  /**
   * UserSession deleteMany
   */
  export type UserSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSessions to delete
     */
    where?: UserSessionWhereInput
    /**
     * Limit how many UserSessions to delete.
     */
    limit?: number
  }

  /**
   * UserSession without action
   */
  export type UserSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSession
     */
    select?: UserSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSession
     */
    omit?: UserSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSessionInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    ipAddress: string | null
    userAgent: string | null
    success: boolean | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    ipAddress: string | null
    userAgent: string | null
    success: boolean | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    details: number
    ipAddress: number
    userAgent: number
    success: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    ipAddress?: true
    userAgent?: true
    success?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    ipAddress?: true
    userAgent?: true
    success?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ipAddress?: true
    userAgent?: true
    success?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string
    action: string
    details: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    success: boolean
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    success?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    success?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    success?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    success?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "details" | "ipAddress" | "userAgent" | "success" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: string
      details: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      success: boolean
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly success: FieldRef<"AuditLog", 'Boolean'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalStatistic
   */

  export type AggregateProfessionalStatistic = {
    _count: ProfessionalStatisticCountAggregateOutputType | null
    _avg: ProfessionalStatisticAvgAggregateOutputType | null
    _sum: ProfessionalStatisticSumAggregateOutputType | null
    _min: ProfessionalStatisticMinAggregateOutputType | null
    _max: ProfessionalStatisticMaxAggregateOutputType | null
  }

  export type ProfessionalStatisticAvgAggregateOutputType = {
    totalCases: number | null
    completedCases: number | null
    averageRating: number | null
    averageResponseTime: number | null
    patientSatisfaction: number | null
    peerRating: number | null
    qualityScore: number | null
  }

  export type ProfessionalStatisticSumAggregateOutputType = {
    totalCases: number | null
    completedCases: number | null
    averageRating: number | null
    averageResponseTime: number | null
    patientSatisfaction: number | null
    peerRating: number | null
    qualityScore: number | null
  }

  export type ProfessionalStatisticMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    totalCases: number | null
    completedCases: number | null
    averageRating: number | null
    averageResponseTime: number | null
    patientSatisfaction: number | null
    peerRating: number | null
    qualityScore: number | null
    periodStart: Date | null
    periodEnd: Date | null
    createdAt: Date | null
  }

  export type ProfessionalStatisticMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    totalCases: number | null
    completedCases: number | null
    averageRating: number | null
    averageResponseTime: number | null
    patientSatisfaction: number | null
    peerRating: number | null
    qualityScore: number | null
    periodStart: Date | null
    periodEnd: Date | null
    createdAt: Date | null
  }

  export type ProfessionalStatisticCountAggregateOutputType = {
    id: number
    professionalId: number
    totalCases: number
    completedCases: number
    averageRating: number
    averageResponseTime: number
    patientSatisfaction: number
    peerRating: number
    qualityScore: number
    periodStart: number
    periodEnd: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type ProfessionalStatisticAvgAggregateInputType = {
    totalCases?: true
    completedCases?: true
    averageRating?: true
    averageResponseTime?: true
    patientSatisfaction?: true
    peerRating?: true
    qualityScore?: true
  }

  export type ProfessionalStatisticSumAggregateInputType = {
    totalCases?: true
    completedCases?: true
    averageRating?: true
    averageResponseTime?: true
    patientSatisfaction?: true
    peerRating?: true
    qualityScore?: true
  }

  export type ProfessionalStatisticMinAggregateInputType = {
    id?: true
    professionalId?: true
    totalCases?: true
    completedCases?: true
    averageRating?: true
    averageResponseTime?: true
    patientSatisfaction?: true
    peerRating?: true
    qualityScore?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
  }

  export type ProfessionalStatisticMaxAggregateInputType = {
    id?: true
    professionalId?: true
    totalCases?: true
    completedCases?: true
    averageRating?: true
    averageResponseTime?: true
    patientSatisfaction?: true
    peerRating?: true
    qualityScore?: true
    periodStart?: true
    periodEnd?: true
    createdAt?: true
  }

  export type ProfessionalStatisticCountAggregateInputType = {
    id?: true
    professionalId?: true
    totalCases?: true
    completedCases?: true
    averageRating?: true
    averageResponseTime?: true
    patientSatisfaction?: true
    peerRating?: true
    qualityScore?: true
    periodStart?: true
    periodEnd?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type ProfessionalStatisticAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalStatistic to aggregate.
     */
    where?: ProfessionalStatisticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalStatistics to fetch.
     */
    orderBy?: ProfessionalStatisticOrderByWithRelationInput | ProfessionalStatisticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalStatisticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalStatistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalStatistics
    **/
    _count?: true | ProfessionalStatisticCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessionalStatisticAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessionalStatisticSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalStatisticMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalStatisticMaxAggregateInputType
  }

  export type GetProfessionalStatisticAggregateType<T extends ProfessionalStatisticAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalStatistic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalStatistic[P]>
      : GetScalarType<T[P], AggregateProfessionalStatistic[P]>
  }




  export type ProfessionalStatisticGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalStatisticWhereInput
    orderBy?: ProfessionalStatisticOrderByWithAggregationInput | ProfessionalStatisticOrderByWithAggregationInput[]
    by: ProfessionalStatisticScalarFieldEnum[] | ProfessionalStatisticScalarFieldEnum
    having?: ProfessionalStatisticScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalStatisticCountAggregateInputType | true
    _avg?: ProfessionalStatisticAvgAggregateInputType
    _sum?: ProfessionalStatisticSumAggregateInputType
    _min?: ProfessionalStatisticMinAggregateInputType
    _max?: ProfessionalStatisticMaxAggregateInputType
  }

  export type ProfessionalStatisticGroupByOutputType = {
    id: string
    professionalId: string
    totalCases: number
    completedCases: number
    averageRating: number | null
    averageResponseTime: number | null
    patientSatisfaction: number | null
    peerRating: number | null
    qualityScore: number | null
    periodStart: Date
    periodEnd: Date
    metadata: JsonValue | null
    createdAt: Date
    _count: ProfessionalStatisticCountAggregateOutputType | null
    _avg: ProfessionalStatisticAvgAggregateOutputType | null
    _sum: ProfessionalStatisticSumAggregateOutputType | null
    _min: ProfessionalStatisticMinAggregateOutputType | null
    _max: ProfessionalStatisticMaxAggregateOutputType | null
  }

  type GetProfessionalStatisticGroupByPayload<T extends ProfessionalStatisticGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalStatisticGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalStatisticGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalStatisticGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalStatisticGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalStatisticSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    totalCases?: boolean
    completedCases?: boolean
    averageRating?: boolean
    averageResponseTime?: boolean
    patientSatisfaction?: boolean
    peerRating?: boolean
    qualityScore?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["professionalStatistic"]>

  export type ProfessionalStatisticSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    totalCases?: boolean
    completedCases?: boolean
    averageRating?: boolean
    averageResponseTime?: boolean
    patientSatisfaction?: boolean
    peerRating?: boolean
    qualityScore?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["professionalStatistic"]>

  export type ProfessionalStatisticSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    totalCases?: boolean
    completedCases?: boolean
    averageRating?: boolean
    averageResponseTime?: boolean
    patientSatisfaction?: boolean
    peerRating?: boolean
    qualityScore?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["professionalStatistic"]>

  export type ProfessionalStatisticSelectScalar = {
    id?: boolean
    professionalId?: boolean
    totalCases?: boolean
    completedCases?: boolean
    averageRating?: boolean
    averageResponseTime?: boolean
    patientSatisfaction?: boolean
    peerRating?: boolean
    qualityScore?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type ProfessionalStatisticOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "totalCases" | "completedCases" | "averageRating" | "averageResponseTime" | "patientSatisfaction" | "peerRating" | "qualityScore" | "periodStart" | "periodEnd" | "metadata" | "createdAt", ExtArgs["result"]["professionalStatistic"]>

  export type $ProfessionalStatisticPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalStatistic"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      totalCases: number
      completedCases: number
      averageRating: number | null
      averageResponseTime: number | null
      patientSatisfaction: number | null
      peerRating: number | null
      qualityScore: number | null
      periodStart: Date
      periodEnd: Date
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["professionalStatistic"]>
    composites: {}
  }

  type ProfessionalStatisticGetPayload<S extends boolean | null | undefined | ProfessionalStatisticDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalStatisticPayload, S>

  type ProfessionalStatisticCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalStatisticFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalStatisticCountAggregateInputType | true
    }

  export interface ProfessionalStatisticDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalStatistic'], meta: { name: 'ProfessionalStatistic' } }
    /**
     * Find zero or one ProfessionalStatistic that matches the filter.
     * @param {ProfessionalStatisticFindUniqueArgs} args - Arguments to find a ProfessionalStatistic
     * @example
     * // Get one ProfessionalStatistic
     * const professionalStatistic = await prisma.professionalStatistic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalStatisticFindUniqueArgs>(args: SelectSubset<T, ProfessionalStatisticFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalStatistic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalStatisticFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalStatistic
     * @example
     * // Get one ProfessionalStatistic
     * const professionalStatistic = await prisma.professionalStatistic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalStatisticFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalStatisticFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalStatistic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalStatisticFindFirstArgs} args - Arguments to find a ProfessionalStatistic
     * @example
     * // Get one ProfessionalStatistic
     * const professionalStatistic = await prisma.professionalStatistic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalStatisticFindFirstArgs>(args?: SelectSubset<T, ProfessionalStatisticFindFirstArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalStatistic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalStatisticFindFirstOrThrowArgs} args - Arguments to find a ProfessionalStatistic
     * @example
     * // Get one ProfessionalStatistic
     * const professionalStatistic = await prisma.professionalStatistic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalStatisticFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalStatisticFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalStatistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalStatisticFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalStatistics
     * const professionalStatistics = await prisma.professionalStatistic.findMany()
     * 
     * // Get first 10 ProfessionalStatistics
     * const professionalStatistics = await prisma.professionalStatistic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalStatisticWithIdOnly = await prisma.professionalStatistic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalStatisticFindManyArgs>(args?: SelectSubset<T, ProfessionalStatisticFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalStatistic.
     * @param {ProfessionalStatisticCreateArgs} args - Arguments to create a ProfessionalStatistic.
     * @example
     * // Create one ProfessionalStatistic
     * const ProfessionalStatistic = await prisma.professionalStatistic.create({
     *   data: {
     *     // ... data to create a ProfessionalStatistic
     *   }
     * })
     * 
     */
    create<T extends ProfessionalStatisticCreateArgs>(args: SelectSubset<T, ProfessionalStatisticCreateArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalStatistics.
     * @param {ProfessionalStatisticCreateManyArgs} args - Arguments to create many ProfessionalStatistics.
     * @example
     * // Create many ProfessionalStatistics
     * const professionalStatistic = await prisma.professionalStatistic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalStatisticCreateManyArgs>(args?: SelectSubset<T, ProfessionalStatisticCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalStatistics and returns the data saved in the database.
     * @param {ProfessionalStatisticCreateManyAndReturnArgs} args - Arguments to create many ProfessionalStatistics.
     * @example
     * // Create many ProfessionalStatistics
     * const professionalStatistic = await prisma.professionalStatistic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalStatistics and only return the `id`
     * const professionalStatisticWithIdOnly = await prisma.professionalStatistic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalStatisticCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalStatisticCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalStatistic.
     * @param {ProfessionalStatisticDeleteArgs} args - Arguments to delete one ProfessionalStatistic.
     * @example
     * // Delete one ProfessionalStatistic
     * const ProfessionalStatistic = await prisma.professionalStatistic.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalStatistic
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalStatisticDeleteArgs>(args: SelectSubset<T, ProfessionalStatisticDeleteArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalStatistic.
     * @param {ProfessionalStatisticUpdateArgs} args - Arguments to update one ProfessionalStatistic.
     * @example
     * // Update one ProfessionalStatistic
     * const professionalStatistic = await prisma.professionalStatistic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalStatisticUpdateArgs>(args: SelectSubset<T, ProfessionalStatisticUpdateArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalStatistics.
     * @param {ProfessionalStatisticDeleteManyArgs} args - Arguments to filter ProfessionalStatistics to delete.
     * @example
     * // Delete a few ProfessionalStatistics
     * const { count } = await prisma.professionalStatistic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalStatisticDeleteManyArgs>(args?: SelectSubset<T, ProfessionalStatisticDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalStatistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalStatisticUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalStatistics
     * const professionalStatistic = await prisma.professionalStatistic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalStatisticUpdateManyArgs>(args: SelectSubset<T, ProfessionalStatisticUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalStatistics and returns the data updated in the database.
     * @param {ProfessionalStatisticUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalStatistics.
     * @example
     * // Update many ProfessionalStatistics
     * const professionalStatistic = await prisma.professionalStatistic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalStatistics and only return the `id`
     * const professionalStatisticWithIdOnly = await prisma.professionalStatistic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfessionalStatisticUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalStatisticUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalStatistic.
     * @param {ProfessionalStatisticUpsertArgs} args - Arguments to update or create a ProfessionalStatistic.
     * @example
     * // Update or create a ProfessionalStatistic
     * const professionalStatistic = await prisma.professionalStatistic.upsert({
     *   create: {
     *     // ... data to create a ProfessionalStatistic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalStatistic we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalStatisticUpsertArgs>(args: SelectSubset<T, ProfessionalStatisticUpsertArgs<ExtArgs>>): Prisma__ProfessionalStatisticClient<$Result.GetResult<Prisma.$ProfessionalStatisticPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalStatistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalStatisticCountArgs} args - Arguments to filter ProfessionalStatistics to count.
     * @example
     * // Count the number of ProfessionalStatistics
     * const count = await prisma.professionalStatistic.count({
     *   where: {
     *     // ... the filter for the ProfessionalStatistics we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalStatisticCountArgs>(
      args?: Subset<T, ProfessionalStatisticCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalStatisticCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalStatistic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalStatisticAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalStatisticAggregateArgs>(args: Subset<T, ProfessionalStatisticAggregateArgs>): Prisma.PrismaPromise<GetProfessionalStatisticAggregateType<T>>

    /**
     * Group by ProfessionalStatistic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalStatisticGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalStatisticGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalStatisticGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalStatisticGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalStatisticGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalStatisticGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalStatistic model
   */
  readonly fields: ProfessionalStatisticFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalStatistic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalStatisticClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalStatistic model
   */
  interface ProfessionalStatisticFieldRefs {
    readonly id: FieldRef<"ProfessionalStatistic", 'String'>
    readonly professionalId: FieldRef<"ProfessionalStatistic", 'String'>
    readonly totalCases: FieldRef<"ProfessionalStatistic", 'Int'>
    readonly completedCases: FieldRef<"ProfessionalStatistic", 'Int'>
    readonly averageRating: FieldRef<"ProfessionalStatistic", 'Float'>
    readonly averageResponseTime: FieldRef<"ProfessionalStatistic", 'Float'>
    readonly patientSatisfaction: FieldRef<"ProfessionalStatistic", 'Float'>
    readonly peerRating: FieldRef<"ProfessionalStatistic", 'Float'>
    readonly qualityScore: FieldRef<"ProfessionalStatistic", 'Float'>
    readonly periodStart: FieldRef<"ProfessionalStatistic", 'DateTime'>
    readonly periodEnd: FieldRef<"ProfessionalStatistic", 'DateTime'>
    readonly metadata: FieldRef<"ProfessionalStatistic", 'Json'>
    readonly createdAt: FieldRef<"ProfessionalStatistic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalStatistic findUnique
   */
  export type ProfessionalStatisticFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * Filter, which ProfessionalStatistic to fetch.
     */
    where: ProfessionalStatisticWhereUniqueInput
  }

  /**
   * ProfessionalStatistic findUniqueOrThrow
   */
  export type ProfessionalStatisticFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * Filter, which ProfessionalStatistic to fetch.
     */
    where: ProfessionalStatisticWhereUniqueInput
  }

  /**
   * ProfessionalStatistic findFirst
   */
  export type ProfessionalStatisticFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * Filter, which ProfessionalStatistic to fetch.
     */
    where?: ProfessionalStatisticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalStatistics to fetch.
     */
    orderBy?: ProfessionalStatisticOrderByWithRelationInput | ProfessionalStatisticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalStatistics.
     */
    cursor?: ProfessionalStatisticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalStatistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalStatistics.
     */
    distinct?: ProfessionalStatisticScalarFieldEnum | ProfessionalStatisticScalarFieldEnum[]
  }

  /**
   * ProfessionalStatistic findFirstOrThrow
   */
  export type ProfessionalStatisticFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * Filter, which ProfessionalStatistic to fetch.
     */
    where?: ProfessionalStatisticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalStatistics to fetch.
     */
    orderBy?: ProfessionalStatisticOrderByWithRelationInput | ProfessionalStatisticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalStatistics.
     */
    cursor?: ProfessionalStatisticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalStatistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalStatistics.
     */
    distinct?: ProfessionalStatisticScalarFieldEnum | ProfessionalStatisticScalarFieldEnum[]
  }

  /**
   * ProfessionalStatistic findMany
   */
  export type ProfessionalStatisticFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * Filter, which ProfessionalStatistics to fetch.
     */
    where?: ProfessionalStatisticWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalStatistics to fetch.
     */
    orderBy?: ProfessionalStatisticOrderByWithRelationInput | ProfessionalStatisticOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalStatistics.
     */
    cursor?: ProfessionalStatisticWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalStatistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalStatistics.
     */
    skip?: number
    distinct?: ProfessionalStatisticScalarFieldEnum | ProfessionalStatisticScalarFieldEnum[]
  }

  /**
   * ProfessionalStatistic create
   */
  export type ProfessionalStatisticCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalStatistic.
     */
    data: XOR<ProfessionalStatisticCreateInput, ProfessionalStatisticUncheckedCreateInput>
  }

  /**
   * ProfessionalStatistic createMany
   */
  export type ProfessionalStatisticCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalStatistics.
     */
    data: ProfessionalStatisticCreateManyInput | ProfessionalStatisticCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalStatistic createManyAndReturn
   */
  export type ProfessionalStatisticCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalStatistics.
     */
    data: ProfessionalStatisticCreateManyInput | ProfessionalStatisticCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalStatistic update
   */
  export type ProfessionalStatisticUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalStatistic.
     */
    data: XOR<ProfessionalStatisticUpdateInput, ProfessionalStatisticUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalStatistic to update.
     */
    where: ProfessionalStatisticWhereUniqueInput
  }

  /**
   * ProfessionalStatistic updateMany
   */
  export type ProfessionalStatisticUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalStatistics.
     */
    data: XOR<ProfessionalStatisticUpdateManyMutationInput, ProfessionalStatisticUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalStatistics to update
     */
    where?: ProfessionalStatisticWhereInput
    /**
     * Limit how many ProfessionalStatistics to update.
     */
    limit?: number
  }

  /**
   * ProfessionalStatistic updateManyAndReturn
   */
  export type ProfessionalStatisticUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalStatistics.
     */
    data: XOR<ProfessionalStatisticUpdateManyMutationInput, ProfessionalStatisticUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalStatistics to update
     */
    where?: ProfessionalStatisticWhereInput
    /**
     * Limit how many ProfessionalStatistics to update.
     */
    limit?: number
  }

  /**
   * ProfessionalStatistic upsert
   */
  export type ProfessionalStatisticUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalStatistic to update in case it exists.
     */
    where: ProfessionalStatisticWhereUniqueInput
    /**
     * In case the ProfessionalStatistic found by the `where` argument doesn't exist, create a new ProfessionalStatistic with this data.
     */
    create: XOR<ProfessionalStatisticCreateInput, ProfessionalStatisticUncheckedCreateInput>
    /**
     * In case the ProfessionalStatistic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalStatisticUpdateInput, ProfessionalStatisticUncheckedUpdateInput>
  }

  /**
   * ProfessionalStatistic delete
   */
  export type ProfessionalStatisticDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
    /**
     * Filter which ProfessionalStatistic to delete.
     */
    where: ProfessionalStatisticWhereUniqueInput
  }

  /**
   * ProfessionalStatistic deleteMany
   */
  export type ProfessionalStatisticDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalStatistics to delete
     */
    where?: ProfessionalStatisticWhereInput
    /**
     * Limit how many ProfessionalStatistics to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalStatistic without action
   */
  export type ProfessionalStatisticDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalStatistic
     */
    select?: ProfessionalStatisticSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalStatistic
     */
    omit?: ProfessionalStatisticOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfessionalScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    alternateEmail: 'alternateEmail',
    title: 'title',
    level: 'level',
    yearsOfExperience: 'yearsOfExperience',
    verificationStatus: 'verificationStatus',
    verifiedAt: 'verifiedAt',
    verifiedBy: 'verifiedBy',
    suspendedAt: 'suspendedAt',
    suspendedUntil: 'suspendedUntil',
    suspensionReason: 'suspensionReason',
    biography: 'biography',
    expertise: 'expertise',
    researchInterests: 'researchInterests',
    publications: 'publications',
    awards: 'awards',
    availabilityStatus: 'availabilityStatus',
    maxCaseLoad: 'maxCaseLoad',
    currentCaseCount: 'currentCaseCount',
    preferredCommunication: 'preferredCommunication',
    timeZone: 'timeZone',
    workingHours: 'workingHours',
    profilePictureUrl: 'profilePictureUrl',
    profileVisibility: 'profileVisibility',
    acceptsNewCases: 'acceptsNewCases',
    requiresPreApproval: 'requiresPreApproval',
    userId: 'userId',
    metadata: 'metadata',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalScalarFieldEnum = (typeof ProfessionalScalarFieldEnum)[keyof typeof ProfessionalScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    hashedPassword: 'hashedPassword',
    emailVerified: 'emailVerified',
    emailVerifiedAt: 'emailVerifiedAt',
    twoFactorEnabled: 'twoFactorEnabled',
    twoFactorSecret: 'twoFactorSecret',
    twoFactorMethod: 'twoFactorMethod',
    lastLoginAt: 'lastLoginAt',
    lastLoginIP: 'lastLoginIP',
    failedLoginAttempts: 'failedLoginAttempts',
    lockedUntil: 'lockedUntil',
    passwordChangedAt: 'passwordChangedAt',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfessionalLicenseScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    licenseNumber: 'licenseNumber',
    licenseType: 'licenseType',
    issuingAuthority: 'issuingAuthority',
    issuingState: 'issuingState',
    issuingCountry: 'issuingCountry',
    issuedDate: 'issuedDate',
    expirationDate: 'expirationDate',
    isActive: 'isActive',
    verificationStatus: 'verificationStatus',
    verifiedAt: 'verifiedAt',
    verificationNotes: 'verificationNotes',
    documentUrl: 'documentUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalLicenseScalarFieldEnum = (typeof ProfessionalLicenseScalarFieldEnum)[keyof typeof ProfessionalLicenseScalarFieldEnum]


  export const ProfessionalSpecializationScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    specialty: 'specialty',
    subspecialty: 'subspecialty',
    level: 'level',
    boardName: 'boardName',
    certificationDate: 'certificationDate',
    expirationDate: 'expirationDate',
    certificationNumber: 'certificationNumber',
    verificationStatus: 'verificationStatus',
    verifiedAt: 'verifiedAt',
    documentUrl: 'documentUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalSpecializationScalarFieldEnum = (typeof ProfessionalSpecializationScalarFieldEnum)[keyof typeof ProfessionalSpecializationScalarFieldEnum]


  export const ProfessionalAffiliationScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    institutionName: 'institutionName',
    institutionType: 'institutionType',
    department: 'department',
    position: 'position',
    startDate: 'startDate',
    endDate: 'endDate',
    isCurrent: 'isCurrent',
    isPrimary: 'isPrimary',
    address: 'address',
    phone: 'phone',
    website: 'website',
    verificationStatus: 'verificationStatus',
    verifiedAt: 'verifiedAt',
    verificationContact: 'verificationContact',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalAffiliationScalarFieldEnum = (typeof ProfessionalAffiliationScalarFieldEnum)[keyof typeof ProfessionalAffiliationScalarFieldEnum]


  export const ProfessionalCredentialScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    credentialType: 'credentialType',
    credentialName: 'credentialName',
    issuingOrganization: 'issuingOrganization',
    issuedDate: 'issuedDate',
    expirationDate: 'expirationDate',
    credentialNumber: 'credentialNumber',
    verificationStatus: 'verificationStatus',
    verifiedAt: 'verifiedAt',
    documentUrl: 'documentUrl',
    description: 'description',
    continuingEducationHours: 'continuingEducationHours',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalCredentialScalarFieldEnum = (typeof ProfessionalCredentialScalarFieldEnum)[keyof typeof ProfessionalCredentialScalarFieldEnum]


  export const ProfessionalAvailabilityScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    dayOfWeek: 'dayOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    timeZone: 'timeZone',
    availabilityType: 'availabilityType',
    maxCases: 'maxCases',
    isRecurring: 'isRecurring',
    effectiveFrom: 'effectiveFrom',
    effectiveUntil: 'effectiveUntil',
    isActive: 'isActive',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalAvailabilityScalarFieldEnum = (typeof ProfessionalAvailabilityScalarFieldEnum)[keyof typeof ProfessionalAvailabilityScalarFieldEnum]


  export const ProfessionalReviewScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    reviewerId: 'reviewerId',
    reviewerType: 'reviewerType',
    caseId: 'caseId',
    rating: 'rating',
    title: 'title',
    review: 'review',
    expertise: 'expertise',
    communication: 'communication',
    timeliness: 'timeliness',
    professionalism: 'professionalism',
    isPublic: 'isPublic',
    isVerified: 'isVerified',
    moderationStatus: 'moderationStatus',
    moderatedBy: 'moderatedBy',
    moderatedAt: 'moderatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalReviewScalarFieldEnum = (typeof ProfessionalReviewScalarFieldEnum)[keyof typeof ProfessionalReviewScalarFieldEnum]


  export const UserSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    deviceInfo: 'deviceInfo',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type UserSessionScalarFieldEnum = (typeof UserSessionScalarFieldEnum)[keyof typeof UserSessionScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    success: 'success',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const ProfessionalStatisticScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    totalCases: 'totalCases',
    completedCases: 'completedCases',
    averageRating: 'averageRating',
    averageResponseTime: 'averageResponseTime',
    patientSatisfaction: 'patientSatisfaction',
    peerRating: 'peerRating',
    qualityScore: 'qualityScore',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type ProfessionalStatisticScalarFieldEnum = (typeof ProfessionalStatisticScalarFieldEnum)[keyof typeof ProfessionalStatisticScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ProfessionalLevel'
   */
  export type EnumProfessionalLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProfessionalLevel'>
    


  /**
   * Reference to a field of type 'ProfessionalLevel[]'
   */
  export type ListEnumProfessionalLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProfessionalLevel[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'VerificationStatus'
   */
  export type EnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus'>
    


  /**
   * Reference to a field of type 'VerificationStatus[]'
   */
  export type ListEnumVerificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AvailabilityStatus'
   */
  export type EnumAvailabilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AvailabilityStatus'>
    


  /**
   * Reference to a field of type 'AvailabilityStatus[]'
   */
  export type ListEnumAvailabilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AvailabilityStatus[]'>
    


  /**
   * Reference to a field of type 'CommunicationChannel'
   */
  export type EnumCommunicationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunicationChannel'>
    


  /**
   * Reference to a field of type 'CommunicationChannel[]'
   */
  export type ListEnumCommunicationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunicationChannel[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'SpecializationLevel'
   */
  export type EnumSpecializationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpecializationLevel'>
    


  /**
   * Reference to a field of type 'SpecializationLevel[]'
   */
  export type ListEnumSpecializationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpecializationLevel[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfessionalWhereInput = {
    AND?: ProfessionalWhereInput | ProfessionalWhereInput[]
    OR?: ProfessionalWhereInput[]
    NOT?: ProfessionalWhereInput | ProfessionalWhereInput[]
    id?: StringFilter<"Professional"> | string
    firstName?: StringFilter<"Professional"> | string
    middleName?: StringNullableFilter<"Professional"> | string | null
    lastName?: StringFilter<"Professional"> | string
    email?: StringFilter<"Professional"> | string
    phone?: StringNullableFilter<"Professional"> | string | null
    alternateEmail?: StringNullableFilter<"Professional"> | string | null
    title?: StringNullableFilter<"Professional"> | string | null
    level?: EnumProfessionalLevelFilter<"Professional"> | $Enums.ProfessionalLevel
    yearsOfExperience?: IntNullableFilter<"Professional"> | number | null
    verificationStatus?: EnumVerificationStatusFilter<"Professional"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"Professional"> | Date | string | null
    verifiedBy?: StringNullableFilter<"Professional"> | string | null
    suspendedAt?: DateTimeNullableFilter<"Professional"> | Date | string | null
    suspendedUntil?: DateTimeNullableFilter<"Professional"> | Date | string | null
    suspensionReason?: StringNullableFilter<"Professional"> | string | null
    biography?: StringNullableFilter<"Professional"> | string | null
    expertise?: StringNullableListFilter<"Professional">
    researchInterests?: StringNullableListFilter<"Professional">
    publications?: JsonNullableFilter<"Professional">
    awards?: JsonNullableFilter<"Professional">
    availabilityStatus?: EnumAvailabilityStatusFilter<"Professional"> | $Enums.AvailabilityStatus
    maxCaseLoad?: IntNullableFilter<"Professional"> | number | null
    currentCaseCount?: IntFilter<"Professional"> | number
    preferredCommunication?: EnumCommunicationChannelFilter<"Professional"> | $Enums.CommunicationChannel
    timeZone?: StringNullableFilter<"Professional"> | string | null
    workingHours?: JsonNullableFilter<"Professional">
    profilePictureUrl?: StringNullableFilter<"Professional"> | string | null
    profileVisibility?: StringFilter<"Professional"> | string
    acceptsNewCases?: BoolFilter<"Professional"> | boolean
    requiresPreApproval?: BoolFilter<"Professional"> | boolean
    userId?: StringNullableFilter<"Professional"> | string | null
    metadata?: JsonNullableFilter<"Professional">
    tags?: StringNullableListFilter<"Professional">
    createdAt?: DateTimeFilter<"Professional"> | Date | string
    updatedAt?: DateTimeFilter<"Professional"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    licenses?: ProfessionalLicenseListRelationFilter
    specializations?: ProfessionalSpecializationListRelationFilter
    affiliations?: ProfessionalAffiliationListRelationFilter
    credentials?: ProfessionalCredentialListRelationFilter
    availability?: ProfessionalAvailabilityListRelationFilter
    reviews?: ProfessionalReviewListRelationFilter
  }

  export type ProfessionalOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    alternateEmail?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    level?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    suspendedUntil?: SortOrderInput | SortOrder
    suspensionReason?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    expertise?: SortOrder
    researchInterests?: SortOrder
    publications?: SortOrderInput | SortOrder
    awards?: SortOrderInput | SortOrder
    availabilityStatus?: SortOrder
    maxCaseLoad?: SortOrderInput | SortOrder
    currentCaseCount?: SortOrder
    preferredCommunication?: SortOrder
    timeZone?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    profileVisibility?: SortOrder
    acceptsNewCases?: SortOrder
    requiresPreApproval?: SortOrder
    userId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    licenses?: ProfessionalLicenseOrderByRelationAggregateInput
    specializations?: ProfessionalSpecializationOrderByRelationAggregateInput
    affiliations?: ProfessionalAffiliationOrderByRelationAggregateInput
    credentials?: ProfessionalCredentialOrderByRelationAggregateInput
    availability?: ProfessionalAvailabilityOrderByRelationAggregateInput
    reviews?: ProfessionalReviewOrderByRelationAggregateInput
  }

  export type ProfessionalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    userId?: string
    AND?: ProfessionalWhereInput | ProfessionalWhereInput[]
    OR?: ProfessionalWhereInput[]
    NOT?: ProfessionalWhereInput | ProfessionalWhereInput[]
    firstName?: StringFilter<"Professional"> | string
    middleName?: StringNullableFilter<"Professional"> | string | null
    lastName?: StringFilter<"Professional"> | string
    phone?: StringNullableFilter<"Professional"> | string | null
    alternateEmail?: StringNullableFilter<"Professional"> | string | null
    title?: StringNullableFilter<"Professional"> | string | null
    level?: EnumProfessionalLevelFilter<"Professional"> | $Enums.ProfessionalLevel
    yearsOfExperience?: IntNullableFilter<"Professional"> | number | null
    verificationStatus?: EnumVerificationStatusFilter<"Professional"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"Professional"> | Date | string | null
    verifiedBy?: StringNullableFilter<"Professional"> | string | null
    suspendedAt?: DateTimeNullableFilter<"Professional"> | Date | string | null
    suspendedUntil?: DateTimeNullableFilter<"Professional"> | Date | string | null
    suspensionReason?: StringNullableFilter<"Professional"> | string | null
    biography?: StringNullableFilter<"Professional"> | string | null
    expertise?: StringNullableListFilter<"Professional">
    researchInterests?: StringNullableListFilter<"Professional">
    publications?: JsonNullableFilter<"Professional">
    awards?: JsonNullableFilter<"Professional">
    availabilityStatus?: EnumAvailabilityStatusFilter<"Professional"> | $Enums.AvailabilityStatus
    maxCaseLoad?: IntNullableFilter<"Professional"> | number | null
    currentCaseCount?: IntFilter<"Professional"> | number
    preferredCommunication?: EnumCommunicationChannelFilter<"Professional"> | $Enums.CommunicationChannel
    timeZone?: StringNullableFilter<"Professional"> | string | null
    workingHours?: JsonNullableFilter<"Professional">
    profilePictureUrl?: StringNullableFilter<"Professional"> | string | null
    profileVisibility?: StringFilter<"Professional"> | string
    acceptsNewCases?: BoolFilter<"Professional"> | boolean
    requiresPreApproval?: BoolFilter<"Professional"> | boolean
    metadata?: JsonNullableFilter<"Professional">
    tags?: StringNullableListFilter<"Professional">
    createdAt?: DateTimeFilter<"Professional"> | Date | string
    updatedAt?: DateTimeFilter<"Professional"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    licenses?: ProfessionalLicenseListRelationFilter
    specializations?: ProfessionalSpecializationListRelationFilter
    affiliations?: ProfessionalAffiliationListRelationFilter
    credentials?: ProfessionalCredentialListRelationFilter
    availability?: ProfessionalAvailabilityListRelationFilter
    reviews?: ProfessionalReviewListRelationFilter
  }, "id" | "email" | "userId">

  export type ProfessionalOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    alternateEmail?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    level?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verifiedBy?: SortOrderInput | SortOrder
    suspendedAt?: SortOrderInput | SortOrder
    suspendedUntil?: SortOrderInput | SortOrder
    suspensionReason?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    expertise?: SortOrder
    researchInterests?: SortOrder
    publications?: SortOrderInput | SortOrder
    awards?: SortOrderInput | SortOrder
    availabilityStatus?: SortOrder
    maxCaseLoad?: SortOrderInput | SortOrder
    currentCaseCount?: SortOrder
    preferredCommunication?: SortOrder
    timeZone?: SortOrderInput | SortOrder
    workingHours?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    profileVisibility?: SortOrder
    acceptsNewCases?: SortOrder
    requiresPreApproval?: SortOrder
    userId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalCountOrderByAggregateInput
    _avg?: ProfessionalAvgOrderByAggregateInput
    _max?: ProfessionalMaxOrderByAggregateInput
    _min?: ProfessionalMinOrderByAggregateInput
    _sum?: ProfessionalSumOrderByAggregateInput
  }

  export type ProfessionalScalarWhereWithAggregatesInput = {
    AND?: ProfessionalScalarWhereWithAggregatesInput | ProfessionalScalarWhereWithAggregatesInput[]
    OR?: ProfessionalScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalScalarWhereWithAggregatesInput | ProfessionalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Professional"> | string
    firstName?: StringWithAggregatesFilter<"Professional"> | string
    middleName?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    lastName?: StringWithAggregatesFilter<"Professional"> | string
    email?: StringWithAggregatesFilter<"Professional"> | string
    phone?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    alternateEmail?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    title?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    level?: EnumProfessionalLevelWithAggregatesFilter<"Professional"> | $Enums.ProfessionalLevel
    yearsOfExperience?: IntNullableWithAggregatesFilter<"Professional"> | number | null
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"Professional"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Professional"> | Date | string | null
    verifiedBy?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    suspendedAt?: DateTimeNullableWithAggregatesFilter<"Professional"> | Date | string | null
    suspendedUntil?: DateTimeNullableWithAggregatesFilter<"Professional"> | Date | string | null
    suspensionReason?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    biography?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    expertise?: StringNullableListFilter<"Professional">
    researchInterests?: StringNullableListFilter<"Professional">
    publications?: JsonNullableWithAggregatesFilter<"Professional">
    awards?: JsonNullableWithAggregatesFilter<"Professional">
    availabilityStatus?: EnumAvailabilityStatusWithAggregatesFilter<"Professional"> | $Enums.AvailabilityStatus
    maxCaseLoad?: IntNullableWithAggregatesFilter<"Professional"> | number | null
    currentCaseCount?: IntWithAggregatesFilter<"Professional"> | number
    preferredCommunication?: EnumCommunicationChannelWithAggregatesFilter<"Professional"> | $Enums.CommunicationChannel
    timeZone?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    workingHours?: JsonNullableWithAggregatesFilter<"Professional">
    profilePictureUrl?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    profileVisibility?: StringWithAggregatesFilter<"Professional"> | string
    acceptsNewCases?: BoolWithAggregatesFilter<"Professional"> | boolean
    requiresPreApproval?: BoolWithAggregatesFilter<"Professional"> | boolean
    userId?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Professional">
    tags?: StringNullableListFilter<"Professional">
    createdAt?: DateTimeWithAggregatesFilter<"Professional"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Professional"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    twoFactorEnabled?: BoolFilter<"User"> | boolean
    twoFactorSecret?: StringNullableFilter<"User"> | string | null
    twoFactorMethod?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginIP?: StringNullableFilter<"User"> | string | null
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordChangedAt?: DateTimeFilter<"User"> | Date | string
    metadata?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    professional?: XOR<ProfessionalNullableScalarRelationFilter, ProfessionalWhereInput> | null
    sessions?: UserSessionListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    twoFactorMethod?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastLoginIP?: SortOrderInput | SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    passwordChangedAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
    sessions?: UserSessionOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    hashedPassword?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    twoFactorEnabled?: BoolFilter<"User"> | boolean
    twoFactorSecret?: StringNullableFilter<"User"> | string | null
    twoFactorMethod?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoginIP?: StringNullableFilter<"User"> | string | null
    failedLoginAttempts?: IntFilter<"User"> | number
    lockedUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordChangedAt?: DateTimeFilter<"User"> | Date | string
    metadata?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    professional?: XOR<ProfessionalNullableScalarRelationFilter, ProfessionalWhereInput> | null
    sessions?: UserSessionListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    twoFactorMethod?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastLoginIP?: SortOrderInput | SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    passwordChangedAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    hashedPassword?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    twoFactorEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    twoFactorSecret?: StringNullableWithAggregatesFilter<"User"> | string | null
    twoFactorMethod?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastLoginIP?: StringNullableWithAggregatesFilter<"User"> | string | null
    failedLoginAttempts?: IntWithAggregatesFilter<"User"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    passwordChangedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    metadata?: JsonNullableWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfessionalLicenseWhereInput = {
    AND?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    OR?: ProfessionalLicenseWhereInput[]
    NOT?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    id?: StringFilter<"ProfessionalLicense"> | string
    professionalId?: StringFilter<"ProfessionalLicense"> | string
    licenseNumber?: StringFilter<"ProfessionalLicense"> | string
    licenseType?: StringFilter<"ProfessionalLicense"> | string
    issuingAuthority?: StringFilter<"ProfessionalLicense"> | string
    issuingState?: StringNullableFilter<"ProfessionalLicense"> | string | null
    issuingCountry?: StringFilter<"ProfessionalLicense"> | string
    issuedDate?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    expirationDate?: DateTimeNullableFilter<"ProfessionalLicense"> | Date | string | null
    isActive?: BoolFilter<"ProfessionalLicense"> | boolean
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalLicense"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalLicense"> | Date | string | null
    verificationNotes?: StringNullableFilter<"ProfessionalLicense"> | string | null
    documentUrl?: StringNullableFilter<"ProfessionalLicense"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type ProfessionalLicenseOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    issuingAuthority?: SortOrder
    issuingState?: SortOrderInput | SortOrder
    issuingCountry?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verificationNotes?: SortOrderInput | SortOrder
    documentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
  }

  export type ProfessionalLicenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    professionalId_licenseNumber?: ProfessionalLicenseProfessionalIdLicenseNumberCompoundUniqueInput
    AND?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    OR?: ProfessionalLicenseWhereInput[]
    NOT?: ProfessionalLicenseWhereInput | ProfessionalLicenseWhereInput[]
    professionalId?: StringFilter<"ProfessionalLicense"> | string
    licenseNumber?: StringFilter<"ProfessionalLicense"> | string
    licenseType?: StringFilter<"ProfessionalLicense"> | string
    issuingAuthority?: StringFilter<"ProfessionalLicense"> | string
    issuingState?: StringNullableFilter<"ProfessionalLicense"> | string | null
    issuingCountry?: StringFilter<"ProfessionalLicense"> | string
    issuedDate?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    expirationDate?: DateTimeNullableFilter<"ProfessionalLicense"> | Date | string | null
    isActive?: BoolFilter<"ProfessionalLicense"> | boolean
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalLicense"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalLicense"> | Date | string | null
    verificationNotes?: StringNullableFilter<"ProfessionalLicense"> | string | null
    documentUrl?: StringNullableFilter<"ProfessionalLicense"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id" | "professionalId_licenseNumber">

  export type ProfessionalLicenseOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    issuingAuthority?: SortOrder
    issuingState?: SortOrderInput | SortOrder
    issuingCountry?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verificationNotes?: SortOrderInput | SortOrder
    documentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalLicenseCountOrderByAggregateInput
    _max?: ProfessionalLicenseMaxOrderByAggregateInput
    _min?: ProfessionalLicenseMinOrderByAggregateInput
  }

  export type ProfessionalLicenseScalarWhereWithAggregatesInput = {
    AND?: ProfessionalLicenseScalarWhereWithAggregatesInput | ProfessionalLicenseScalarWhereWithAggregatesInput[]
    OR?: ProfessionalLicenseScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalLicenseScalarWhereWithAggregatesInput | ProfessionalLicenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    licenseNumber?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    licenseType?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    issuingAuthority?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    issuingState?: StringNullableWithAggregatesFilter<"ProfessionalLicense"> | string | null
    issuingCountry?: StringWithAggregatesFilter<"ProfessionalLicense"> | string
    issuedDate?: DateTimeWithAggregatesFilter<"ProfessionalLicense"> | Date | string
    expirationDate?: DateTimeNullableWithAggregatesFilter<"ProfessionalLicense"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"ProfessionalLicense"> | boolean
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"ProfessionalLicense"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"ProfessionalLicense"> | Date | string | null
    verificationNotes?: StringNullableWithAggregatesFilter<"ProfessionalLicense"> | string | null
    documentUrl?: StringNullableWithAggregatesFilter<"ProfessionalLicense"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalLicense"> | Date | string
  }

  export type ProfessionalSpecializationWhereInput = {
    AND?: ProfessionalSpecializationWhereInput | ProfessionalSpecializationWhereInput[]
    OR?: ProfessionalSpecializationWhereInput[]
    NOT?: ProfessionalSpecializationWhereInput | ProfessionalSpecializationWhereInput[]
    id?: StringFilter<"ProfessionalSpecialization"> | string
    professionalId?: StringFilter<"ProfessionalSpecialization"> | string
    specialty?: StringFilter<"ProfessionalSpecialization"> | string
    subspecialty?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    level?: EnumSpecializationLevelFilter<"ProfessionalSpecialization"> | $Enums.SpecializationLevel
    boardName?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    certificationDate?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    expirationDate?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    certificationNumber?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalSpecialization"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    documentUrl?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalSpecialization"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalSpecialization"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type ProfessionalSpecializationOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    specialty?: SortOrder
    subspecialty?: SortOrderInput | SortOrder
    level?: SortOrder
    boardName?: SortOrderInput | SortOrder
    certificationDate?: SortOrderInput | SortOrder
    expirationDate?: SortOrderInput | SortOrder
    certificationNumber?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    documentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
  }

  export type ProfessionalSpecializationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalSpecializationWhereInput | ProfessionalSpecializationWhereInput[]
    OR?: ProfessionalSpecializationWhereInput[]
    NOT?: ProfessionalSpecializationWhereInput | ProfessionalSpecializationWhereInput[]
    professionalId?: StringFilter<"ProfessionalSpecialization"> | string
    specialty?: StringFilter<"ProfessionalSpecialization"> | string
    subspecialty?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    level?: EnumSpecializationLevelFilter<"ProfessionalSpecialization"> | $Enums.SpecializationLevel
    boardName?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    certificationDate?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    expirationDate?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    certificationNumber?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalSpecialization"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    documentUrl?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalSpecialization"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalSpecialization"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id">

  export type ProfessionalSpecializationOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    specialty?: SortOrder
    subspecialty?: SortOrderInput | SortOrder
    level?: SortOrder
    boardName?: SortOrderInput | SortOrder
    certificationDate?: SortOrderInput | SortOrder
    expirationDate?: SortOrderInput | SortOrder
    certificationNumber?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    documentUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalSpecializationCountOrderByAggregateInput
    _max?: ProfessionalSpecializationMaxOrderByAggregateInput
    _min?: ProfessionalSpecializationMinOrderByAggregateInput
  }

  export type ProfessionalSpecializationScalarWhereWithAggregatesInput = {
    AND?: ProfessionalSpecializationScalarWhereWithAggregatesInput | ProfessionalSpecializationScalarWhereWithAggregatesInput[]
    OR?: ProfessionalSpecializationScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalSpecializationScalarWhereWithAggregatesInput | ProfessionalSpecializationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalSpecialization"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalSpecialization"> | string
    specialty?: StringWithAggregatesFilter<"ProfessionalSpecialization"> | string
    subspecialty?: StringNullableWithAggregatesFilter<"ProfessionalSpecialization"> | string | null
    level?: EnumSpecializationLevelWithAggregatesFilter<"ProfessionalSpecialization"> | $Enums.SpecializationLevel
    boardName?: StringNullableWithAggregatesFilter<"ProfessionalSpecialization"> | string | null
    certificationDate?: DateTimeNullableWithAggregatesFilter<"ProfessionalSpecialization"> | Date | string | null
    expirationDate?: DateTimeNullableWithAggregatesFilter<"ProfessionalSpecialization"> | Date | string | null
    certificationNumber?: StringNullableWithAggregatesFilter<"ProfessionalSpecialization"> | string | null
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"ProfessionalSpecialization"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"ProfessionalSpecialization"> | Date | string | null
    documentUrl?: StringNullableWithAggregatesFilter<"ProfessionalSpecialization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalSpecialization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalSpecialization"> | Date | string
  }

  export type ProfessionalAffiliationWhereInput = {
    AND?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    OR?: ProfessionalAffiliationWhereInput[]
    NOT?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    id?: StringFilter<"ProfessionalAffiliation"> | string
    professionalId?: StringFilter<"ProfessionalAffiliation"> | string
    institutionName?: StringFilter<"ProfessionalAffiliation"> | string
    institutionType?: StringFilter<"ProfessionalAffiliation"> | string
    department?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    position?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    startDate?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    endDate?: DateTimeNullableFilter<"ProfessionalAffiliation"> | Date | string | null
    isCurrent?: BoolFilter<"ProfessionalAffiliation"> | boolean
    isPrimary?: BoolFilter<"ProfessionalAffiliation"> | boolean
    address?: JsonNullableFilter<"ProfessionalAffiliation">
    phone?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    website?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalAffiliation"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalAffiliation"> | Date | string | null
    verificationContact?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type ProfessionalAffiliationOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    institutionName?: SortOrder
    institutionType?: SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    isPrimary?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verificationContact?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
  }

  export type ProfessionalAffiliationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    OR?: ProfessionalAffiliationWhereInput[]
    NOT?: ProfessionalAffiliationWhereInput | ProfessionalAffiliationWhereInput[]
    professionalId?: StringFilter<"ProfessionalAffiliation"> | string
    institutionName?: StringFilter<"ProfessionalAffiliation"> | string
    institutionType?: StringFilter<"ProfessionalAffiliation"> | string
    department?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    position?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    startDate?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    endDate?: DateTimeNullableFilter<"ProfessionalAffiliation"> | Date | string | null
    isCurrent?: BoolFilter<"ProfessionalAffiliation"> | boolean
    isPrimary?: BoolFilter<"ProfessionalAffiliation"> | boolean
    address?: JsonNullableFilter<"ProfessionalAffiliation">
    phone?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    website?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalAffiliation"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalAffiliation"> | Date | string | null
    verificationContact?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id">

  export type ProfessionalAffiliationOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    institutionName?: SortOrder
    institutionType?: SortOrder
    department?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    isCurrent?: SortOrder
    isPrimary?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    verificationContact?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalAffiliationCountOrderByAggregateInput
    _max?: ProfessionalAffiliationMaxOrderByAggregateInput
    _min?: ProfessionalAffiliationMinOrderByAggregateInput
  }

  export type ProfessionalAffiliationScalarWhereWithAggregatesInput = {
    AND?: ProfessionalAffiliationScalarWhereWithAggregatesInput | ProfessionalAffiliationScalarWhereWithAggregatesInput[]
    OR?: ProfessionalAffiliationScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalAffiliationScalarWhereWithAggregatesInput | ProfessionalAffiliationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    institutionName?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    institutionType?: StringWithAggregatesFilter<"ProfessionalAffiliation"> | string
    department?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
    position?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"ProfessionalAffiliation"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"ProfessionalAffiliation"> | Date | string | null
    isCurrent?: BoolWithAggregatesFilter<"ProfessionalAffiliation"> | boolean
    isPrimary?: BoolWithAggregatesFilter<"ProfessionalAffiliation"> | boolean
    address?: JsonNullableWithAggregatesFilter<"ProfessionalAffiliation">
    phone?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
    website?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"ProfessionalAffiliation"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"ProfessionalAffiliation"> | Date | string | null
    verificationContact?: StringNullableWithAggregatesFilter<"ProfessionalAffiliation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalAffiliation"> | Date | string
  }

  export type ProfessionalCredentialWhereInput = {
    AND?: ProfessionalCredentialWhereInput | ProfessionalCredentialWhereInput[]
    OR?: ProfessionalCredentialWhereInput[]
    NOT?: ProfessionalCredentialWhereInput | ProfessionalCredentialWhereInput[]
    id?: StringFilter<"ProfessionalCredential"> | string
    professionalId?: StringFilter<"ProfessionalCredential"> | string
    credentialType?: StringFilter<"ProfessionalCredential"> | string
    credentialName?: StringFilter<"ProfessionalCredential"> | string
    issuingOrganization?: StringFilter<"ProfessionalCredential"> | string
    issuedDate?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    expirationDate?: DateTimeNullableFilter<"ProfessionalCredential"> | Date | string | null
    credentialNumber?: StringNullableFilter<"ProfessionalCredential"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalCredential"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalCredential"> | Date | string | null
    documentUrl?: StringNullableFilter<"ProfessionalCredential"> | string | null
    description?: StringNullableFilter<"ProfessionalCredential"> | string | null
    continuingEducationHours?: IntNullableFilter<"ProfessionalCredential"> | number | null
    createdAt?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type ProfessionalCredentialOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    credentialType?: SortOrder
    credentialName?: SortOrder
    issuingOrganization?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrderInput | SortOrder
    credentialNumber?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    documentUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    continuingEducationHours?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
  }

  export type ProfessionalCredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalCredentialWhereInput | ProfessionalCredentialWhereInput[]
    OR?: ProfessionalCredentialWhereInput[]
    NOT?: ProfessionalCredentialWhereInput | ProfessionalCredentialWhereInput[]
    professionalId?: StringFilter<"ProfessionalCredential"> | string
    credentialType?: StringFilter<"ProfessionalCredential"> | string
    credentialName?: StringFilter<"ProfessionalCredential"> | string
    issuingOrganization?: StringFilter<"ProfessionalCredential"> | string
    issuedDate?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    expirationDate?: DateTimeNullableFilter<"ProfessionalCredential"> | Date | string | null
    credentialNumber?: StringNullableFilter<"ProfessionalCredential"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalCredential"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalCredential"> | Date | string | null
    documentUrl?: StringNullableFilter<"ProfessionalCredential"> | string | null
    description?: StringNullableFilter<"ProfessionalCredential"> | string | null
    continuingEducationHours?: IntNullableFilter<"ProfessionalCredential"> | number | null
    createdAt?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id">

  export type ProfessionalCredentialOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    credentialType?: SortOrder
    credentialName?: SortOrder
    issuingOrganization?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrderInput | SortOrder
    credentialNumber?: SortOrderInput | SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    documentUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    continuingEducationHours?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalCredentialCountOrderByAggregateInput
    _avg?: ProfessionalCredentialAvgOrderByAggregateInput
    _max?: ProfessionalCredentialMaxOrderByAggregateInput
    _min?: ProfessionalCredentialMinOrderByAggregateInput
    _sum?: ProfessionalCredentialSumOrderByAggregateInput
  }

  export type ProfessionalCredentialScalarWhereWithAggregatesInput = {
    AND?: ProfessionalCredentialScalarWhereWithAggregatesInput | ProfessionalCredentialScalarWhereWithAggregatesInput[]
    OR?: ProfessionalCredentialScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalCredentialScalarWhereWithAggregatesInput | ProfessionalCredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalCredential"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalCredential"> | string
    credentialType?: StringWithAggregatesFilter<"ProfessionalCredential"> | string
    credentialName?: StringWithAggregatesFilter<"ProfessionalCredential"> | string
    issuingOrganization?: StringWithAggregatesFilter<"ProfessionalCredential"> | string
    issuedDate?: DateTimeWithAggregatesFilter<"ProfessionalCredential"> | Date | string
    expirationDate?: DateTimeNullableWithAggregatesFilter<"ProfessionalCredential"> | Date | string | null
    credentialNumber?: StringNullableWithAggregatesFilter<"ProfessionalCredential"> | string | null
    verificationStatus?: EnumVerificationStatusWithAggregatesFilter<"ProfessionalCredential"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"ProfessionalCredential"> | Date | string | null
    documentUrl?: StringNullableWithAggregatesFilter<"ProfessionalCredential"> | string | null
    description?: StringNullableWithAggregatesFilter<"ProfessionalCredential"> | string | null
    continuingEducationHours?: IntNullableWithAggregatesFilter<"ProfessionalCredential"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalCredential"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalCredential"> | Date | string
  }

  export type ProfessionalAvailabilityWhereInput = {
    AND?: ProfessionalAvailabilityWhereInput | ProfessionalAvailabilityWhereInput[]
    OR?: ProfessionalAvailabilityWhereInput[]
    NOT?: ProfessionalAvailabilityWhereInput | ProfessionalAvailabilityWhereInput[]
    id?: StringFilter<"ProfessionalAvailability"> | string
    professionalId?: StringFilter<"ProfessionalAvailability"> | string
    dayOfWeek?: IntFilter<"ProfessionalAvailability"> | number
    startTime?: StringFilter<"ProfessionalAvailability"> | string
    endTime?: StringFilter<"ProfessionalAvailability"> | string
    timeZone?: StringFilter<"ProfessionalAvailability"> | string
    availabilityType?: StringFilter<"ProfessionalAvailability"> | string
    maxCases?: IntNullableFilter<"ProfessionalAvailability"> | number | null
    isRecurring?: BoolFilter<"ProfessionalAvailability"> | boolean
    effectiveFrom?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    effectiveUntil?: DateTimeNullableFilter<"ProfessionalAvailability"> | Date | string | null
    isActive?: BoolFilter<"ProfessionalAvailability"> | boolean
    notes?: StringNullableFilter<"ProfessionalAvailability"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type ProfessionalAvailabilityOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeZone?: SortOrder
    availabilityType?: SortOrder
    maxCases?: SortOrderInput | SortOrder
    isRecurring?: SortOrder
    effectiveFrom?: SortOrder
    effectiveUntil?: SortOrderInput | SortOrder
    isActive?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
  }

  export type ProfessionalAvailabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalAvailabilityWhereInput | ProfessionalAvailabilityWhereInput[]
    OR?: ProfessionalAvailabilityWhereInput[]
    NOT?: ProfessionalAvailabilityWhereInput | ProfessionalAvailabilityWhereInput[]
    professionalId?: StringFilter<"ProfessionalAvailability"> | string
    dayOfWeek?: IntFilter<"ProfessionalAvailability"> | number
    startTime?: StringFilter<"ProfessionalAvailability"> | string
    endTime?: StringFilter<"ProfessionalAvailability"> | string
    timeZone?: StringFilter<"ProfessionalAvailability"> | string
    availabilityType?: StringFilter<"ProfessionalAvailability"> | string
    maxCases?: IntNullableFilter<"ProfessionalAvailability"> | number | null
    isRecurring?: BoolFilter<"ProfessionalAvailability"> | boolean
    effectiveFrom?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    effectiveUntil?: DateTimeNullableFilter<"ProfessionalAvailability"> | Date | string | null
    isActive?: BoolFilter<"ProfessionalAvailability"> | boolean
    notes?: StringNullableFilter<"ProfessionalAvailability"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id">

  export type ProfessionalAvailabilityOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeZone?: SortOrder
    availabilityType?: SortOrder
    maxCases?: SortOrderInput | SortOrder
    isRecurring?: SortOrder
    effectiveFrom?: SortOrder
    effectiveUntil?: SortOrderInput | SortOrder
    isActive?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalAvailabilityCountOrderByAggregateInput
    _avg?: ProfessionalAvailabilityAvgOrderByAggregateInput
    _max?: ProfessionalAvailabilityMaxOrderByAggregateInput
    _min?: ProfessionalAvailabilityMinOrderByAggregateInput
    _sum?: ProfessionalAvailabilitySumOrderByAggregateInput
  }

  export type ProfessionalAvailabilityScalarWhereWithAggregatesInput = {
    AND?: ProfessionalAvailabilityScalarWhereWithAggregatesInput | ProfessionalAvailabilityScalarWhereWithAggregatesInput[]
    OR?: ProfessionalAvailabilityScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalAvailabilityScalarWhereWithAggregatesInput | ProfessionalAvailabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalAvailability"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalAvailability"> | string
    dayOfWeek?: IntWithAggregatesFilter<"ProfessionalAvailability"> | number
    startTime?: StringWithAggregatesFilter<"ProfessionalAvailability"> | string
    endTime?: StringWithAggregatesFilter<"ProfessionalAvailability"> | string
    timeZone?: StringWithAggregatesFilter<"ProfessionalAvailability"> | string
    availabilityType?: StringWithAggregatesFilter<"ProfessionalAvailability"> | string
    maxCases?: IntNullableWithAggregatesFilter<"ProfessionalAvailability"> | number | null
    isRecurring?: BoolWithAggregatesFilter<"ProfessionalAvailability"> | boolean
    effectiveFrom?: DateTimeWithAggregatesFilter<"ProfessionalAvailability"> | Date | string
    effectiveUntil?: DateTimeNullableWithAggregatesFilter<"ProfessionalAvailability"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"ProfessionalAvailability"> | boolean
    notes?: StringNullableWithAggregatesFilter<"ProfessionalAvailability"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalAvailability"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalAvailability"> | Date | string
  }

  export type ProfessionalReviewWhereInput = {
    AND?: ProfessionalReviewWhereInput | ProfessionalReviewWhereInput[]
    OR?: ProfessionalReviewWhereInput[]
    NOT?: ProfessionalReviewWhereInput | ProfessionalReviewWhereInput[]
    id?: StringFilter<"ProfessionalReview"> | string
    professionalId?: StringFilter<"ProfessionalReview"> | string
    reviewerId?: StringFilter<"ProfessionalReview"> | string
    reviewerType?: StringFilter<"ProfessionalReview"> | string
    caseId?: StringNullableFilter<"ProfessionalReview"> | string | null
    rating?: FloatFilter<"ProfessionalReview"> | number
    title?: StringNullableFilter<"ProfessionalReview"> | string | null
    review?: StringNullableFilter<"ProfessionalReview"> | string | null
    expertise?: FloatNullableFilter<"ProfessionalReview"> | number | null
    communication?: FloatNullableFilter<"ProfessionalReview"> | number | null
    timeliness?: FloatNullableFilter<"ProfessionalReview"> | number | null
    professionalism?: FloatNullableFilter<"ProfessionalReview"> | number | null
    isPublic?: BoolFilter<"ProfessionalReview"> | boolean
    isVerified?: BoolFilter<"ProfessionalReview"> | boolean
    moderationStatus?: StringFilter<"ProfessionalReview"> | string
    moderatedBy?: StringNullableFilter<"ProfessionalReview"> | string | null
    moderatedAt?: DateTimeNullableFilter<"ProfessionalReview"> | Date | string | null
    createdAt?: DateTimeFilter<"ProfessionalReview"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalReview"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type ProfessionalReviewOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    caseId?: SortOrderInput | SortOrder
    rating?: SortOrder
    title?: SortOrderInput | SortOrder
    review?: SortOrderInput | SortOrder
    expertise?: SortOrderInput | SortOrder
    communication?: SortOrderInput | SortOrder
    timeliness?: SortOrderInput | SortOrder
    professionalism?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    isVerified?: SortOrder
    moderationStatus?: SortOrder
    moderatedBy?: SortOrderInput | SortOrder
    moderatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
  }

  export type ProfessionalReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalReviewWhereInput | ProfessionalReviewWhereInput[]
    OR?: ProfessionalReviewWhereInput[]
    NOT?: ProfessionalReviewWhereInput | ProfessionalReviewWhereInput[]
    professionalId?: StringFilter<"ProfessionalReview"> | string
    reviewerId?: StringFilter<"ProfessionalReview"> | string
    reviewerType?: StringFilter<"ProfessionalReview"> | string
    caseId?: StringNullableFilter<"ProfessionalReview"> | string | null
    rating?: FloatFilter<"ProfessionalReview"> | number
    title?: StringNullableFilter<"ProfessionalReview"> | string | null
    review?: StringNullableFilter<"ProfessionalReview"> | string | null
    expertise?: FloatNullableFilter<"ProfessionalReview"> | number | null
    communication?: FloatNullableFilter<"ProfessionalReview"> | number | null
    timeliness?: FloatNullableFilter<"ProfessionalReview"> | number | null
    professionalism?: FloatNullableFilter<"ProfessionalReview"> | number | null
    isPublic?: BoolFilter<"ProfessionalReview"> | boolean
    isVerified?: BoolFilter<"ProfessionalReview"> | boolean
    moderationStatus?: StringFilter<"ProfessionalReview"> | string
    moderatedBy?: StringNullableFilter<"ProfessionalReview"> | string | null
    moderatedAt?: DateTimeNullableFilter<"ProfessionalReview"> | Date | string | null
    createdAt?: DateTimeFilter<"ProfessionalReview"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalReview"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id">

  export type ProfessionalReviewOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    caseId?: SortOrderInput | SortOrder
    rating?: SortOrder
    title?: SortOrderInput | SortOrder
    review?: SortOrderInput | SortOrder
    expertise?: SortOrderInput | SortOrder
    communication?: SortOrderInput | SortOrder
    timeliness?: SortOrderInput | SortOrder
    professionalism?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    isVerified?: SortOrder
    moderationStatus?: SortOrder
    moderatedBy?: SortOrderInput | SortOrder
    moderatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalReviewCountOrderByAggregateInput
    _avg?: ProfessionalReviewAvgOrderByAggregateInput
    _max?: ProfessionalReviewMaxOrderByAggregateInput
    _min?: ProfessionalReviewMinOrderByAggregateInput
    _sum?: ProfessionalReviewSumOrderByAggregateInput
  }

  export type ProfessionalReviewScalarWhereWithAggregatesInput = {
    AND?: ProfessionalReviewScalarWhereWithAggregatesInput | ProfessionalReviewScalarWhereWithAggregatesInput[]
    OR?: ProfessionalReviewScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalReviewScalarWhereWithAggregatesInput | ProfessionalReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalReview"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalReview"> | string
    reviewerId?: StringWithAggregatesFilter<"ProfessionalReview"> | string
    reviewerType?: StringWithAggregatesFilter<"ProfessionalReview"> | string
    caseId?: StringNullableWithAggregatesFilter<"ProfessionalReview"> | string | null
    rating?: FloatWithAggregatesFilter<"ProfessionalReview"> | number
    title?: StringNullableWithAggregatesFilter<"ProfessionalReview"> | string | null
    review?: StringNullableWithAggregatesFilter<"ProfessionalReview"> | string | null
    expertise?: FloatNullableWithAggregatesFilter<"ProfessionalReview"> | number | null
    communication?: FloatNullableWithAggregatesFilter<"ProfessionalReview"> | number | null
    timeliness?: FloatNullableWithAggregatesFilter<"ProfessionalReview"> | number | null
    professionalism?: FloatNullableWithAggregatesFilter<"ProfessionalReview"> | number | null
    isPublic?: BoolWithAggregatesFilter<"ProfessionalReview"> | boolean
    isVerified?: BoolWithAggregatesFilter<"ProfessionalReview"> | boolean
    moderationStatus?: StringWithAggregatesFilter<"ProfessionalReview"> | string
    moderatedBy?: StringNullableWithAggregatesFilter<"ProfessionalReview"> | string | null
    moderatedAt?: DateTimeNullableWithAggregatesFilter<"ProfessionalReview"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProfessionalReview"> | Date | string
  }

  export type UserSessionWhereInput = {
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    id?: StringFilter<"UserSession"> | string
    userId?: StringFilter<"UserSession"> | string
    tokenHash?: StringFilter<"UserSession"> | string
    deviceInfo?: JsonNullableFilter<"UserSession">
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    userAgent?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    revokedAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: UserSessionWhereInput | UserSessionWhereInput[]
    OR?: UserSessionWhereInput[]
    NOT?: UserSessionWhereInput | UserSessionWhereInput[]
    userId?: StringFilter<"UserSession"> | string
    deviceInfo?: JsonNullableFilter<"UserSession">
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    userAgent?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    revokedAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "tokenHash">

  export type UserSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserSessionCountOrderByAggregateInput
    _max?: UserSessionMaxOrderByAggregateInput
    _min?: UserSessionMinOrderByAggregateInput
  }

  export type UserSessionScalarWhereWithAggregatesInput = {
    AND?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    OR?: UserSessionScalarWhereWithAggregatesInput[]
    NOT?: UserSessionScalarWhereWithAggregatesInput | UserSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSession"> | string
    userId?: StringWithAggregatesFilter<"UserSession"> | string
    tokenHash?: StringWithAggregatesFilter<"UserSession"> | string
    deviceInfo?: JsonNullableWithAggregatesFilter<"UserSession">
    ipAddress?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"UserSession"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserSession"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    success?: BoolFilter<"AuditLog"> | boolean
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    success?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    success?: BoolFilter<"AuditLog"> | boolean
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    success?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    success?: BoolWithAggregatesFilter<"AuditLog"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ProfessionalStatisticWhereInput = {
    AND?: ProfessionalStatisticWhereInput | ProfessionalStatisticWhereInput[]
    OR?: ProfessionalStatisticWhereInput[]
    NOT?: ProfessionalStatisticWhereInput | ProfessionalStatisticWhereInput[]
    id?: StringFilter<"ProfessionalStatistic"> | string
    professionalId?: StringFilter<"ProfessionalStatistic"> | string
    totalCases?: IntFilter<"ProfessionalStatistic"> | number
    completedCases?: IntFilter<"ProfessionalStatistic"> | number
    averageRating?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    averageResponseTime?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    patientSatisfaction?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    peerRating?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    qualityScore?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    periodStart?: DateTimeFilter<"ProfessionalStatistic"> | Date | string
    periodEnd?: DateTimeFilter<"ProfessionalStatistic"> | Date | string
    metadata?: JsonNullableFilter<"ProfessionalStatistic">
    createdAt?: DateTimeFilter<"ProfessionalStatistic"> | Date | string
  }

  export type ProfessionalStatisticOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    totalCases?: SortOrder
    completedCases?: SortOrder
    averageRating?: SortOrderInput | SortOrder
    averageResponseTime?: SortOrderInput | SortOrder
    patientSatisfaction?: SortOrderInput | SortOrder
    peerRating?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalStatisticWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalStatisticWhereInput | ProfessionalStatisticWhereInput[]
    OR?: ProfessionalStatisticWhereInput[]
    NOT?: ProfessionalStatisticWhereInput | ProfessionalStatisticWhereInput[]
    professionalId?: StringFilter<"ProfessionalStatistic"> | string
    totalCases?: IntFilter<"ProfessionalStatistic"> | number
    completedCases?: IntFilter<"ProfessionalStatistic"> | number
    averageRating?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    averageResponseTime?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    patientSatisfaction?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    peerRating?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    qualityScore?: FloatNullableFilter<"ProfessionalStatistic"> | number | null
    periodStart?: DateTimeFilter<"ProfessionalStatistic"> | Date | string
    periodEnd?: DateTimeFilter<"ProfessionalStatistic"> | Date | string
    metadata?: JsonNullableFilter<"ProfessionalStatistic">
    createdAt?: DateTimeFilter<"ProfessionalStatistic"> | Date | string
  }, "id">

  export type ProfessionalStatisticOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    totalCases?: SortOrder
    completedCases?: SortOrder
    averageRating?: SortOrderInput | SortOrder
    averageResponseTime?: SortOrderInput | SortOrder
    patientSatisfaction?: SortOrderInput | SortOrder
    peerRating?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProfessionalStatisticCountOrderByAggregateInput
    _avg?: ProfessionalStatisticAvgOrderByAggregateInput
    _max?: ProfessionalStatisticMaxOrderByAggregateInput
    _min?: ProfessionalStatisticMinOrderByAggregateInput
    _sum?: ProfessionalStatisticSumOrderByAggregateInput
  }

  export type ProfessionalStatisticScalarWhereWithAggregatesInput = {
    AND?: ProfessionalStatisticScalarWhereWithAggregatesInput | ProfessionalStatisticScalarWhereWithAggregatesInput[]
    OR?: ProfessionalStatisticScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalStatisticScalarWhereWithAggregatesInput | ProfessionalStatisticScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalStatistic"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalStatistic"> | string
    totalCases?: IntWithAggregatesFilter<"ProfessionalStatistic"> | number
    completedCases?: IntWithAggregatesFilter<"ProfessionalStatistic"> | number
    averageRating?: FloatNullableWithAggregatesFilter<"ProfessionalStatistic"> | number | null
    averageResponseTime?: FloatNullableWithAggregatesFilter<"ProfessionalStatistic"> | number | null
    patientSatisfaction?: FloatNullableWithAggregatesFilter<"ProfessionalStatistic"> | number | null
    peerRating?: FloatNullableWithAggregatesFilter<"ProfessionalStatistic"> | number | null
    qualityScore?: FloatNullableWithAggregatesFilter<"ProfessionalStatistic"> | number | null
    periodStart?: DateTimeWithAggregatesFilter<"ProfessionalStatistic"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"ProfessionalStatistic"> | Date | string
    metadata?: JsonNullableWithAggregatesFilter<"ProfessionalStatistic">
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalStatistic"> | Date | string
  }

  export type ProfessionalCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessionalInput
    licenses?: ProfessionalLicenseCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessionalNestedInput
    licenses?: ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateManyInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalLicenseCreateInput = {
    id?: string
    licenseNumber: string
    licenseType: string
    issuingAuthority: string
    issuingState?: string | null
    issuingCountry: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    isActive?: boolean
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationNotes?: string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutLicensesInput
  }

  export type ProfessionalLicenseUncheckedCreateInput = {
    id?: string
    professionalId: string
    licenseNumber: string
    licenseType: string
    issuingAuthority: string
    issuingState?: string | null
    issuingCountry: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    isActive?: boolean
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationNotes?: string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalLicenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    issuingAuthority?: StringFieldUpdateOperationsInput | string
    issuingState?: NullableStringFieldUpdateOperationsInput | string | null
    issuingCountry?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutLicensesNestedInput
  }

  export type ProfessionalLicenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    issuingAuthority?: StringFieldUpdateOperationsInput | string
    issuingState?: NullableStringFieldUpdateOperationsInput | string | null
    issuingCountry?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalLicenseCreateManyInput = {
    id?: string
    professionalId: string
    licenseNumber: string
    licenseType: string
    issuingAuthority: string
    issuingState?: string | null
    issuingCountry: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    isActive?: boolean
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationNotes?: string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalLicenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    issuingAuthority?: StringFieldUpdateOperationsInput | string
    issuingState?: NullableStringFieldUpdateOperationsInput | string | null
    issuingCountry?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalLicenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    issuingAuthority?: StringFieldUpdateOperationsInput | string
    issuingState?: NullableStringFieldUpdateOperationsInput | string | null
    issuingCountry?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSpecializationCreateInput = {
    id?: string
    specialty: string
    subspecialty?: string | null
    level?: $Enums.SpecializationLevel
    boardName?: string | null
    certificationDate?: Date | string | null
    expirationDate?: Date | string | null
    certificationNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutSpecializationsInput
  }

  export type ProfessionalSpecializationUncheckedCreateInput = {
    id?: string
    professionalId: string
    specialty: string
    subspecialty?: string | null
    level?: $Enums.SpecializationLevel
    boardName?: string | null
    certificationDate?: Date | string | null
    expirationDate?: Date | string | null
    certificationNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalSpecializationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    subspecialty?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumSpecializationLevelFieldUpdateOperationsInput | $Enums.SpecializationLevel
    boardName?: NullableStringFieldUpdateOperationsInput | string | null
    certificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutSpecializationsNestedInput
  }

  export type ProfessionalSpecializationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    subspecialty?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumSpecializationLevelFieldUpdateOperationsInput | $Enums.SpecializationLevel
    boardName?: NullableStringFieldUpdateOperationsInput | string | null
    certificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSpecializationCreateManyInput = {
    id?: string
    professionalId: string
    specialty: string
    subspecialty?: string | null
    level?: $Enums.SpecializationLevel
    boardName?: string | null
    certificationDate?: Date | string | null
    expirationDate?: Date | string | null
    certificationNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalSpecializationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    subspecialty?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumSpecializationLevelFieldUpdateOperationsInput | $Enums.SpecializationLevel
    boardName?: NullableStringFieldUpdateOperationsInput | string | null
    certificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSpecializationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    subspecialty?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumSpecializationLevelFieldUpdateOperationsInput | $Enums.SpecializationLevel
    boardName?: NullableStringFieldUpdateOperationsInput | string | null
    certificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAffiliationCreateInput = {
    id?: string
    institutionName: string
    institutionType: string
    department?: string | null
    position?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    isPrimary?: boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    website?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationContact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutAffiliationsInput
  }

  export type ProfessionalAffiliationUncheckedCreateInput = {
    id?: string
    professionalId: string
    institutionName: string
    institutionType: string
    department?: string | null
    position?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    isPrimary?: boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    website?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationContact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAffiliationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    institutionType?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationContact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutAffiliationsNestedInput
  }

  export type ProfessionalAffiliationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    institutionType?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationContact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAffiliationCreateManyInput = {
    id?: string
    professionalId: string
    institutionName: string
    institutionType: string
    department?: string | null
    position?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    isPrimary?: boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    website?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationContact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAffiliationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    institutionType?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationContact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAffiliationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    institutionType?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationContact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCredentialCreateInput = {
    id?: string
    credentialType: string
    credentialName: string
    issuingOrganization: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    credentialNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    description?: string | null
    continuingEducationHours?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutCredentialsInput
  }

  export type ProfessionalCredentialUncheckedCreateInput = {
    id?: string
    professionalId: string
    credentialType: string
    credentialName: string
    issuingOrganization: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    credentialNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    description?: string | null
    continuingEducationHours?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalCredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialType?: StringFieldUpdateOperationsInput | string
    credentialName?: StringFieldUpdateOperationsInput | string
    issuingOrganization?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    credentialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    continuingEducationHours?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type ProfessionalCredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    credentialType?: StringFieldUpdateOperationsInput | string
    credentialName?: StringFieldUpdateOperationsInput | string
    issuingOrganization?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    credentialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    continuingEducationHours?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCredentialCreateManyInput = {
    id?: string
    professionalId: string
    credentialType: string
    credentialName: string
    issuingOrganization: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    credentialNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    description?: string | null
    continuingEducationHours?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalCredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialType?: StringFieldUpdateOperationsInput | string
    credentialName?: StringFieldUpdateOperationsInput | string
    issuingOrganization?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    credentialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    continuingEducationHours?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    credentialType?: StringFieldUpdateOperationsInput | string
    credentialName?: StringFieldUpdateOperationsInput | string
    issuingOrganization?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    credentialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    continuingEducationHours?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAvailabilityCreateInput = {
    id?: string
    dayOfWeek: number
    startTime: string
    endTime: string
    timeZone: string
    availabilityType: string
    maxCases?: number | null
    isRecurring?: boolean
    effectiveFrom?: Date | string
    effectiveUntil?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutAvailabilityInput
  }

  export type ProfessionalAvailabilityUncheckedCreateInput = {
    id?: string
    professionalId: string
    dayOfWeek: number
    startTime: string
    endTime: string
    timeZone: string
    availabilityType: string
    maxCases?: number | null
    isRecurring?: boolean
    effectiveFrom?: Date | string
    effectiveUntil?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAvailabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    availabilityType?: StringFieldUpdateOperationsInput | string
    maxCases?: NullableIntFieldUpdateOperationsInput | number | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutAvailabilityNestedInput
  }

  export type ProfessionalAvailabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    availabilityType?: StringFieldUpdateOperationsInput | string
    maxCases?: NullableIntFieldUpdateOperationsInput | number | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAvailabilityCreateManyInput = {
    id?: string
    professionalId: string
    dayOfWeek: number
    startTime: string
    endTime: string
    timeZone: string
    availabilityType: string
    maxCases?: number | null
    isRecurring?: boolean
    effectiveFrom?: Date | string
    effectiveUntil?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAvailabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    availabilityType?: StringFieldUpdateOperationsInput | string
    maxCases?: NullableIntFieldUpdateOperationsInput | number | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAvailabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    availabilityType?: StringFieldUpdateOperationsInput | string
    maxCases?: NullableIntFieldUpdateOperationsInput | number | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalReviewCreateInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    caseId?: string | null
    rating: number
    title?: string | null
    review?: string | null
    expertise?: number | null
    communication?: number | null
    timeliness?: number | null
    professionalism?: number | null
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: string
    moderatedBy?: string | null
    moderatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutReviewsInput
  }

  export type ProfessionalReviewUncheckedCreateInput = {
    id?: string
    professionalId: string
    reviewerId: string
    reviewerType: string
    caseId?: string | null
    rating: number
    title?: string | null
    review?: string | null
    expertise?: number | null
    communication?: number | null
    timeliness?: number | null
    professionalism?: number | null
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: string
    moderatedBy?: string | null
    moderatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableFloatFieldUpdateOperationsInput | number | null
    communication?: NullableFloatFieldUpdateOperationsInput | number | null
    timeliness?: NullableFloatFieldUpdateOperationsInput | number | null
    professionalism?: NullableFloatFieldUpdateOperationsInput | number | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    moderationStatus?: StringFieldUpdateOperationsInput | string
    moderatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ProfessionalReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableFloatFieldUpdateOperationsInput | number | null
    communication?: NullableFloatFieldUpdateOperationsInput | number | null
    timeliness?: NullableFloatFieldUpdateOperationsInput | number | null
    professionalism?: NullableFloatFieldUpdateOperationsInput | number | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    moderationStatus?: StringFieldUpdateOperationsInput | string
    moderatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalReviewCreateManyInput = {
    id?: string
    professionalId: string
    reviewerId: string
    reviewerType: string
    caseId?: string | null
    rating: number
    title?: string | null
    review?: string | null
    expertise?: number | null
    communication?: number | null
    timeliness?: number | null
    professionalism?: number | null
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: string
    moderatedBy?: string | null
    moderatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableFloatFieldUpdateOperationsInput | number | null
    communication?: NullableFloatFieldUpdateOperationsInput | number | null
    timeliness?: NullableFloatFieldUpdateOperationsInput | number | null
    professionalism?: NullableFloatFieldUpdateOperationsInput | number | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    moderationStatus?: StringFieldUpdateOperationsInput | string
    moderatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableFloatFieldUpdateOperationsInput | number | null
    communication?: NullableFloatFieldUpdateOperationsInput | number | null
    timeliness?: NullableFloatFieldUpdateOperationsInput | number | null
    professionalism?: NullableFloatFieldUpdateOperationsInput | number | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    moderationStatus?: StringFieldUpdateOperationsInput | string
    moderatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateInput = {
    id?: string
    tokenHash: string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type UserSessionUncheckedCreateInput = {
    id?: string
    userId: string
    tokenHash: string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type UserSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateManyInput = {
    id?: string
    userId: string
    tokenHash: string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalStatisticCreateInput = {
    id?: string
    professionalId: string
    totalCases?: number
    completedCases?: number
    averageRating?: number | null
    averageResponseTime?: number | null
    patientSatisfaction?: number | null
    peerRating?: number | null
    qualityScore?: number | null
    periodStart: Date | string
    periodEnd: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProfessionalStatisticUncheckedCreateInput = {
    id?: string
    professionalId: string
    totalCases?: number
    completedCases?: number
    averageRating?: number | null
    averageResponseTime?: number | null
    patientSatisfaction?: number | null
    peerRating?: number | null
    qualityScore?: number | null
    periodStart: Date | string
    periodEnd: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProfessionalStatisticUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    totalCases?: IntFieldUpdateOperationsInput | number
    completedCases?: IntFieldUpdateOperationsInput | number
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    averageResponseTime?: NullableFloatFieldUpdateOperationsInput | number | null
    patientSatisfaction?: NullableFloatFieldUpdateOperationsInput | number | null
    peerRating?: NullableFloatFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalStatisticUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    totalCases?: IntFieldUpdateOperationsInput | number
    completedCases?: IntFieldUpdateOperationsInput | number
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    averageResponseTime?: NullableFloatFieldUpdateOperationsInput | number | null
    patientSatisfaction?: NullableFloatFieldUpdateOperationsInput | number | null
    peerRating?: NullableFloatFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalStatisticCreateManyInput = {
    id?: string
    professionalId: string
    totalCases?: number
    completedCases?: number
    averageRating?: number | null
    averageResponseTime?: number | null
    patientSatisfaction?: number | null
    peerRating?: number | null
    qualityScore?: number | null
    periodStart: Date | string
    periodEnd: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProfessionalStatisticUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    totalCases?: IntFieldUpdateOperationsInput | number
    completedCases?: IntFieldUpdateOperationsInput | number
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    averageResponseTime?: NullableFloatFieldUpdateOperationsInput | number | null
    patientSatisfaction?: NullableFloatFieldUpdateOperationsInput | number | null
    peerRating?: NullableFloatFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalStatisticUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    totalCases?: IntFieldUpdateOperationsInput | number
    completedCases?: IntFieldUpdateOperationsInput | number
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    averageResponseTime?: NullableFloatFieldUpdateOperationsInput | number | null
    patientSatisfaction?: NullableFloatFieldUpdateOperationsInput | number | null
    peerRating?: NullableFloatFieldUpdateOperationsInput | number | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumProfessionalLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfessionalLevel | EnumProfessionalLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumProfessionalLevelFilter<$PrismaModel> | $Enums.ProfessionalLevel
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumAvailabilityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AvailabilityStatus | EnumAvailabilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAvailabilityStatusFilter<$PrismaModel> | $Enums.AvailabilityStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumCommunicationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumCommunicationChannelFilter<$PrismaModel> | $Enums.CommunicationChannel
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProfessionalLicenseListRelationFilter = {
    every?: ProfessionalLicenseWhereInput
    some?: ProfessionalLicenseWhereInput
    none?: ProfessionalLicenseWhereInput
  }

  export type ProfessionalSpecializationListRelationFilter = {
    every?: ProfessionalSpecializationWhereInput
    some?: ProfessionalSpecializationWhereInput
    none?: ProfessionalSpecializationWhereInput
  }

  export type ProfessionalAffiliationListRelationFilter = {
    every?: ProfessionalAffiliationWhereInput
    some?: ProfessionalAffiliationWhereInput
    none?: ProfessionalAffiliationWhereInput
  }

  export type ProfessionalCredentialListRelationFilter = {
    every?: ProfessionalCredentialWhereInput
    some?: ProfessionalCredentialWhereInput
    none?: ProfessionalCredentialWhereInput
  }

  export type ProfessionalAvailabilityListRelationFilter = {
    every?: ProfessionalAvailabilityWhereInput
    some?: ProfessionalAvailabilityWhereInput
    none?: ProfessionalAvailabilityWhereInput
  }

  export type ProfessionalReviewListRelationFilter = {
    every?: ProfessionalReviewWhereInput
    some?: ProfessionalReviewWhereInput
    none?: ProfessionalReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfessionalLicenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalSpecializationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalAffiliationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalCredentialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalAvailabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    alternateEmail?: SortOrder
    title?: SortOrder
    level?: SortOrder
    yearsOfExperience?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verifiedBy?: SortOrder
    suspendedAt?: SortOrder
    suspendedUntil?: SortOrder
    suspensionReason?: SortOrder
    biography?: SortOrder
    expertise?: SortOrder
    researchInterests?: SortOrder
    publications?: SortOrder
    awards?: SortOrder
    availabilityStatus?: SortOrder
    maxCaseLoad?: SortOrder
    currentCaseCount?: SortOrder
    preferredCommunication?: SortOrder
    timeZone?: SortOrder
    workingHours?: SortOrder
    profilePictureUrl?: SortOrder
    profileVisibility?: SortOrder
    acceptsNewCases?: SortOrder
    requiresPreApproval?: SortOrder
    userId?: SortOrder
    metadata?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalAvgOrderByAggregateInput = {
    yearsOfExperience?: SortOrder
    maxCaseLoad?: SortOrder
    currentCaseCount?: SortOrder
  }

  export type ProfessionalMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    alternateEmail?: SortOrder
    title?: SortOrder
    level?: SortOrder
    yearsOfExperience?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verifiedBy?: SortOrder
    suspendedAt?: SortOrder
    suspendedUntil?: SortOrder
    suspensionReason?: SortOrder
    biography?: SortOrder
    availabilityStatus?: SortOrder
    maxCaseLoad?: SortOrder
    currentCaseCount?: SortOrder
    preferredCommunication?: SortOrder
    timeZone?: SortOrder
    profilePictureUrl?: SortOrder
    profileVisibility?: SortOrder
    acceptsNewCases?: SortOrder
    requiresPreApproval?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    alternateEmail?: SortOrder
    title?: SortOrder
    level?: SortOrder
    yearsOfExperience?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verifiedBy?: SortOrder
    suspendedAt?: SortOrder
    suspendedUntil?: SortOrder
    suspensionReason?: SortOrder
    biography?: SortOrder
    availabilityStatus?: SortOrder
    maxCaseLoad?: SortOrder
    currentCaseCount?: SortOrder
    preferredCommunication?: SortOrder
    timeZone?: SortOrder
    profilePictureUrl?: SortOrder
    profileVisibility?: SortOrder
    acceptsNewCases?: SortOrder
    requiresPreApproval?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalSumOrderByAggregateInput = {
    yearsOfExperience?: SortOrder
    maxCaseLoad?: SortOrder
    currentCaseCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumProfessionalLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfessionalLevel | EnumProfessionalLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumProfessionalLevelWithAggregatesFilter<$PrismaModel> | $Enums.ProfessionalLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProfessionalLevelFilter<$PrismaModel>
    _max?: NestedEnumProfessionalLevelFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAvailabilityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AvailabilityStatus | EnumAvailabilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAvailabilityStatusWithAggregatesFilter<$PrismaModel> | $Enums.AvailabilityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAvailabilityStatusFilter<$PrismaModel>
    _max?: NestedEnumAvailabilityStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumCommunicationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumCommunicationChannelWithAggregatesFilter<$PrismaModel> | $Enums.CommunicationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommunicationChannelFilter<$PrismaModel>
    _max?: NestedEnumCommunicationChannelFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProfessionalNullableScalarRelationFilter = {
    is?: ProfessionalWhereInput | null
    isNot?: ProfessionalWhereInput | null
  }

  export type UserSessionListRelationFilter = {
    every?: UserSessionWhereInput
    some?: UserSessionWhereInput
    none?: UserSessionWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type UserSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrder
    twoFactorMethod?: SortOrder
    lastLoginAt?: SortOrder
    lastLoginIP?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    passwordChangedAt?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrder
    twoFactorMethod?: SortOrder
    lastLoginAt?: SortOrder
    lastLoginIP?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    passwordChangedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    emailVerified?: SortOrder
    emailVerifiedAt?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorSecret?: SortOrder
    twoFactorMethod?: SortOrder
    lastLoginAt?: SortOrder
    lastLoginIP?: SortOrder
    failedLoginAttempts?: SortOrder
    lockedUntil?: SortOrder
    passwordChangedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    failedLoginAttempts?: SortOrder
  }

  export type ProfessionalScalarRelationFilter = {
    is?: ProfessionalWhereInput
    isNot?: ProfessionalWhereInput
  }

  export type ProfessionalLicenseProfessionalIdLicenseNumberCompoundUniqueInput = {
    professionalId: string
    licenseNumber: string
  }

  export type ProfessionalLicenseCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    issuingAuthority?: SortOrder
    issuingState?: SortOrder
    issuingCountry?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrder
    isActive?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verificationNotes?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalLicenseMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    issuingAuthority?: SortOrder
    issuingState?: SortOrder
    issuingCountry?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrder
    isActive?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verificationNotes?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalLicenseMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    licenseNumber?: SortOrder
    licenseType?: SortOrder
    issuingAuthority?: SortOrder
    issuingState?: SortOrder
    issuingCountry?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrder
    isActive?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verificationNotes?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSpecializationLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.SpecializationLevel | EnumSpecializationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSpecializationLevelFilter<$PrismaModel> | $Enums.SpecializationLevel
  }

  export type ProfessionalSpecializationCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    specialty?: SortOrder
    subspecialty?: SortOrder
    level?: SortOrder
    boardName?: SortOrder
    certificationDate?: SortOrder
    expirationDate?: SortOrder
    certificationNumber?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalSpecializationMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    specialty?: SortOrder
    subspecialty?: SortOrder
    level?: SortOrder
    boardName?: SortOrder
    certificationDate?: SortOrder
    expirationDate?: SortOrder
    certificationNumber?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalSpecializationMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    specialty?: SortOrder
    subspecialty?: SortOrder
    level?: SortOrder
    boardName?: SortOrder
    certificationDate?: SortOrder
    expirationDate?: SortOrder
    certificationNumber?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    documentUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumSpecializationLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpecializationLevel | EnumSpecializationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSpecializationLevelWithAggregatesFilter<$PrismaModel> | $Enums.SpecializationLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpecializationLevelFilter<$PrismaModel>
    _max?: NestedEnumSpecializationLevelFilter<$PrismaModel>
  }

  export type ProfessionalAffiliationCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    institutionName?: SortOrder
    institutionType?: SortOrder
    department?: SortOrder
    position?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    isPrimary?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verificationContact?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalAffiliationMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    institutionName?: SortOrder
    institutionType?: SortOrder
    department?: SortOrder
    position?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    isPrimary?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verificationContact?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalAffiliationMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    institutionName?: SortOrder
    institutionType?: SortOrder
    department?: SortOrder
    position?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isCurrent?: SortOrder
    isPrimary?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    verificationContact?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalCredentialCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    credentialType?: SortOrder
    credentialName?: SortOrder
    issuingOrganization?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrder
    credentialNumber?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    documentUrl?: SortOrder
    description?: SortOrder
    continuingEducationHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalCredentialAvgOrderByAggregateInput = {
    continuingEducationHours?: SortOrder
  }

  export type ProfessionalCredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    credentialType?: SortOrder
    credentialName?: SortOrder
    issuingOrganization?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrder
    credentialNumber?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    documentUrl?: SortOrder
    description?: SortOrder
    continuingEducationHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalCredentialMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    credentialType?: SortOrder
    credentialName?: SortOrder
    issuingOrganization?: SortOrder
    issuedDate?: SortOrder
    expirationDate?: SortOrder
    credentialNumber?: SortOrder
    verificationStatus?: SortOrder
    verifiedAt?: SortOrder
    documentUrl?: SortOrder
    description?: SortOrder
    continuingEducationHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalCredentialSumOrderByAggregateInput = {
    continuingEducationHours?: SortOrder
  }

  export type ProfessionalAvailabilityCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeZone?: SortOrder
    availabilityType?: SortOrder
    maxCases?: SortOrder
    isRecurring?: SortOrder
    effectiveFrom?: SortOrder
    effectiveUntil?: SortOrder
    isActive?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalAvailabilityAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    maxCases?: SortOrder
  }

  export type ProfessionalAvailabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeZone?: SortOrder
    availabilityType?: SortOrder
    maxCases?: SortOrder
    isRecurring?: SortOrder
    effectiveFrom?: SortOrder
    effectiveUntil?: SortOrder
    isActive?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalAvailabilityMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    dayOfWeek?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timeZone?: SortOrder
    availabilityType?: SortOrder
    maxCases?: SortOrder
    isRecurring?: SortOrder
    effectiveFrom?: SortOrder
    effectiveUntil?: SortOrder
    isActive?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalAvailabilitySumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
    maxCases?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProfessionalReviewCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    caseId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    review?: SortOrder
    expertise?: SortOrder
    communication?: SortOrder
    timeliness?: SortOrder
    professionalism?: SortOrder
    isPublic?: SortOrder
    isVerified?: SortOrder
    moderationStatus?: SortOrder
    moderatedBy?: SortOrder
    moderatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
    expertise?: SortOrder
    communication?: SortOrder
    timeliness?: SortOrder
    professionalism?: SortOrder
  }

  export type ProfessionalReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    caseId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    review?: SortOrder
    expertise?: SortOrder
    communication?: SortOrder
    timeliness?: SortOrder
    professionalism?: SortOrder
    isPublic?: SortOrder
    isVerified?: SortOrder
    moderationStatus?: SortOrder
    moderatedBy?: SortOrder
    moderatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalReviewMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    caseId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    review?: SortOrder
    expertise?: SortOrder
    communication?: SortOrder
    timeliness?: SortOrder
    professionalism?: SortOrder
    isPublic?: SortOrder
    isVerified?: SortOrder
    moderationStatus?: SortOrder
    moderatedBy?: SortOrder
    moderatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalReviewSumOrderByAggregateInput = {
    rating?: SortOrder
    expertise?: SortOrder
    communication?: SortOrder
    timeliness?: SortOrder
    professionalism?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    deviceInfo?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tokenHash?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    success?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    success?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    success?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalStatisticCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    totalCases?: SortOrder
    completedCases?: SortOrder
    averageRating?: SortOrder
    averageResponseTime?: SortOrder
    patientSatisfaction?: SortOrder
    peerRating?: SortOrder
    qualityScore?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalStatisticAvgOrderByAggregateInput = {
    totalCases?: SortOrder
    completedCases?: SortOrder
    averageRating?: SortOrder
    averageResponseTime?: SortOrder
    patientSatisfaction?: SortOrder
    peerRating?: SortOrder
    qualityScore?: SortOrder
  }

  export type ProfessionalStatisticMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    totalCases?: SortOrder
    completedCases?: SortOrder
    averageRating?: SortOrder
    averageResponseTime?: SortOrder
    patientSatisfaction?: SortOrder
    peerRating?: SortOrder
    qualityScore?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalStatisticMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    totalCases?: SortOrder
    completedCases?: SortOrder
    averageRating?: SortOrder
    averageResponseTime?: SortOrder
    patientSatisfaction?: SortOrder
    peerRating?: SortOrder
    qualityScore?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalStatisticSumOrderByAggregateInput = {
    totalCases?: SortOrder
    completedCases?: SortOrder
    averageRating?: SortOrder
    averageResponseTime?: SortOrder
    patientSatisfaction?: SortOrder
    peerRating?: SortOrder
    qualityScore?: SortOrder
  }

  export type ProfessionalCreateexpertiseInput = {
    set: string[]
  }

  export type ProfessionalCreateresearchInterestsInput = {
    set: string[]
  }

  export type ProfessionalCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProfessionalInput = {
    create?: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalInput
    connect?: UserWhereUniqueInput
  }

  export type ProfessionalLicenseCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutProfessionalInput, ProfessionalLicenseUncheckedCreateWithoutProfessionalInput> | ProfessionalLicenseCreateWithoutProfessionalInput[] | ProfessionalLicenseUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutProfessionalInput | ProfessionalLicenseCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalLicenseCreateManyProfessionalInputEnvelope
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
  }

  export type ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalSpecializationCreateWithoutProfessionalInput, ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput> | ProfessionalSpecializationCreateWithoutProfessionalInput[] | ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput | ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalSpecializationCreateManyProfessionalInputEnvelope
    connect?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
  }

  export type ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutProfessionalInput, ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput> | ProfessionalAffiliationCreateWithoutProfessionalInput[] | ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput | ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalAffiliationCreateManyProfessionalInputEnvelope
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
  }

  export type ProfessionalCredentialCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalCredentialCreateWithoutProfessionalInput, ProfessionalCredentialUncheckedCreateWithoutProfessionalInput> | ProfessionalCredentialCreateWithoutProfessionalInput[] | ProfessionalCredentialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCredentialCreateOrConnectWithoutProfessionalInput | ProfessionalCredentialCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalCredentialCreateManyProfessionalInputEnvelope
    connect?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
  }

  export type ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalAvailabilityCreateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput> | ProfessionalAvailabilityCreateWithoutProfessionalInput[] | ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput | ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalAvailabilityCreateManyProfessionalInputEnvelope
    connect?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
  }

  export type ProfessionalReviewCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalReviewCreateWithoutProfessionalInput, ProfessionalReviewUncheckedCreateWithoutProfessionalInput> | ProfessionalReviewCreateWithoutProfessionalInput[] | ProfessionalReviewUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalReviewCreateOrConnectWithoutProfessionalInput | ProfessionalReviewCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalReviewCreateManyProfessionalInputEnvelope
    connect?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
  }

  export type ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutProfessionalInput, ProfessionalLicenseUncheckedCreateWithoutProfessionalInput> | ProfessionalLicenseCreateWithoutProfessionalInput[] | ProfessionalLicenseUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutProfessionalInput | ProfessionalLicenseCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalLicenseCreateManyProfessionalInputEnvelope
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
  }

  export type ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalSpecializationCreateWithoutProfessionalInput, ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput> | ProfessionalSpecializationCreateWithoutProfessionalInput[] | ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput | ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalSpecializationCreateManyProfessionalInputEnvelope
    connect?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
  }

  export type ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutProfessionalInput, ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput> | ProfessionalAffiliationCreateWithoutProfessionalInput[] | ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput | ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalAffiliationCreateManyProfessionalInputEnvelope
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
  }

  export type ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalCredentialCreateWithoutProfessionalInput, ProfessionalCredentialUncheckedCreateWithoutProfessionalInput> | ProfessionalCredentialCreateWithoutProfessionalInput[] | ProfessionalCredentialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCredentialCreateOrConnectWithoutProfessionalInput | ProfessionalCredentialCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalCredentialCreateManyProfessionalInputEnvelope
    connect?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
  }

  export type ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalAvailabilityCreateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput> | ProfessionalAvailabilityCreateWithoutProfessionalInput[] | ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput | ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalAvailabilityCreateManyProfessionalInputEnvelope
    connect?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
  }

  export type ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalReviewCreateWithoutProfessionalInput, ProfessionalReviewUncheckedCreateWithoutProfessionalInput> | ProfessionalReviewCreateWithoutProfessionalInput[] | ProfessionalReviewUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalReviewCreateOrConnectWithoutProfessionalInput | ProfessionalReviewCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalReviewCreateManyProfessionalInputEnvelope
    connect?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumProfessionalLevelFieldUpdateOperationsInput = {
    set?: $Enums.ProfessionalLevel
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumVerificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerificationStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProfessionalUpdateexpertiseInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProfessionalUpdateresearchInterestsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAvailabilityStatusFieldUpdateOperationsInput = {
    set?: $Enums.AvailabilityStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCommunicationChannelFieldUpdateOperationsInput = {
    set?: $Enums.CommunicationChannel
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProfessionalUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutProfessionalNestedInput = {
    create?: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalInput
    upsert?: UserUpsertWithoutProfessionalInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfessionalInput, UserUpdateWithoutProfessionalInput>, UserUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutProfessionalInput, ProfessionalLicenseUncheckedCreateWithoutProfessionalInput> | ProfessionalLicenseCreateWithoutProfessionalInput[] | ProfessionalLicenseUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutProfessionalInput | ProfessionalLicenseCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalLicenseUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalLicenseUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalLicenseCreateManyProfessionalInputEnvelope
    set?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    disconnect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    delete?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    update?: ProfessionalLicenseUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalLicenseUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalLicenseUpdateManyWithWhereWithoutProfessionalInput | ProfessionalLicenseUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
  }

  export type ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalSpecializationCreateWithoutProfessionalInput, ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput> | ProfessionalSpecializationCreateWithoutProfessionalInput[] | ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput | ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalSpecializationUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalSpecializationUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalSpecializationCreateManyProfessionalInputEnvelope
    set?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    disconnect?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    delete?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    connect?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    update?: ProfessionalSpecializationUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalSpecializationUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalSpecializationUpdateManyWithWhereWithoutProfessionalInput | ProfessionalSpecializationUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalSpecializationScalarWhereInput | ProfessionalSpecializationScalarWhereInput[]
  }

  export type ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutProfessionalInput, ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput> | ProfessionalAffiliationCreateWithoutProfessionalInput[] | ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput | ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalAffiliationUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalAffiliationUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalAffiliationCreateManyProfessionalInputEnvelope
    set?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    disconnect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    delete?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    update?: ProfessionalAffiliationUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalAffiliationUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalAffiliationUpdateManyWithWhereWithoutProfessionalInput | ProfessionalAffiliationUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
  }

  export type ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalCredentialCreateWithoutProfessionalInput, ProfessionalCredentialUncheckedCreateWithoutProfessionalInput> | ProfessionalCredentialCreateWithoutProfessionalInput[] | ProfessionalCredentialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCredentialCreateOrConnectWithoutProfessionalInput | ProfessionalCredentialCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalCredentialUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalCredentialUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalCredentialCreateManyProfessionalInputEnvelope
    set?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    disconnect?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    delete?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    connect?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    update?: ProfessionalCredentialUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalCredentialUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalCredentialUpdateManyWithWhereWithoutProfessionalInput | ProfessionalCredentialUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalCredentialScalarWhereInput | ProfessionalCredentialScalarWhereInput[]
  }

  export type ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalAvailabilityCreateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput> | ProfessionalAvailabilityCreateWithoutProfessionalInput[] | ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput | ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalAvailabilityUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalAvailabilityUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalAvailabilityCreateManyProfessionalInputEnvelope
    set?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    disconnect?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    delete?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    connect?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    update?: ProfessionalAvailabilityUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalAvailabilityUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalAvailabilityUpdateManyWithWhereWithoutProfessionalInput | ProfessionalAvailabilityUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalAvailabilityScalarWhereInput | ProfessionalAvailabilityScalarWhereInput[]
  }

  export type ProfessionalReviewUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalReviewCreateWithoutProfessionalInput, ProfessionalReviewUncheckedCreateWithoutProfessionalInput> | ProfessionalReviewCreateWithoutProfessionalInput[] | ProfessionalReviewUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalReviewCreateOrConnectWithoutProfessionalInput | ProfessionalReviewCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalReviewUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalReviewUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalReviewCreateManyProfessionalInputEnvelope
    set?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    disconnect?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    delete?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    connect?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    update?: ProfessionalReviewUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalReviewUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalReviewUpdateManyWithWhereWithoutProfessionalInput | ProfessionalReviewUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalReviewScalarWhereInput | ProfessionalReviewScalarWhereInput[]
  }

  export type ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalLicenseCreateWithoutProfessionalInput, ProfessionalLicenseUncheckedCreateWithoutProfessionalInput> | ProfessionalLicenseCreateWithoutProfessionalInput[] | ProfessionalLicenseUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalLicenseCreateOrConnectWithoutProfessionalInput | ProfessionalLicenseCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalLicenseUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalLicenseUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalLicenseCreateManyProfessionalInputEnvelope
    set?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    disconnect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    delete?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    connect?: ProfessionalLicenseWhereUniqueInput | ProfessionalLicenseWhereUniqueInput[]
    update?: ProfessionalLicenseUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalLicenseUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalLicenseUpdateManyWithWhereWithoutProfessionalInput | ProfessionalLicenseUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
  }

  export type ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalSpecializationCreateWithoutProfessionalInput, ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput> | ProfessionalSpecializationCreateWithoutProfessionalInput[] | ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput | ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalSpecializationUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalSpecializationUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalSpecializationCreateManyProfessionalInputEnvelope
    set?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    disconnect?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    delete?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    connect?: ProfessionalSpecializationWhereUniqueInput | ProfessionalSpecializationWhereUniqueInput[]
    update?: ProfessionalSpecializationUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalSpecializationUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalSpecializationUpdateManyWithWhereWithoutProfessionalInput | ProfessionalSpecializationUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalSpecializationScalarWhereInput | ProfessionalSpecializationScalarWhereInput[]
  }

  export type ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalAffiliationCreateWithoutProfessionalInput, ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput> | ProfessionalAffiliationCreateWithoutProfessionalInput[] | ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput | ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalAffiliationUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalAffiliationUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalAffiliationCreateManyProfessionalInputEnvelope
    set?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    disconnect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    delete?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    connect?: ProfessionalAffiliationWhereUniqueInput | ProfessionalAffiliationWhereUniqueInput[]
    update?: ProfessionalAffiliationUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalAffiliationUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalAffiliationUpdateManyWithWhereWithoutProfessionalInput | ProfessionalAffiliationUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
  }

  export type ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalCredentialCreateWithoutProfessionalInput, ProfessionalCredentialUncheckedCreateWithoutProfessionalInput> | ProfessionalCredentialCreateWithoutProfessionalInput[] | ProfessionalCredentialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCredentialCreateOrConnectWithoutProfessionalInput | ProfessionalCredentialCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalCredentialUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalCredentialUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalCredentialCreateManyProfessionalInputEnvelope
    set?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    disconnect?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    delete?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    connect?: ProfessionalCredentialWhereUniqueInput | ProfessionalCredentialWhereUniqueInput[]
    update?: ProfessionalCredentialUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalCredentialUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalCredentialUpdateManyWithWhereWithoutProfessionalInput | ProfessionalCredentialUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalCredentialScalarWhereInput | ProfessionalCredentialScalarWhereInput[]
  }

  export type ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalAvailabilityCreateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput> | ProfessionalAvailabilityCreateWithoutProfessionalInput[] | ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput | ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalAvailabilityUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalAvailabilityUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalAvailabilityCreateManyProfessionalInputEnvelope
    set?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    disconnect?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    delete?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    connect?: ProfessionalAvailabilityWhereUniqueInput | ProfessionalAvailabilityWhereUniqueInput[]
    update?: ProfessionalAvailabilityUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalAvailabilityUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalAvailabilityUpdateManyWithWhereWithoutProfessionalInput | ProfessionalAvailabilityUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalAvailabilityScalarWhereInput | ProfessionalAvailabilityScalarWhereInput[]
  }

  export type ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalReviewCreateWithoutProfessionalInput, ProfessionalReviewUncheckedCreateWithoutProfessionalInput> | ProfessionalReviewCreateWithoutProfessionalInput[] | ProfessionalReviewUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalReviewCreateOrConnectWithoutProfessionalInput | ProfessionalReviewCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalReviewUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalReviewUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalReviewCreateManyProfessionalInputEnvelope
    set?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    disconnect?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    delete?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    connect?: ProfessionalReviewWhereUniqueInput | ProfessionalReviewWhereUniqueInput[]
    update?: ProfessionalReviewUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalReviewUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalReviewUpdateManyWithWhereWithoutProfessionalInput | ProfessionalReviewUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalReviewScalarWhereInput | ProfessionalReviewScalarWhereInput[]
  }

  export type ProfessionalCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type UserSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ProfessionalUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type UserSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ProfessionalUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    upsert?: ProfessionalUpsertWithoutUserInput
    disconnect?: ProfessionalWhereInput | boolean
    delete?: ProfessionalWhereInput | boolean
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutUserInput, ProfessionalUpdateWithoutUserInput>, ProfessionalUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ProfessionalUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    upsert?: ProfessionalUpsertWithoutUserInput
    disconnect?: ProfessionalWhereInput | boolean
    delete?: ProfessionalWhereInput | boolean
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutUserInput, ProfessionalUpdateWithoutUserInput>, ProfessionalUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput> | UserSessionCreateWithoutUserInput[] | UserSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserSessionCreateOrConnectWithoutUserInput | UserSessionCreateOrConnectWithoutUserInput[]
    upsert?: UserSessionUpsertWithWhereUniqueWithoutUserInput | UserSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserSessionCreateManyUserInputEnvelope
    set?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    disconnect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    delete?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    connect?: UserSessionWhereUniqueInput | UserSessionWhereUniqueInput[]
    update?: UserSessionUpdateWithWhereUniqueWithoutUserInput | UserSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserSessionUpdateManyWithWhereWithoutUserInput | UserSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ProfessionalCreateNestedOneWithoutLicensesInput = {
    create?: XOR<ProfessionalCreateWithoutLicensesInput, ProfessionalUncheckedCreateWithoutLicensesInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutLicensesInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type ProfessionalUpdateOneRequiredWithoutLicensesNestedInput = {
    create?: XOR<ProfessionalCreateWithoutLicensesInput, ProfessionalUncheckedCreateWithoutLicensesInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutLicensesInput
    upsert?: ProfessionalUpsertWithoutLicensesInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutLicensesInput, ProfessionalUpdateWithoutLicensesInput>, ProfessionalUncheckedUpdateWithoutLicensesInput>
  }

  export type ProfessionalCreateNestedOneWithoutSpecializationsInput = {
    create?: XOR<ProfessionalCreateWithoutSpecializationsInput, ProfessionalUncheckedCreateWithoutSpecializationsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutSpecializationsInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type EnumSpecializationLevelFieldUpdateOperationsInput = {
    set?: $Enums.SpecializationLevel
  }

  export type ProfessionalUpdateOneRequiredWithoutSpecializationsNestedInput = {
    create?: XOR<ProfessionalCreateWithoutSpecializationsInput, ProfessionalUncheckedCreateWithoutSpecializationsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutSpecializationsInput
    upsert?: ProfessionalUpsertWithoutSpecializationsInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutSpecializationsInput, ProfessionalUpdateWithoutSpecializationsInput>, ProfessionalUncheckedUpdateWithoutSpecializationsInput>
  }

  export type ProfessionalCreateNestedOneWithoutAffiliationsInput = {
    create?: XOR<ProfessionalCreateWithoutAffiliationsInput, ProfessionalUncheckedCreateWithoutAffiliationsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutAffiliationsInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type ProfessionalUpdateOneRequiredWithoutAffiliationsNestedInput = {
    create?: XOR<ProfessionalCreateWithoutAffiliationsInput, ProfessionalUncheckedCreateWithoutAffiliationsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutAffiliationsInput
    upsert?: ProfessionalUpsertWithoutAffiliationsInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutAffiliationsInput, ProfessionalUpdateWithoutAffiliationsInput>, ProfessionalUncheckedUpdateWithoutAffiliationsInput>
  }

  export type ProfessionalCreateNestedOneWithoutCredentialsInput = {
    create?: XOR<ProfessionalCreateWithoutCredentialsInput, ProfessionalUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutCredentialsInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type ProfessionalUpdateOneRequiredWithoutCredentialsNestedInput = {
    create?: XOR<ProfessionalCreateWithoutCredentialsInput, ProfessionalUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutCredentialsInput
    upsert?: ProfessionalUpsertWithoutCredentialsInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutCredentialsInput, ProfessionalUpdateWithoutCredentialsInput>, ProfessionalUncheckedUpdateWithoutCredentialsInput>
  }

  export type ProfessionalCreateNestedOneWithoutAvailabilityInput = {
    create?: XOR<ProfessionalCreateWithoutAvailabilityInput, ProfessionalUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutAvailabilityInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type ProfessionalUpdateOneRequiredWithoutAvailabilityNestedInput = {
    create?: XOR<ProfessionalCreateWithoutAvailabilityInput, ProfessionalUncheckedCreateWithoutAvailabilityInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutAvailabilityInput
    upsert?: ProfessionalUpsertWithoutAvailabilityInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutAvailabilityInput, ProfessionalUpdateWithoutAvailabilityInput>, ProfessionalUncheckedUpdateWithoutAvailabilityInput>
  }

  export type ProfessionalCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ProfessionalCreateWithoutReviewsInput, ProfessionalUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutReviewsInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfessionalUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ProfessionalCreateWithoutReviewsInput, ProfessionalUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutReviewsInput
    upsert?: ProfessionalUpsertWithoutReviewsInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutReviewsInput, ProfessionalUpdateWithoutReviewsInput>, ProfessionalUncheckedUpdateWithoutReviewsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumProfessionalLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfessionalLevel | EnumProfessionalLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumProfessionalLevelFilter<$PrismaModel> | $Enums.ProfessionalLevel
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumVerificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusFilter<$PrismaModel> | $Enums.VerificationStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumAvailabilityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AvailabilityStatus | EnumAvailabilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAvailabilityStatusFilter<$PrismaModel> | $Enums.AvailabilityStatus
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumCommunicationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumCommunicationChannelFilter<$PrismaModel> | $Enums.CommunicationChannel
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumProfessionalLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfessionalLevel | EnumProfessionalLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfessionalLevel[] | ListEnumProfessionalLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumProfessionalLevelWithAggregatesFilter<$PrismaModel> | $Enums.ProfessionalLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProfessionalLevelFilter<$PrismaModel>
    _max?: NestedEnumProfessionalLevelFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationStatus | EnumVerificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationStatus[] | ListEnumVerificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationStatusFilter<$PrismaModel>
    _max?: NestedEnumVerificationStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAvailabilityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AvailabilityStatus | EnumAvailabilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AvailabilityStatus[] | ListEnumAvailabilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAvailabilityStatusWithAggregatesFilter<$PrismaModel> | $Enums.AvailabilityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAvailabilityStatusFilter<$PrismaModel>
    _max?: NestedEnumAvailabilityStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCommunicationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.CommunicationChannel[] | ListEnumCommunicationChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumCommunicationChannelWithAggregatesFilter<$PrismaModel> | $Enums.CommunicationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommunicationChannelFilter<$PrismaModel>
    _max?: NestedEnumCommunicationChannelFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSpecializationLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.SpecializationLevel | EnumSpecializationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSpecializationLevelFilter<$PrismaModel> | $Enums.SpecializationLevel
  }

  export type NestedEnumSpecializationLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpecializationLevel | EnumSpecializationLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpecializationLevel[] | ListEnumSpecializationLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSpecializationLevelWithAggregatesFilter<$PrismaModel> | $Enums.SpecializationLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpecializationLevelFilter<$PrismaModel>
    _max?: NestedEnumSpecializationLevelFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutProfessionalInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfessionalInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfessionalInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalLicenseCreateWithoutProfessionalInput = {
    id?: string
    licenseNumber: string
    licenseType: string
    issuingAuthority: string
    issuingState?: string | null
    issuingCountry: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    isActive?: boolean
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationNotes?: string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalLicenseUncheckedCreateWithoutProfessionalInput = {
    id?: string
    licenseNumber: string
    licenseType: string
    issuingAuthority: string
    issuingState?: string | null
    issuingCountry: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    isActive?: boolean
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationNotes?: string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalLicenseCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalLicenseWhereUniqueInput
    create: XOR<ProfessionalLicenseCreateWithoutProfessionalInput, ProfessionalLicenseUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalLicenseCreateManyProfessionalInputEnvelope = {
    data: ProfessionalLicenseCreateManyProfessionalInput | ProfessionalLicenseCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalSpecializationCreateWithoutProfessionalInput = {
    id?: string
    specialty: string
    subspecialty?: string | null
    level?: $Enums.SpecializationLevel
    boardName?: string | null
    certificationDate?: Date | string | null
    expirationDate?: Date | string | null
    certificationNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput = {
    id?: string
    specialty: string
    subspecialty?: string | null
    level?: $Enums.SpecializationLevel
    boardName?: string | null
    certificationDate?: Date | string | null
    expirationDate?: Date | string | null
    certificationNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalSpecializationCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalSpecializationWhereUniqueInput
    create: XOR<ProfessionalSpecializationCreateWithoutProfessionalInput, ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalSpecializationCreateManyProfessionalInputEnvelope = {
    data: ProfessionalSpecializationCreateManyProfessionalInput | ProfessionalSpecializationCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalAffiliationCreateWithoutProfessionalInput = {
    id?: string
    institutionName: string
    institutionType: string
    department?: string | null
    position?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    isPrimary?: boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    website?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationContact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput = {
    id?: string
    institutionName: string
    institutionType: string
    department?: string | null
    position?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    isPrimary?: boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    website?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationContact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAffiliationCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalAffiliationWhereUniqueInput
    create: XOR<ProfessionalAffiliationCreateWithoutProfessionalInput, ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalAffiliationCreateManyProfessionalInputEnvelope = {
    data: ProfessionalAffiliationCreateManyProfessionalInput | ProfessionalAffiliationCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalCredentialCreateWithoutProfessionalInput = {
    id?: string
    credentialType: string
    credentialName: string
    issuingOrganization: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    credentialNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    description?: string | null
    continuingEducationHours?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalCredentialUncheckedCreateWithoutProfessionalInput = {
    id?: string
    credentialType: string
    credentialName: string
    issuingOrganization: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    credentialNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    description?: string | null
    continuingEducationHours?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalCredentialCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalCredentialWhereUniqueInput
    create: XOR<ProfessionalCredentialCreateWithoutProfessionalInput, ProfessionalCredentialUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalCredentialCreateManyProfessionalInputEnvelope = {
    data: ProfessionalCredentialCreateManyProfessionalInput | ProfessionalCredentialCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalAvailabilityCreateWithoutProfessionalInput = {
    id?: string
    dayOfWeek: number
    startTime: string
    endTime: string
    timeZone: string
    availabilityType: string
    maxCases?: number | null
    isRecurring?: boolean
    effectiveFrom?: Date | string
    effectiveUntil?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput = {
    id?: string
    dayOfWeek: number
    startTime: string
    endTime: string
    timeZone: string
    availabilityType: string
    maxCases?: number | null
    isRecurring?: boolean
    effectiveFrom?: Date | string
    effectiveUntil?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAvailabilityCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalAvailabilityWhereUniqueInput
    create: XOR<ProfessionalAvailabilityCreateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalAvailabilityCreateManyProfessionalInputEnvelope = {
    data: ProfessionalAvailabilityCreateManyProfessionalInput | ProfessionalAvailabilityCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalReviewCreateWithoutProfessionalInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    caseId?: string | null
    rating: number
    title?: string | null
    review?: string | null
    expertise?: number | null
    communication?: number | null
    timeliness?: number | null
    professionalism?: number | null
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: string
    moderatedBy?: string | null
    moderatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalReviewUncheckedCreateWithoutProfessionalInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    caseId?: string | null
    rating: number
    title?: string | null
    review?: string | null
    expertise?: number | null
    communication?: number | null
    timeliness?: number | null
    professionalism?: number | null
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: string
    moderatedBy?: string | null
    moderatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalReviewCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalReviewWhereUniqueInput
    create: XOR<ProfessionalReviewCreateWithoutProfessionalInput, ProfessionalReviewUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalReviewCreateManyProfessionalInputEnvelope = {
    data: ProfessionalReviewCreateManyProfessionalInput | ProfessionalReviewCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProfessionalInput = {
    update: XOR<UserUpdateWithoutProfessionalInput, UserUncheckedUpdateWithoutProfessionalInput>
    create: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfessionalInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfessionalInput, UserUncheckedUpdateWithoutProfessionalInput>
  }

  export type UserUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProfessionalLicenseUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalLicenseWhereUniqueInput
    update: XOR<ProfessionalLicenseUpdateWithoutProfessionalInput, ProfessionalLicenseUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalLicenseCreateWithoutProfessionalInput, ProfessionalLicenseUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalLicenseUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalLicenseWhereUniqueInput
    data: XOR<ProfessionalLicenseUpdateWithoutProfessionalInput, ProfessionalLicenseUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalLicenseUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalLicenseScalarWhereInput
    data: XOR<ProfessionalLicenseUpdateManyMutationInput, ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalLicenseScalarWhereInput = {
    AND?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
    OR?: ProfessionalLicenseScalarWhereInput[]
    NOT?: ProfessionalLicenseScalarWhereInput | ProfessionalLicenseScalarWhereInput[]
    id?: StringFilter<"ProfessionalLicense"> | string
    professionalId?: StringFilter<"ProfessionalLicense"> | string
    licenseNumber?: StringFilter<"ProfessionalLicense"> | string
    licenseType?: StringFilter<"ProfessionalLicense"> | string
    issuingAuthority?: StringFilter<"ProfessionalLicense"> | string
    issuingState?: StringNullableFilter<"ProfessionalLicense"> | string | null
    issuingCountry?: StringFilter<"ProfessionalLicense"> | string
    issuedDate?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    expirationDate?: DateTimeNullableFilter<"ProfessionalLicense"> | Date | string | null
    isActive?: BoolFilter<"ProfessionalLicense"> | boolean
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalLicense"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalLicense"> | Date | string | null
    verificationNotes?: StringNullableFilter<"ProfessionalLicense"> | string | null
    documentUrl?: StringNullableFilter<"ProfessionalLicense"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalLicense"> | Date | string
  }

  export type ProfessionalSpecializationUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalSpecializationWhereUniqueInput
    update: XOR<ProfessionalSpecializationUpdateWithoutProfessionalInput, ProfessionalSpecializationUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalSpecializationCreateWithoutProfessionalInput, ProfessionalSpecializationUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalSpecializationUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalSpecializationWhereUniqueInput
    data: XOR<ProfessionalSpecializationUpdateWithoutProfessionalInput, ProfessionalSpecializationUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalSpecializationUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalSpecializationScalarWhereInput
    data: XOR<ProfessionalSpecializationUpdateManyMutationInput, ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalSpecializationScalarWhereInput = {
    AND?: ProfessionalSpecializationScalarWhereInput | ProfessionalSpecializationScalarWhereInput[]
    OR?: ProfessionalSpecializationScalarWhereInput[]
    NOT?: ProfessionalSpecializationScalarWhereInput | ProfessionalSpecializationScalarWhereInput[]
    id?: StringFilter<"ProfessionalSpecialization"> | string
    professionalId?: StringFilter<"ProfessionalSpecialization"> | string
    specialty?: StringFilter<"ProfessionalSpecialization"> | string
    subspecialty?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    level?: EnumSpecializationLevelFilter<"ProfessionalSpecialization"> | $Enums.SpecializationLevel
    boardName?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    certificationDate?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    expirationDate?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    certificationNumber?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalSpecialization"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalSpecialization"> | Date | string | null
    documentUrl?: StringNullableFilter<"ProfessionalSpecialization"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalSpecialization"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalSpecialization"> | Date | string
  }

  export type ProfessionalAffiliationUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalAffiliationWhereUniqueInput
    update: XOR<ProfessionalAffiliationUpdateWithoutProfessionalInput, ProfessionalAffiliationUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalAffiliationCreateWithoutProfessionalInput, ProfessionalAffiliationUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalAffiliationUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalAffiliationWhereUniqueInput
    data: XOR<ProfessionalAffiliationUpdateWithoutProfessionalInput, ProfessionalAffiliationUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalAffiliationUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalAffiliationScalarWhereInput
    data: XOR<ProfessionalAffiliationUpdateManyMutationInput, ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalAffiliationScalarWhereInput = {
    AND?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
    OR?: ProfessionalAffiliationScalarWhereInput[]
    NOT?: ProfessionalAffiliationScalarWhereInput | ProfessionalAffiliationScalarWhereInput[]
    id?: StringFilter<"ProfessionalAffiliation"> | string
    professionalId?: StringFilter<"ProfessionalAffiliation"> | string
    institutionName?: StringFilter<"ProfessionalAffiliation"> | string
    institutionType?: StringFilter<"ProfessionalAffiliation"> | string
    department?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    position?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    startDate?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    endDate?: DateTimeNullableFilter<"ProfessionalAffiliation"> | Date | string | null
    isCurrent?: BoolFilter<"ProfessionalAffiliation"> | boolean
    isPrimary?: BoolFilter<"ProfessionalAffiliation"> | boolean
    address?: JsonNullableFilter<"ProfessionalAffiliation">
    phone?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    website?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalAffiliation"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalAffiliation"> | Date | string | null
    verificationContact?: StringNullableFilter<"ProfessionalAffiliation"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAffiliation"> | Date | string
  }

  export type ProfessionalCredentialUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalCredentialWhereUniqueInput
    update: XOR<ProfessionalCredentialUpdateWithoutProfessionalInput, ProfessionalCredentialUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalCredentialCreateWithoutProfessionalInput, ProfessionalCredentialUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalCredentialUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalCredentialWhereUniqueInput
    data: XOR<ProfessionalCredentialUpdateWithoutProfessionalInput, ProfessionalCredentialUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalCredentialUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalCredentialScalarWhereInput
    data: XOR<ProfessionalCredentialUpdateManyMutationInput, ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalCredentialScalarWhereInput = {
    AND?: ProfessionalCredentialScalarWhereInput | ProfessionalCredentialScalarWhereInput[]
    OR?: ProfessionalCredentialScalarWhereInput[]
    NOT?: ProfessionalCredentialScalarWhereInput | ProfessionalCredentialScalarWhereInput[]
    id?: StringFilter<"ProfessionalCredential"> | string
    professionalId?: StringFilter<"ProfessionalCredential"> | string
    credentialType?: StringFilter<"ProfessionalCredential"> | string
    credentialName?: StringFilter<"ProfessionalCredential"> | string
    issuingOrganization?: StringFilter<"ProfessionalCredential"> | string
    issuedDate?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    expirationDate?: DateTimeNullableFilter<"ProfessionalCredential"> | Date | string | null
    credentialNumber?: StringNullableFilter<"ProfessionalCredential"> | string | null
    verificationStatus?: EnumVerificationStatusFilter<"ProfessionalCredential"> | $Enums.VerificationStatus
    verifiedAt?: DateTimeNullableFilter<"ProfessionalCredential"> | Date | string | null
    documentUrl?: StringNullableFilter<"ProfessionalCredential"> | string | null
    description?: StringNullableFilter<"ProfessionalCredential"> | string | null
    continuingEducationHours?: IntNullableFilter<"ProfessionalCredential"> | number | null
    createdAt?: DateTimeFilter<"ProfessionalCredential"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalCredential"> | Date | string
  }

  export type ProfessionalAvailabilityUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalAvailabilityWhereUniqueInput
    update: XOR<ProfessionalAvailabilityUpdateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalAvailabilityCreateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalAvailabilityUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalAvailabilityWhereUniqueInput
    data: XOR<ProfessionalAvailabilityUpdateWithoutProfessionalInput, ProfessionalAvailabilityUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalAvailabilityUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalAvailabilityScalarWhereInput
    data: XOR<ProfessionalAvailabilityUpdateManyMutationInput, ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalAvailabilityScalarWhereInput = {
    AND?: ProfessionalAvailabilityScalarWhereInput | ProfessionalAvailabilityScalarWhereInput[]
    OR?: ProfessionalAvailabilityScalarWhereInput[]
    NOT?: ProfessionalAvailabilityScalarWhereInput | ProfessionalAvailabilityScalarWhereInput[]
    id?: StringFilter<"ProfessionalAvailability"> | string
    professionalId?: StringFilter<"ProfessionalAvailability"> | string
    dayOfWeek?: IntFilter<"ProfessionalAvailability"> | number
    startTime?: StringFilter<"ProfessionalAvailability"> | string
    endTime?: StringFilter<"ProfessionalAvailability"> | string
    timeZone?: StringFilter<"ProfessionalAvailability"> | string
    availabilityType?: StringFilter<"ProfessionalAvailability"> | string
    maxCases?: IntNullableFilter<"ProfessionalAvailability"> | number | null
    isRecurring?: BoolFilter<"ProfessionalAvailability"> | boolean
    effectiveFrom?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    effectiveUntil?: DateTimeNullableFilter<"ProfessionalAvailability"> | Date | string | null
    isActive?: BoolFilter<"ProfessionalAvailability"> | boolean
    notes?: StringNullableFilter<"ProfessionalAvailability"> | string | null
    createdAt?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalAvailability"> | Date | string
  }

  export type ProfessionalReviewUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalReviewWhereUniqueInput
    update: XOR<ProfessionalReviewUpdateWithoutProfessionalInput, ProfessionalReviewUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalReviewCreateWithoutProfessionalInput, ProfessionalReviewUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalReviewUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalReviewWhereUniqueInput
    data: XOR<ProfessionalReviewUpdateWithoutProfessionalInput, ProfessionalReviewUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalReviewUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalReviewScalarWhereInput
    data: XOR<ProfessionalReviewUpdateManyMutationInput, ProfessionalReviewUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalReviewScalarWhereInput = {
    AND?: ProfessionalReviewScalarWhereInput | ProfessionalReviewScalarWhereInput[]
    OR?: ProfessionalReviewScalarWhereInput[]
    NOT?: ProfessionalReviewScalarWhereInput | ProfessionalReviewScalarWhereInput[]
    id?: StringFilter<"ProfessionalReview"> | string
    professionalId?: StringFilter<"ProfessionalReview"> | string
    reviewerId?: StringFilter<"ProfessionalReview"> | string
    reviewerType?: StringFilter<"ProfessionalReview"> | string
    caseId?: StringNullableFilter<"ProfessionalReview"> | string | null
    rating?: FloatFilter<"ProfessionalReview"> | number
    title?: StringNullableFilter<"ProfessionalReview"> | string | null
    review?: StringNullableFilter<"ProfessionalReview"> | string | null
    expertise?: FloatNullableFilter<"ProfessionalReview"> | number | null
    communication?: FloatNullableFilter<"ProfessionalReview"> | number | null
    timeliness?: FloatNullableFilter<"ProfessionalReview"> | number | null
    professionalism?: FloatNullableFilter<"ProfessionalReview"> | number | null
    isPublic?: BoolFilter<"ProfessionalReview"> | boolean
    isVerified?: BoolFilter<"ProfessionalReview"> | boolean
    moderationStatus?: StringFilter<"ProfessionalReview"> | string
    moderatedBy?: StringNullableFilter<"ProfessionalReview"> | string | null
    moderatedAt?: DateTimeNullableFilter<"ProfessionalReview"> | Date | string | null
    createdAt?: DateTimeFilter<"ProfessionalReview"> | Date | string
    updatedAt?: DateTimeFilter<"ProfessionalReview"> | Date | string
  }

  export type ProfessionalCreateWithoutUserInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutUserInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionUncheckedCreateWithoutUserInput = {
    id?: string
    tokenHash: string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserSessionCreateOrConnectWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionCreateManyUserInputEnvelope = {
    data: UserSessionCreateManyUserInput | UserSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalUpsertWithoutUserInput = {
    update: XOR<ProfessionalUpdateWithoutUserInput, ProfessionalUncheckedUpdateWithoutUserInput>
    create: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutUserInput, ProfessionalUncheckedUpdateWithoutUserInput>
  }

  export type ProfessionalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type UserSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    update: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
    create: XOR<UserSessionCreateWithoutUserInput, UserSessionUncheckedCreateWithoutUserInput>
  }

  export type UserSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserSessionWhereUniqueInput
    data: XOR<UserSessionUpdateWithoutUserInput, UserSessionUncheckedUpdateWithoutUserInput>
  }

  export type UserSessionUpdateManyWithWhereWithoutUserInput = {
    where: UserSessionScalarWhereInput
    data: XOR<UserSessionUpdateManyMutationInput, UserSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserSessionScalarWhereInput = {
    AND?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    OR?: UserSessionScalarWhereInput[]
    NOT?: UserSessionScalarWhereInput | UserSessionScalarWhereInput[]
    id?: StringFilter<"UserSession"> | string
    userId?: StringFilter<"UserSession"> | string
    tokenHash?: StringFilter<"UserSession"> | string
    deviceInfo?: JsonNullableFilter<"UserSession">
    ipAddress?: StringNullableFilter<"UserSession"> | string | null
    userAgent?: StringNullableFilter<"UserSession"> | string | null
    expiresAt?: DateTimeFilter<"UserSession"> | Date | string
    revokedAt?: DateTimeNullableFilter<"UserSession"> | Date | string | null
    createdAt?: DateTimeFilter<"UserSession"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    success?: BoolFilter<"AuditLog"> | boolean
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type ProfessionalCreateWithoutLicensesInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessionalInput
    specializations?: ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutLicensesInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    specializations?: ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutLicensesInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutLicensesInput, ProfessionalUncheckedCreateWithoutLicensesInput>
  }

  export type ProfessionalUpsertWithoutLicensesInput = {
    update: XOR<ProfessionalUpdateWithoutLicensesInput, ProfessionalUncheckedUpdateWithoutLicensesInput>
    create: XOR<ProfessionalCreateWithoutLicensesInput, ProfessionalUncheckedCreateWithoutLicensesInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutLicensesInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutLicensesInput, ProfessionalUncheckedUpdateWithoutLicensesInput>
  }

  export type ProfessionalUpdateWithoutLicensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutLicensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    specializations?: ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateWithoutSpecializationsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessionalInput
    licenses?: ProfessionalLicenseCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutSpecializationsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutSpecializationsInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutSpecializationsInput, ProfessionalUncheckedCreateWithoutSpecializationsInput>
  }

  export type ProfessionalUpsertWithoutSpecializationsInput = {
    update: XOR<ProfessionalUpdateWithoutSpecializationsInput, ProfessionalUncheckedUpdateWithoutSpecializationsInput>
    create: XOR<ProfessionalCreateWithoutSpecializationsInput, ProfessionalUncheckedCreateWithoutSpecializationsInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutSpecializationsInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutSpecializationsInput, ProfessionalUncheckedUpdateWithoutSpecializationsInput>
  }

  export type ProfessionalUpdateWithoutSpecializationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessionalNestedInput
    licenses?: ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutSpecializationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateWithoutAffiliationsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessionalInput
    licenses?: ProfessionalLicenseCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutAffiliationsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutAffiliationsInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutAffiliationsInput, ProfessionalUncheckedCreateWithoutAffiliationsInput>
  }

  export type ProfessionalUpsertWithoutAffiliationsInput = {
    update: XOR<ProfessionalUpdateWithoutAffiliationsInput, ProfessionalUncheckedUpdateWithoutAffiliationsInput>
    create: XOR<ProfessionalCreateWithoutAffiliationsInput, ProfessionalUncheckedCreateWithoutAffiliationsInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutAffiliationsInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutAffiliationsInput, ProfessionalUncheckedUpdateWithoutAffiliationsInput>
  }

  export type ProfessionalUpdateWithoutAffiliationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessionalNestedInput
    licenses?: ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutAffiliationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateWithoutCredentialsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessionalInput
    licenses?: ProfessionalLicenseCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutCredentialsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutCredentialsInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutCredentialsInput, ProfessionalUncheckedCreateWithoutCredentialsInput>
  }

  export type ProfessionalUpsertWithoutCredentialsInput = {
    update: XOR<ProfessionalUpdateWithoutCredentialsInput, ProfessionalUncheckedUpdateWithoutCredentialsInput>
    create: XOR<ProfessionalCreateWithoutCredentialsInput, ProfessionalUncheckedCreateWithoutCredentialsInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutCredentialsInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutCredentialsInput, ProfessionalUncheckedUpdateWithoutCredentialsInput>
  }

  export type ProfessionalUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessionalNestedInput
    licenses?: ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateWithoutAvailabilityInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessionalInput
    licenses?: ProfessionalLicenseCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutAvailabilityInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput
    reviews?: ProfessionalReviewUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutAvailabilityInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutAvailabilityInput, ProfessionalUncheckedCreateWithoutAvailabilityInput>
  }

  export type ProfessionalUpsertWithoutAvailabilityInput = {
    update: XOR<ProfessionalUpdateWithoutAvailabilityInput, ProfessionalUncheckedUpdateWithoutAvailabilityInput>
    create: XOR<ProfessionalCreateWithoutAvailabilityInput, ProfessionalUncheckedCreateWithoutAvailabilityInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutAvailabilityInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutAvailabilityInput, ProfessionalUncheckedUpdateWithoutAvailabilityInput>
  }

  export type ProfessionalUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessionalNestedInput
    licenses?: ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutAvailabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput
    reviews?: ProfessionalReviewUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateWithoutReviewsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutProfessionalInput
    licenses?: ProfessionalLicenseCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutReviewsInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    email: string
    phone?: string | null
    alternateEmail?: string | null
    title?: string | null
    level?: $Enums.ProfessionalLevel
    yearsOfExperience?: number | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verifiedBy?: string | null
    suspendedAt?: Date | string | null
    suspendedUntil?: Date | string | null
    suspensionReason?: string | null
    biography?: string | null
    expertise?: ProfessionalCreateexpertiseInput | string[]
    researchInterests?: ProfessionalCreateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: $Enums.AvailabilityStatus
    maxCaseLoad?: number | null
    currentCaseCount?: number
    preferredCommunication?: $Enums.CommunicationChannel
    timeZone?: string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: string | null
    profileVisibility?: string
    acceptsNewCases?: boolean
    requiresPreApproval?: boolean
    userId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    licenses?: ProfessionalLicenseUncheckedCreateNestedManyWithoutProfessionalInput
    specializations?: ProfessionalSpecializationUncheckedCreateNestedManyWithoutProfessionalInput
    affiliations?: ProfessionalAffiliationUncheckedCreateNestedManyWithoutProfessionalInput
    credentials?: ProfessionalCredentialUncheckedCreateNestedManyWithoutProfessionalInput
    availability?: ProfessionalAvailabilityUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutReviewsInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutReviewsInput, ProfessionalUncheckedCreateWithoutReviewsInput>
  }

  export type ProfessionalUpsertWithoutReviewsInput = {
    update: XOR<ProfessionalUpdateWithoutReviewsInput, ProfessionalUncheckedUpdateWithoutReviewsInput>
    create: XOR<ProfessionalCreateWithoutReviewsInput, ProfessionalUncheckedCreateWithoutReviewsInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutReviewsInput, ProfessionalUncheckedUpdateWithoutReviewsInput>
  }

  export type ProfessionalUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutProfessionalNestedInput
    licenses?: ProfessionalLicenseUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    alternateEmail?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumProfessionalLevelFieldUpdateOperationsInput | $Enums.ProfessionalLevel
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    suspendedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspendedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    suspensionReason?: NullableStringFieldUpdateOperationsInput | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: ProfessionalUpdateexpertiseInput | string[]
    researchInterests?: ProfessionalUpdateresearchInterestsInput | string[]
    publications?: NullableJsonNullValueInput | InputJsonValue
    awards?: NullableJsonNullValueInput | InputJsonValue
    availabilityStatus?: EnumAvailabilityStatusFieldUpdateOperationsInput | $Enums.AvailabilityStatus
    maxCaseLoad?: NullableIntFieldUpdateOperationsInput | number | null
    currentCaseCount?: IntFieldUpdateOperationsInput | number
    preferredCommunication?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    timeZone?: NullableStringFieldUpdateOperationsInput | string | null
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    profileVisibility?: StringFieldUpdateOperationsInput | string
    acceptsNewCases?: BoolFieldUpdateOperationsInput | boolean
    requiresPreApproval?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: ProfessionalUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    licenses?: ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalNestedInput
    specializations?: ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalNestedInput
    affiliations?: ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalNestedInput
    credentials?: ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalNestedInput
    availability?: ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalUncheckedCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUncheckedUpdateOneWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalCreateNestedOneWithoutUserInput
    sessions?: UserSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    hashedPassword: string
    emailVerified?: boolean
    emailVerifiedAt?: Date | string | null
    twoFactorEnabled?: boolean
    twoFactorSecret?: string | null
    twoFactorMethod?: string | null
    lastLoginAt?: Date | string | null
    lastLoginIP?: string | null
    failedLoginAttempts?: number
    lockedUntil?: Date | string | null
    passwordChangedAt?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalUncheckedCreateNestedOneWithoutUserInput
    sessions?: UserSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoginIP?: NullableStringFieldUpdateOperationsInput | string | null
    failedLoginAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordChangedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUncheckedUpdateOneWithoutUserNestedInput
    sessions?: UserSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProfessionalLicenseCreateManyProfessionalInput = {
    id?: string
    licenseNumber: string
    licenseType: string
    issuingAuthority: string
    issuingState?: string | null
    issuingCountry: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    isActive?: boolean
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationNotes?: string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalSpecializationCreateManyProfessionalInput = {
    id?: string
    specialty: string
    subspecialty?: string | null
    level?: $Enums.SpecializationLevel
    boardName?: string | null
    certificationDate?: Date | string | null
    expirationDate?: Date | string | null
    certificationNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAffiliationCreateManyProfessionalInput = {
    id?: string
    institutionName: string
    institutionType: string
    department?: string | null
    position?: string | null
    startDate: Date | string
    endDate?: Date | string | null
    isCurrent?: boolean
    isPrimary?: boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: string | null
    website?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    verificationContact?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalCredentialCreateManyProfessionalInput = {
    id?: string
    credentialType: string
    credentialName: string
    issuingOrganization: string
    issuedDate: Date | string
    expirationDate?: Date | string | null
    credentialNumber?: string | null
    verificationStatus?: $Enums.VerificationStatus
    verifiedAt?: Date | string | null
    documentUrl?: string | null
    description?: string | null
    continuingEducationHours?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalAvailabilityCreateManyProfessionalInput = {
    id?: string
    dayOfWeek: number
    startTime: string
    endTime: string
    timeZone: string
    availabilityType: string
    maxCases?: number | null
    isRecurring?: boolean
    effectiveFrom?: Date | string
    effectiveUntil?: Date | string | null
    isActive?: boolean
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalReviewCreateManyProfessionalInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    caseId?: string | null
    rating: number
    title?: string | null
    review?: string | null
    expertise?: number | null
    communication?: number | null
    timeliness?: number | null
    professionalism?: number | null
    isPublic?: boolean
    isVerified?: boolean
    moderationStatus?: string
    moderatedBy?: string | null
    moderatedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalLicenseUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    issuingAuthority?: StringFieldUpdateOperationsInput | string
    issuingState?: NullableStringFieldUpdateOperationsInput | string | null
    issuingCountry?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalLicenseUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    issuingAuthority?: StringFieldUpdateOperationsInput | string
    issuingState?: NullableStringFieldUpdateOperationsInput | string | null
    issuingCountry?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalLicenseUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseType?: StringFieldUpdateOperationsInput | string
    issuingAuthority?: StringFieldUpdateOperationsInput | string
    issuingState?: NullableStringFieldUpdateOperationsInput | string | null
    issuingCountry?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSpecializationUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    subspecialty?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumSpecializationLevelFieldUpdateOperationsInput | $Enums.SpecializationLevel
    boardName?: NullableStringFieldUpdateOperationsInput | string | null
    certificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSpecializationUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    subspecialty?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumSpecializationLevelFieldUpdateOperationsInput | $Enums.SpecializationLevel
    boardName?: NullableStringFieldUpdateOperationsInput | string | null
    certificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSpecializationUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    subspecialty?: NullableStringFieldUpdateOperationsInput | string | null
    level?: EnumSpecializationLevelFieldUpdateOperationsInput | $Enums.SpecializationLevel
    boardName?: NullableStringFieldUpdateOperationsInput | string | null
    certificationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    certificationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAffiliationUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    institutionType?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationContact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAffiliationUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    institutionType?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationContact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAffiliationUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    institutionType?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    address?: NullableJsonNullValueInput | InputJsonValue
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verificationContact?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCredentialUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialType?: StringFieldUpdateOperationsInput | string
    credentialName?: StringFieldUpdateOperationsInput | string
    issuingOrganization?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    credentialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    continuingEducationHours?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCredentialUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialType?: StringFieldUpdateOperationsInput | string
    credentialName?: StringFieldUpdateOperationsInput | string
    issuingOrganization?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    credentialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    continuingEducationHours?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCredentialUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    credentialType?: StringFieldUpdateOperationsInput | string
    credentialName?: StringFieldUpdateOperationsInput | string
    issuingOrganization?: StringFieldUpdateOperationsInput | string
    issuedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    credentialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    verificationStatus?: EnumVerificationStatusFieldUpdateOperationsInput | $Enums.VerificationStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    continuingEducationHours?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAvailabilityUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    availabilityType?: StringFieldUpdateOperationsInput | string
    maxCases?: NullableIntFieldUpdateOperationsInput | number | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAvailabilityUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    availabilityType?: StringFieldUpdateOperationsInput | string
    maxCases?: NullableIntFieldUpdateOperationsInput | number | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalAvailabilityUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    timeZone?: StringFieldUpdateOperationsInput | string
    availabilityType?: StringFieldUpdateOperationsInput | string
    maxCases?: NullableIntFieldUpdateOperationsInput | number | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    effectiveUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalReviewUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableFloatFieldUpdateOperationsInput | number | null
    communication?: NullableFloatFieldUpdateOperationsInput | number | null
    timeliness?: NullableFloatFieldUpdateOperationsInput | number | null
    professionalism?: NullableFloatFieldUpdateOperationsInput | number | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    moderationStatus?: StringFieldUpdateOperationsInput | string
    moderatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalReviewUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableFloatFieldUpdateOperationsInput | number | null
    communication?: NullableFloatFieldUpdateOperationsInput | number | null
    timeliness?: NullableFloatFieldUpdateOperationsInput | number | null
    professionalism?: NullableFloatFieldUpdateOperationsInput | number | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    moderationStatus?: StringFieldUpdateOperationsInput | string
    moderatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalReviewUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    review?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableFloatFieldUpdateOperationsInput | number | null
    communication?: NullableFloatFieldUpdateOperationsInput | number | null
    timeliness?: NullableFloatFieldUpdateOperationsInput | number | null
    professionalism?: NullableFloatFieldUpdateOperationsInput | number | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    moderationStatus?: StringFieldUpdateOperationsInput | string
    moderatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    moderatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionCreateManyUserInput = {
    id?: string
    tokenHash: string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    expiresAt: Date | string
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    success: boolean
    createdAt?: Date | string
  }

  export type UserSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}