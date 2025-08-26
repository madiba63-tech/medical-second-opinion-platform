
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model TempSubmission
 * 
 */
export type TempSubmission = $Result.DefaultSelection<Prisma.$TempSubmissionPayload>
/**
 * Model Case
 * 
 */
export type Case = $Result.DefaultSelection<Prisma.$CasePayload>
/**
 * Model UploadedFile
 * 
 */
export type UploadedFile = $Result.DefaultSelection<Prisma.$UploadedFilePayload>
/**
 * Model MedicalProfessional
 * 
 */
export type MedicalProfessional = $Result.DefaultSelection<Prisma.$MedicalProfessionalPayload>
/**
 * Model ProfessionalSession
 * 
 */
export type ProfessionalSession = $Result.DefaultSelection<Prisma.$ProfessionalSessionPayload>
/**
 * Model CaseAssignment
 * 
 */
export type CaseAssignment = $Result.DefaultSelection<Prisma.$CaseAssignmentPayload>
/**
 * Model AIAnalysis
 * 
 */
export type AIAnalysis = $Result.DefaultSelection<Prisma.$AIAnalysisPayload>
/**
 * Model MedicalOpinion
 * 
 */
export type MedicalOpinion = $Result.DefaultSelection<Prisma.$MedicalOpinionPayload>
/**
 * Model ProfessionalPayment
 * 
 */
export type ProfessionalPayment = $Result.DefaultSelection<Prisma.$ProfessionalPaymentPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CommunicationChannel: {
  EMAIL: 'EMAIL',
  SMS: 'SMS'
};

export type CommunicationChannel = (typeof CommunicationChannel)[keyof typeof CommunicationChannel]


export const ProLevel: {
  JUNIOR: 'JUNIOR',
  SENIOR: 'SENIOR',
  EXPERT: 'EXPERT',
  DISTINGUISHED: 'DISTINGUISHED'
};

export type ProLevel = (typeof ProLevel)[keyof typeof ProLevel]


export const TwoFactorMethod: {
  EMAIL: 'EMAIL',
  SMS: 'SMS'
};

export type TwoFactorMethod = (typeof TwoFactorMethod)[keyof typeof TwoFactorMethod]

}

export type CommunicationChannel = $Enums.CommunicationChannel

export const CommunicationChannel: typeof $Enums.CommunicationChannel

export type ProLevel = $Enums.ProLevel

export const ProLevel: typeof $Enums.ProLevel

export type TwoFactorMethod = $Enums.TwoFactorMethod

export const TwoFactorMethod: typeof $Enums.TwoFactorMethod

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tempSubmission`: Exposes CRUD operations for the **TempSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TempSubmissions
    * const tempSubmissions = await prisma.tempSubmission.findMany()
    * ```
    */
  get tempSubmission(): Prisma.TempSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.case`: Exposes CRUD operations for the **Case** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cases
    * const cases = await prisma.case.findMany()
    * ```
    */
  get case(): Prisma.CaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadedFile`: Exposes CRUD operations for the **UploadedFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadedFiles
    * const uploadedFiles = await prisma.uploadedFile.findMany()
    * ```
    */
  get uploadedFile(): Prisma.UploadedFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicalProfessional`: Exposes CRUD operations for the **MedicalProfessional** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalProfessionals
    * const medicalProfessionals = await prisma.medicalProfessional.findMany()
    * ```
    */
  get medicalProfessional(): Prisma.MedicalProfessionalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalSession`: Exposes CRUD operations for the **ProfessionalSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalSessions
    * const professionalSessions = await prisma.professionalSession.findMany()
    * ```
    */
  get professionalSession(): Prisma.ProfessionalSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseAssignment`: Exposes CRUD operations for the **CaseAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseAssignments
    * const caseAssignments = await prisma.caseAssignment.findMany()
    * ```
    */
  get caseAssignment(): Prisma.CaseAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIAnalysis`: Exposes CRUD operations for the **AIAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIAnalyses
    * const aIAnalyses = await prisma.aIAnalysis.findMany()
    * ```
    */
  get aIAnalysis(): Prisma.AIAnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicalOpinion`: Exposes CRUD operations for the **MedicalOpinion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalOpinions
    * const medicalOpinions = await prisma.medicalOpinion.findMany()
    * ```
    */
  get medicalOpinion(): Prisma.MedicalOpinionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalPayment`: Exposes CRUD operations for the **ProfessionalPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalPayments
    * const professionalPayments = await prisma.professionalPayment.findMany()
    * ```
    */
  get professionalPayment(): Prisma.ProfessionalPaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
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
    User: 'User',
    Customer: 'Customer',
    TempSubmission: 'TempSubmission',
    Case: 'Case',
    UploadedFile: 'UploadedFile',
    MedicalProfessional: 'MedicalProfessional',
    ProfessionalSession: 'ProfessionalSession',
    CaseAssignment: 'CaseAssignment',
    AIAnalysis: 'AIAnalysis',
    MedicalOpinion: 'MedicalOpinion',
    ProfessionalPayment: 'ProfessionalPayment',
    Admin: 'Admin'
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
      modelProps: "user" | "customer" | "tempSubmission" | "case" | "uploadedFile" | "medicalProfessional" | "professionalSession" | "caseAssignment" | "aIAnalysis" | "medicalOpinion" | "professionalPayment" | "admin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      TempSubmission: {
        payload: Prisma.$TempSubmissionPayload<ExtArgs>
        fields: Prisma.TempSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TempSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TempSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>
          }
          findFirst: {
            args: Prisma.TempSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TempSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>
          }
          findMany: {
            args: Prisma.TempSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>[]
          }
          create: {
            args: Prisma.TempSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>
          }
          createMany: {
            args: Prisma.TempSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TempSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>[]
          }
          delete: {
            args: Prisma.TempSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>
          }
          update: {
            args: Prisma.TempSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.TempSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TempSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TempSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.TempSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempSubmissionPayload>
          }
          aggregate: {
            args: Prisma.TempSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTempSubmission>
          }
          groupBy: {
            args: Prisma.TempSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TempSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TempSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<TempSubmissionCountAggregateOutputType> | number
          }
        }
      }
      Case: {
        payload: Prisma.$CasePayload<ExtArgs>
        fields: Prisma.CaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          findFirst: {
            args: Prisma.CaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          findMany: {
            args: Prisma.CaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          create: {
            args: Prisma.CaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          createMany: {
            args: Prisma.CaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          delete: {
            args: Prisma.CaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          update: {
            args: Prisma.CaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          deleteMany: {
            args: Prisma.CaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>[]
          }
          upsert: {
            args: Prisma.CaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CasePayload>
          }
          aggregate: {
            args: Prisma.CaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCase>
          }
          groupBy: {
            args: Prisma.CaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseCountArgs<ExtArgs>
            result: $Utils.Optional<CaseCountAggregateOutputType> | number
          }
        }
      }
      UploadedFile: {
        payload: Prisma.$UploadedFilePayload<ExtArgs>
        fields: Prisma.UploadedFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadedFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadedFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          findFirst: {
            args: Prisma.UploadedFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadedFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          findMany: {
            args: Prisma.UploadedFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>[]
          }
          create: {
            args: Prisma.UploadedFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          createMany: {
            args: Prisma.UploadedFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadedFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>[]
          }
          delete: {
            args: Prisma.UploadedFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          update: {
            args: Prisma.UploadedFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          deleteMany: {
            args: Prisma.UploadedFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadedFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadedFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>[]
          }
          upsert: {
            args: Prisma.UploadedFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedFilePayload>
          }
          aggregate: {
            args: Prisma.UploadedFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadedFile>
          }
          groupBy: {
            args: Prisma.UploadedFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadedFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadedFileCountArgs<ExtArgs>
            result: $Utils.Optional<UploadedFileCountAggregateOutputType> | number
          }
        }
      }
      MedicalProfessional: {
        payload: Prisma.$MedicalProfessionalPayload<ExtArgs>
        fields: Prisma.MedicalProfessionalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalProfessionalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalProfessionalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>
          }
          findFirst: {
            args: Prisma.MedicalProfessionalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalProfessionalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>
          }
          findMany: {
            args: Prisma.MedicalProfessionalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>[]
          }
          create: {
            args: Prisma.MedicalProfessionalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>
          }
          createMany: {
            args: Prisma.MedicalProfessionalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicalProfessionalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>[]
          }
          delete: {
            args: Prisma.MedicalProfessionalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>
          }
          update: {
            args: Prisma.MedicalProfessionalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>
          }
          deleteMany: {
            args: Prisma.MedicalProfessionalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalProfessionalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicalProfessionalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>[]
          }
          upsert: {
            args: Prisma.MedicalProfessionalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalProfessionalPayload>
          }
          aggregate: {
            args: Prisma.MedicalProfessionalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalProfessional>
          }
          groupBy: {
            args: Prisma.MedicalProfessionalGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicalProfessionalGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalProfessionalCountArgs<ExtArgs>
            result: $Utils.Optional<MedicalProfessionalCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalSession: {
        payload: Prisma.$ProfessionalSessionPayload<ExtArgs>
        fields: Prisma.ProfessionalSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>
          }
          findMany: {
            args: Prisma.ProfessionalSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>[]
          }
          create: {
            args: Prisma.ProfessionalSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>
          }
          createMany: {
            args: Prisma.ProfessionalSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>
          }
          update: {
            args: Prisma.ProfessionalSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalSessionPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalSession>
          }
          groupBy: {
            args: Prisma.ProfessionalSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalSessionCountAggregateOutputType> | number
          }
        }
      }
      CaseAssignment: {
        payload: Prisma.$CaseAssignmentPayload<ExtArgs>
        fields: Prisma.CaseAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>
          }
          findFirst: {
            args: Prisma.CaseAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>
          }
          findMany: {
            args: Prisma.CaseAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>[]
          }
          create: {
            args: Prisma.CaseAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>
          }
          createMany: {
            args: Prisma.CaseAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>[]
          }
          delete: {
            args: Prisma.CaseAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>
          }
          update: {
            args: Prisma.CaseAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.CaseAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.CaseAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseAssignmentPayload>
          }
          aggregate: {
            args: Prisma.CaseAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseAssignment>
          }
          groupBy: {
            args: Prisma.CaseAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<CaseAssignmentCountAggregateOutputType> | number
          }
        }
      }
      AIAnalysis: {
        payload: Prisma.$AIAnalysisPayload<ExtArgs>
        fields: Prisma.AIAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          findFirst: {
            args: Prisma.AIAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          findMany: {
            args: Prisma.AIAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          create: {
            args: Prisma.AIAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          createMany: {
            args: Prisma.AIAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          delete: {
            args: Prisma.AIAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          update: {
            args: Prisma.AIAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.AIAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.AIAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIAnalysisPayload>
          }
          aggregate: {
            args: Prisma.AIAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIAnalysis>
          }
          groupBy: {
            args: Prisma.AIAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<AIAnalysisCountAggregateOutputType> | number
          }
        }
      }
      MedicalOpinion: {
        payload: Prisma.$MedicalOpinionPayload<ExtArgs>
        fields: Prisma.MedicalOpinionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalOpinionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalOpinionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>
          }
          findFirst: {
            args: Prisma.MedicalOpinionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalOpinionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>
          }
          findMany: {
            args: Prisma.MedicalOpinionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>[]
          }
          create: {
            args: Prisma.MedicalOpinionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>
          }
          createMany: {
            args: Prisma.MedicalOpinionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicalOpinionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>[]
          }
          delete: {
            args: Prisma.MedicalOpinionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>
          }
          update: {
            args: Prisma.MedicalOpinionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>
          }
          deleteMany: {
            args: Prisma.MedicalOpinionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalOpinionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicalOpinionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>[]
          }
          upsert: {
            args: Prisma.MedicalOpinionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalOpinionPayload>
          }
          aggregate: {
            args: Prisma.MedicalOpinionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalOpinion>
          }
          groupBy: {
            args: Prisma.MedicalOpinionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicalOpinionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalOpinionCountArgs<ExtArgs>
            result: $Utils.Optional<MedicalOpinionCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalPayment: {
        payload: Prisma.$ProfessionalPaymentPayload<ExtArgs>
        fields: Prisma.ProfessionalPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>
          }
          findMany: {
            args: Prisma.ProfessionalPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>[]
          }
          create: {
            args: Prisma.ProfessionalPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>
          }
          createMany: {
            args: Prisma.ProfessionalPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfessionalPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>[]
          }
          delete: {
            args: Prisma.ProfessionalPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>
          }
          update: {
            args: Prisma.ProfessionalPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfessionalPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>[]
          }
          upsert: {
            args: Prisma.ProfessionalPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPaymentPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalPayment>
          }
          groupBy: {
            args: Prisma.ProfessionalPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalPaymentCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
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
    user?: UserOmit
    customer?: CustomerOmit
    tempSubmission?: TempSubmissionOmit
    case?: CaseOmit
    uploadedFile?: UploadedFileOmit
    medicalProfessional?: MedicalProfessionalOmit
    professionalSession?: ProfessionalSessionOmit
    caseAssignment?: CaseAssignmentOmit
    aIAnalysis?: AIAnalysisOmit
    medicalOpinion?: MedicalOpinionOmit
    professionalPayment?: ProfessionalPaymentOmit
    admin?: AdminOmit
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
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    cases: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cases?: boolean | CustomerCountOutputTypeCountCasesArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
  }


  /**
   * Count Type CaseCountOutputType
   */

  export type CaseCountOutputType = {
    uploadedFiles: number
    caseAssignments: number
    aiAnalyses: number
    medicalOpinions: number
    professionalPayments: number
  }

  export type CaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedFiles?: boolean | CaseCountOutputTypeCountUploadedFilesArgs
    caseAssignments?: boolean | CaseCountOutputTypeCountCaseAssignmentsArgs
    aiAnalyses?: boolean | CaseCountOutputTypeCountAiAnalysesArgs
    medicalOpinions?: boolean | CaseCountOutputTypeCountMedicalOpinionsArgs
    professionalPayments?: boolean | CaseCountOutputTypeCountProfessionalPaymentsArgs
  }

  // Custom InputTypes
  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseCountOutputType
     */
    select?: CaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountUploadedFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedFileWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountCaseAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAssignmentWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountAiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountMedicalOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalOpinionWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountProfessionalPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalPaymentWhereInput
  }


  /**
   * Count Type MedicalProfessionalCountOutputType
   */

  export type MedicalProfessionalCountOutputType = {
    caseAssignments: number
    medicalOpinions: number
    professionalPayments: number
    professionalSessions: number
  }

  export type MedicalProfessionalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caseAssignments?: boolean | MedicalProfessionalCountOutputTypeCountCaseAssignmentsArgs
    medicalOpinions?: boolean | MedicalProfessionalCountOutputTypeCountMedicalOpinionsArgs
    professionalPayments?: boolean | MedicalProfessionalCountOutputTypeCountProfessionalPaymentsArgs
    professionalSessions?: boolean | MedicalProfessionalCountOutputTypeCountProfessionalSessionsArgs
  }

  // Custom InputTypes
  /**
   * MedicalProfessionalCountOutputType without action
   */
  export type MedicalProfessionalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessionalCountOutputType
     */
    select?: MedicalProfessionalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MedicalProfessionalCountOutputType without action
   */
  export type MedicalProfessionalCountOutputTypeCountCaseAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAssignmentWhereInput
  }

  /**
   * MedicalProfessionalCountOutputType without action
   */
  export type MedicalProfessionalCountOutputTypeCountMedicalOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalOpinionWhereInput
  }

  /**
   * MedicalProfessionalCountOutputType without action
   */
  export type MedicalProfessionalCountOutputTypeCountProfessionalPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalPaymentWhereInput
  }

  /**
   * MedicalProfessionalCountOutputType without action
   */
  export type MedicalProfessionalCountOutputTypeCountProfessionalSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    hashedPassword: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    hashedPassword: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
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
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | User$customerArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "hashedPassword" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | User$customerArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      hashedPassword: string
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
    customer<T extends User$customerArgs<ExtArgs> = {}>(args?: Subset<T, User$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * User.customer
   */
  export type User$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
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
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    email: string | null
    phone: string | null
    preferredChannel: $Enums.CommunicationChannel | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    email: string | null
    phone: string | null
    preferredChannel: $Enums.CommunicationChannel | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    firstName: number
    middleName: number
    lastName: number
    dateOfBirth: number
    email: number
    phone: number
    preferredChannel: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    preferredChannel?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    preferredChannel?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    preferredChannel?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    firstName: string
    middleName: string | null
    lastName: string
    dateOfBirth: Date
    email: string
    phone: string | null
    preferredChannel: $Enums.CommunicationChannel
    userId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    preferredChannel?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Customer$userArgs<ExtArgs>
    cases?: boolean | Customer$casesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    preferredChannel?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Customer$userArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    preferredChannel?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Customer$userArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    preferredChannel?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "middleName" | "lastName" | "dateOfBirth" | "email" | "phone" | "preferredChannel" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Customer$userArgs<ExtArgs>
    cases?: boolean | Customer$casesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Customer$userArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Customer$userArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      cases: Prisma.$CasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      middleName: string | null
      lastName: string
      dateOfBirth: Date
      email: string
      phone: string | null
      preferredChannel: $Enums.CommunicationChannel
      userId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
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
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Customer$userArgs<ExtArgs> = {}>(args?: Subset<T, Customer$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    cases<T extends Customer$casesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$casesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly firstName: FieldRef<"Customer", 'String'>
    readonly middleName: FieldRef<"Customer", 'String'>
    readonly lastName: FieldRef<"Customer", 'String'>
    readonly dateOfBirth: FieldRef<"Customer", 'DateTime'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly preferredChannel: FieldRef<"Customer", 'CommunicationChannel'>
    readonly userId: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.user
   */
  export type Customer$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Customer.cases
   */
  export type Customer$casesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    cursor?: CaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model TempSubmission
   */

  export type AggregateTempSubmission = {
    _count: TempSubmissionCountAggregateOutputType | null
    _min: TempSubmissionMinAggregateOutputType | null
    _max: TempSubmissionMaxAggregateOutputType | null
  }

  export type TempSubmissionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type TempSubmissionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type TempSubmissionCountAggregateOutputType = {
    id: number
    payload: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type TempSubmissionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    createdAt?: true
  }

  export type TempSubmissionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    createdAt?: true
  }

  export type TempSubmissionCountAggregateInputType = {
    id?: true
    payload?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type TempSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TempSubmission to aggregate.
     */
    where?: TempSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempSubmissions to fetch.
     */
    orderBy?: TempSubmissionOrderByWithRelationInput | TempSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TempSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TempSubmissions
    **/
    _count?: true | TempSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TempSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TempSubmissionMaxAggregateInputType
  }

  export type GetTempSubmissionAggregateType<T extends TempSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateTempSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTempSubmission[P]>
      : GetScalarType<T[P], AggregateTempSubmission[P]>
  }




  export type TempSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TempSubmissionWhereInput
    orderBy?: TempSubmissionOrderByWithAggregationInput | TempSubmissionOrderByWithAggregationInput[]
    by: TempSubmissionScalarFieldEnum[] | TempSubmissionScalarFieldEnum
    having?: TempSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TempSubmissionCountAggregateInputType | true
    _min?: TempSubmissionMinAggregateInputType
    _max?: TempSubmissionMaxAggregateInputType
  }

  export type TempSubmissionGroupByOutputType = {
    id: string
    payload: JsonValue
    expiresAt: Date
    createdAt: Date
    _count: TempSubmissionCountAggregateOutputType | null
    _min: TempSubmissionMinAggregateOutputType | null
    _max: TempSubmissionMaxAggregateOutputType | null
  }

  type GetTempSubmissionGroupByPayload<T extends TempSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TempSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TempSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TempSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], TempSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type TempSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tempSubmission"]>

  export type TempSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tempSubmission"]>

  export type TempSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tempSubmission"]>

  export type TempSubmissionSelectScalar = {
    id?: boolean
    payload?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type TempSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "payload" | "expiresAt" | "createdAt", ExtArgs["result"]["tempSubmission"]>

  export type $TempSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TempSubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      payload: Prisma.JsonValue
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["tempSubmission"]>
    composites: {}
  }

  type TempSubmissionGetPayload<S extends boolean | null | undefined | TempSubmissionDefaultArgs> = $Result.GetResult<Prisma.$TempSubmissionPayload, S>

  type TempSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TempSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TempSubmissionCountAggregateInputType | true
    }

  export interface TempSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TempSubmission'], meta: { name: 'TempSubmission' } }
    /**
     * Find zero or one TempSubmission that matches the filter.
     * @param {TempSubmissionFindUniqueArgs} args - Arguments to find a TempSubmission
     * @example
     * // Get one TempSubmission
     * const tempSubmission = await prisma.tempSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TempSubmissionFindUniqueArgs>(args: SelectSubset<T, TempSubmissionFindUniqueArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TempSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TempSubmissionFindUniqueOrThrowArgs} args - Arguments to find a TempSubmission
     * @example
     * // Get one TempSubmission
     * const tempSubmission = await prisma.tempSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TempSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, TempSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TempSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempSubmissionFindFirstArgs} args - Arguments to find a TempSubmission
     * @example
     * // Get one TempSubmission
     * const tempSubmission = await prisma.tempSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TempSubmissionFindFirstArgs>(args?: SelectSubset<T, TempSubmissionFindFirstArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TempSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempSubmissionFindFirstOrThrowArgs} args - Arguments to find a TempSubmission
     * @example
     * // Get one TempSubmission
     * const tempSubmission = await prisma.tempSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TempSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, TempSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TempSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TempSubmissions
     * const tempSubmissions = await prisma.tempSubmission.findMany()
     * 
     * // Get first 10 TempSubmissions
     * const tempSubmissions = await prisma.tempSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tempSubmissionWithIdOnly = await prisma.tempSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TempSubmissionFindManyArgs>(args?: SelectSubset<T, TempSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TempSubmission.
     * @param {TempSubmissionCreateArgs} args - Arguments to create a TempSubmission.
     * @example
     * // Create one TempSubmission
     * const TempSubmission = await prisma.tempSubmission.create({
     *   data: {
     *     // ... data to create a TempSubmission
     *   }
     * })
     * 
     */
    create<T extends TempSubmissionCreateArgs>(args: SelectSubset<T, TempSubmissionCreateArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TempSubmissions.
     * @param {TempSubmissionCreateManyArgs} args - Arguments to create many TempSubmissions.
     * @example
     * // Create many TempSubmissions
     * const tempSubmission = await prisma.tempSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TempSubmissionCreateManyArgs>(args?: SelectSubset<T, TempSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TempSubmissions and returns the data saved in the database.
     * @param {TempSubmissionCreateManyAndReturnArgs} args - Arguments to create many TempSubmissions.
     * @example
     * // Create many TempSubmissions
     * const tempSubmission = await prisma.tempSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TempSubmissions and only return the `id`
     * const tempSubmissionWithIdOnly = await prisma.tempSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TempSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, TempSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TempSubmission.
     * @param {TempSubmissionDeleteArgs} args - Arguments to delete one TempSubmission.
     * @example
     * // Delete one TempSubmission
     * const TempSubmission = await prisma.tempSubmission.delete({
     *   where: {
     *     // ... filter to delete one TempSubmission
     *   }
     * })
     * 
     */
    delete<T extends TempSubmissionDeleteArgs>(args: SelectSubset<T, TempSubmissionDeleteArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TempSubmission.
     * @param {TempSubmissionUpdateArgs} args - Arguments to update one TempSubmission.
     * @example
     * // Update one TempSubmission
     * const tempSubmission = await prisma.tempSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TempSubmissionUpdateArgs>(args: SelectSubset<T, TempSubmissionUpdateArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TempSubmissions.
     * @param {TempSubmissionDeleteManyArgs} args - Arguments to filter TempSubmissions to delete.
     * @example
     * // Delete a few TempSubmissions
     * const { count } = await prisma.tempSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TempSubmissionDeleteManyArgs>(args?: SelectSubset<T, TempSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TempSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TempSubmissions
     * const tempSubmission = await prisma.tempSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TempSubmissionUpdateManyArgs>(args: SelectSubset<T, TempSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TempSubmissions and returns the data updated in the database.
     * @param {TempSubmissionUpdateManyAndReturnArgs} args - Arguments to update many TempSubmissions.
     * @example
     * // Update many TempSubmissions
     * const tempSubmission = await prisma.tempSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TempSubmissions and only return the `id`
     * const tempSubmissionWithIdOnly = await prisma.tempSubmission.updateManyAndReturn({
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
    updateManyAndReturn<T extends TempSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, TempSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TempSubmission.
     * @param {TempSubmissionUpsertArgs} args - Arguments to update or create a TempSubmission.
     * @example
     * // Update or create a TempSubmission
     * const tempSubmission = await prisma.tempSubmission.upsert({
     *   create: {
     *     // ... data to create a TempSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TempSubmission we want to update
     *   }
     * })
     */
    upsert<T extends TempSubmissionUpsertArgs>(args: SelectSubset<T, TempSubmissionUpsertArgs<ExtArgs>>): Prisma__TempSubmissionClient<$Result.GetResult<Prisma.$TempSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TempSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempSubmissionCountArgs} args - Arguments to filter TempSubmissions to count.
     * @example
     * // Count the number of TempSubmissions
     * const count = await prisma.tempSubmission.count({
     *   where: {
     *     // ... the filter for the TempSubmissions we want to count
     *   }
     * })
    **/
    count<T extends TempSubmissionCountArgs>(
      args?: Subset<T, TempSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TempSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TempSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TempSubmissionAggregateArgs>(args: Subset<T, TempSubmissionAggregateArgs>): Prisma.PrismaPromise<GetTempSubmissionAggregateType<T>>

    /**
     * Group by TempSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempSubmissionGroupByArgs} args - Group by arguments.
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
      T extends TempSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TempSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: TempSubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TempSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTempSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TempSubmission model
   */
  readonly fields: TempSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TempSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TempSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TempSubmission model
   */
  interface TempSubmissionFieldRefs {
    readonly id: FieldRef<"TempSubmission", 'String'>
    readonly payload: FieldRef<"TempSubmission", 'Json'>
    readonly expiresAt: FieldRef<"TempSubmission", 'DateTime'>
    readonly createdAt: FieldRef<"TempSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TempSubmission findUnique
   */
  export type TempSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempSubmission to fetch.
     */
    where: TempSubmissionWhereUniqueInput
  }

  /**
   * TempSubmission findUniqueOrThrow
   */
  export type TempSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempSubmission to fetch.
     */
    where: TempSubmissionWhereUniqueInput
  }

  /**
   * TempSubmission findFirst
   */
  export type TempSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempSubmission to fetch.
     */
    where?: TempSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempSubmissions to fetch.
     */
    orderBy?: TempSubmissionOrderByWithRelationInput | TempSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TempSubmissions.
     */
    cursor?: TempSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TempSubmissions.
     */
    distinct?: TempSubmissionScalarFieldEnum | TempSubmissionScalarFieldEnum[]
  }

  /**
   * TempSubmission findFirstOrThrow
   */
  export type TempSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempSubmission to fetch.
     */
    where?: TempSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempSubmissions to fetch.
     */
    orderBy?: TempSubmissionOrderByWithRelationInput | TempSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TempSubmissions.
     */
    cursor?: TempSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TempSubmissions.
     */
    distinct?: TempSubmissionScalarFieldEnum | TempSubmissionScalarFieldEnum[]
  }

  /**
   * TempSubmission findMany
   */
  export type TempSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempSubmissions to fetch.
     */
    where?: TempSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempSubmissions to fetch.
     */
    orderBy?: TempSubmissionOrderByWithRelationInput | TempSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TempSubmissions.
     */
    cursor?: TempSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempSubmissions.
     */
    skip?: number
    distinct?: TempSubmissionScalarFieldEnum | TempSubmissionScalarFieldEnum[]
  }

  /**
   * TempSubmission create
   */
  export type TempSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to create a TempSubmission.
     */
    data: XOR<TempSubmissionCreateInput, TempSubmissionUncheckedCreateInput>
  }

  /**
   * TempSubmission createMany
   */
  export type TempSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TempSubmissions.
     */
    data: TempSubmissionCreateManyInput | TempSubmissionCreateManyInput[]
  }

  /**
   * TempSubmission createManyAndReturn
   */
  export type TempSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many TempSubmissions.
     */
    data: TempSubmissionCreateManyInput | TempSubmissionCreateManyInput[]
  }

  /**
   * TempSubmission update
   */
  export type TempSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to update a TempSubmission.
     */
    data: XOR<TempSubmissionUpdateInput, TempSubmissionUncheckedUpdateInput>
    /**
     * Choose, which TempSubmission to update.
     */
    where: TempSubmissionWhereUniqueInput
  }

  /**
   * TempSubmission updateMany
   */
  export type TempSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TempSubmissions.
     */
    data: XOR<TempSubmissionUpdateManyMutationInput, TempSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which TempSubmissions to update
     */
    where?: TempSubmissionWhereInput
    /**
     * Limit how many TempSubmissions to update.
     */
    limit?: number
  }

  /**
   * TempSubmission updateManyAndReturn
   */
  export type TempSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update TempSubmissions.
     */
    data: XOR<TempSubmissionUpdateManyMutationInput, TempSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which TempSubmissions to update
     */
    where?: TempSubmissionWhereInput
    /**
     * Limit how many TempSubmissions to update.
     */
    limit?: number
  }

  /**
   * TempSubmission upsert
   */
  export type TempSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * The filter to search for the TempSubmission to update in case it exists.
     */
    where: TempSubmissionWhereUniqueInput
    /**
     * In case the TempSubmission found by the `where` argument doesn't exist, create a new TempSubmission with this data.
     */
    create: XOR<TempSubmissionCreateInput, TempSubmissionUncheckedCreateInput>
    /**
     * In case the TempSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TempSubmissionUpdateInput, TempSubmissionUncheckedUpdateInput>
  }

  /**
   * TempSubmission delete
   */
  export type TempSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
    /**
     * Filter which TempSubmission to delete.
     */
    where: TempSubmissionWhereUniqueInput
  }

  /**
   * TempSubmission deleteMany
   */
  export type TempSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TempSubmissions to delete
     */
    where?: TempSubmissionWhereInput
    /**
     * Limit how many TempSubmissions to delete.
     */
    limit?: number
  }

  /**
   * TempSubmission without action
   */
  export type TempSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempSubmission
     */
    select?: TempSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempSubmission
     */
    omit?: TempSubmissionOmit<ExtArgs> | null
  }


  /**
   * Model Case
   */

  export type AggregateCase = {
    _count: CaseCountAggregateOutputType | null
    _min: CaseMinAggregateOutputType | null
    _max: CaseMaxAggregateOutputType | null
  }

  export type CaseMinAggregateOutputType = {
    id: string | null
    caseNumber: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    email: string | null
    phone: string | null
    ethnicity: string | null
    gender: string | null
    diseaseType: string | null
    isFirstOccurrence: boolean | null
    geneticFamilyHistory: string | null
    paymentId: string | null
    consentAccepted: boolean | null
    customerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseMaxAggregateOutputType = {
    id: string | null
    caseNumber: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    email: string | null
    phone: string | null
    ethnicity: string | null
    gender: string | null
    diseaseType: string | null
    isFirstOccurrence: boolean | null
    geneticFamilyHistory: string | null
    paymentId: string | null
    consentAccepted: boolean | null
    customerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseCountAggregateOutputType = {
    id: number
    caseNumber: number
    firstName: number
    middleName: number
    lastName: number
    dateOfBirth: number
    email: number
    phone: number
    ethnicity: number
    gender: number
    diseaseType: number
    isFirstOccurrence: number
    geneticFamilyHistory: number
    paymentId: number
    consentAccepted: number
    customerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseMinAggregateInputType = {
    id?: true
    caseNumber?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    ethnicity?: true
    gender?: true
    diseaseType?: true
    isFirstOccurrence?: true
    geneticFamilyHistory?: true
    paymentId?: true
    consentAccepted?: true
    customerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseMaxAggregateInputType = {
    id?: true
    caseNumber?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    ethnicity?: true
    gender?: true
    diseaseType?: true
    isFirstOccurrence?: true
    geneticFamilyHistory?: true
    paymentId?: true
    consentAccepted?: true
    customerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseCountAggregateInputType = {
    id?: true
    caseNumber?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    ethnicity?: true
    gender?: true
    diseaseType?: true
    isFirstOccurrence?: true
    geneticFamilyHistory?: true
    paymentId?: true
    consentAccepted?: true
    customerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Case to aggregate.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cases
    **/
    _count?: true | CaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseMaxAggregateInputType
  }

  export type GetCaseAggregateType<T extends CaseAggregateArgs> = {
        [P in keyof T & keyof AggregateCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCase[P]>
      : GetScalarType<T[P], AggregateCase[P]>
  }




  export type CaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseWhereInput
    orderBy?: CaseOrderByWithAggregationInput | CaseOrderByWithAggregationInput[]
    by: CaseScalarFieldEnum[] | CaseScalarFieldEnum
    having?: CaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseCountAggregateInputType | true
    _min?: CaseMinAggregateInputType
    _max?: CaseMaxAggregateInputType
  }

  export type CaseGroupByOutputType = {
    id: string
    caseNumber: string
    firstName: string
    middleName: string | null
    lastName: string
    dateOfBirth: Date
    email: string
    phone: string | null
    ethnicity: string | null
    gender: string | null
    diseaseType: string | null
    isFirstOccurrence: boolean | null
    geneticFamilyHistory: string | null
    paymentId: string | null
    consentAccepted: boolean
    customerId: string
    createdAt: Date
    updatedAt: Date
    _count: CaseCountAggregateOutputType | null
    _min: CaseMinAggregateOutputType | null
    _max: CaseMaxAggregateOutputType | null
  }

  type GetCaseGroupByPayload<T extends CaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseGroupByOutputType[P]>
            : GetScalarType<T[P], CaseGroupByOutputType[P]>
        }
      >
    >


  export type CaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    ethnicity?: boolean
    gender?: boolean
    diseaseType?: boolean
    isFirstOccurrence?: boolean
    geneticFamilyHistory?: boolean
    paymentId?: boolean
    consentAccepted?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    uploadedFiles?: boolean | Case$uploadedFilesArgs<ExtArgs>
    caseAssignments?: boolean | Case$caseAssignmentsArgs<ExtArgs>
    aiAnalyses?: boolean | Case$aiAnalysesArgs<ExtArgs>
    medicalOpinions?: boolean | Case$medicalOpinionsArgs<ExtArgs>
    professionalPayments?: boolean | Case$professionalPaymentsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    ethnicity?: boolean
    gender?: boolean
    diseaseType?: boolean
    isFirstOccurrence?: boolean
    geneticFamilyHistory?: boolean
    paymentId?: boolean
    consentAccepted?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    ethnicity?: boolean
    gender?: boolean
    diseaseType?: boolean
    isFirstOccurrence?: boolean
    geneticFamilyHistory?: boolean
    paymentId?: boolean
    consentAccepted?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectScalar = {
    id?: boolean
    caseNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    ethnicity?: boolean
    gender?: boolean
    diseaseType?: boolean
    isFirstOccurrence?: boolean
    geneticFamilyHistory?: boolean
    paymentId?: boolean
    consentAccepted?: boolean
    customerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseNumber" | "firstName" | "middleName" | "lastName" | "dateOfBirth" | "email" | "phone" | "ethnicity" | "gender" | "diseaseType" | "isFirstOccurrence" | "geneticFamilyHistory" | "paymentId" | "consentAccepted" | "customerId" | "createdAt" | "updatedAt", ExtArgs["result"]["case"]>
  export type CaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    uploadedFiles?: boolean | Case$uploadedFilesArgs<ExtArgs>
    caseAssignments?: boolean | Case$caseAssignmentsArgs<ExtArgs>
    aiAnalyses?: boolean | Case$aiAnalysesArgs<ExtArgs>
    medicalOpinions?: boolean | Case$medicalOpinionsArgs<ExtArgs>
    professionalPayments?: boolean | Case$professionalPaymentsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type CaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $CasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Case"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      uploadedFiles: Prisma.$UploadedFilePayload<ExtArgs>[]
      caseAssignments: Prisma.$CaseAssignmentPayload<ExtArgs>[]
      aiAnalyses: Prisma.$AIAnalysisPayload<ExtArgs>[]
      medicalOpinions: Prisma.$MedicalOpinionPayload<ExtArgs>[]
      professionalPayments: Prisma.$ProfessionalPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseNumber: string
      firstName: string
      middleName: string | null
      lastName: string
      dateOfBirth: Date
      email: string
      phone: string | null
      ethnicity: string | null
      gender: string | null
      diseaseType: string | null
      isFirstOccurrence: boolean | null
      geneticFamilyHistory: string | null
      paymentId: string | null
      consentAccepted: boolean
      customerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["case"]>
    composites: {}
  }

  type CaseGetPayload<S extends boolean | null | undefined | CaseDefaultArgs> = $Result.GetResult<Prisma.$CasePayload, S>

  type CaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseCountAggregateInputType | true
    }

  export interface CaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Case'], meta: { name: 'Case' } }
    /**
     * Find zero or one Case that matches the filter.
     * @param {CaseFindUniqueArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseFindUniqueArgs>(args: SelectSubset<T, CaseFindUniqueArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Case that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseFindUniqueOrThrowArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Case that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindFirstArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseFindFirstArgs>(args?: SelectSubset<T, CaseFindFirstArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Case that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindFirstOrThrowArgs} args - Arguments to find a Case
     * @example
     * // Get one Case
     * const case = await prisma.case.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cases
     * const cases = await prisma.case.findMany()
     * 
     * // Get first 10 Cases
     * const cases = await prisma.case.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseWithIdOnly = await prisma.case.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseFindManyArgs>(args?: SelectSubset<T, CaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Case.
     * @param {CaseCreateArgs} args - Arguments to create a Case.
     * @example
     * // Create one Case
     * const Case = await prisma.case.create({
     *   data: {
     *     // ... data to create a Case
     *   }
     * })
     * 
     */
    create<T extends CaseCreateArgs>(args: SelectSubset<T, CaseCreateArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cases.
     * @param {CaseCreateManyArgs} args - Arguments to create many Cases.
     * @example
     * // Create many Cases
     * const case = await prisma.case.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseCreateManyArgs>(args?: SelectSubset<T, CaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cases and returns the data saved in the database.
     * @param {CaseCreateManyAndReturnArgs} args - Arguments to create many Cases.
     * @example
     * // Create many Cases
     * const case = await prisma.case.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cases and only return the `id`
     * const caseWithIdOnly = await prisma.case.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Case.
     * @param {CaseDeleteArgs} args - Arguments to delete one Case.
     * @example
     * // Delete one Case
     * const Case = await prisma.case.delete({
     *   where: {
     *     // ... filter to delete one Case
     *   }
     * })
     * 
     */
    delete<T extends CaseDeleteArgs>(args: SelectSubset<T, CaseDeleteArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Case.
     * @param {CaseUpdateArgs} args - Arguments to update one Case.
     * @example
     * // Update one Case
     * const case = await prisma.case.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseUpdateArgs>(args: SelectSubset<T, CaseUpdateArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cases.
     * @param {CaseDeleteManyArgs} args - Arguments to filter Cases to delete.
     * @example
     * // Delete a few Cases
     * const { count } = await prisma.case.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseDeleteManyArgs>(args?: SelectSubset<T, CaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cases
     * const case = await prisma.case.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseUpdateManyArgs>(args: SelectSubset<T, CaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cases and returns the data updated in the database.
     * @param {CaseUpdateManyAndReturnArgs} args - Arguments to update many Cases.
     * @example
     * // Update many Cases
     * const case = await prisma.case.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cases and only return the `id`
     * const caseWithIdOnly = await prisma.case.updateManyAndReturn({
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
    updateManyAndReturn<T extends CaseUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Case.
     * @param {CaseUpsertArgs} args - Arguments to update or create a Case.
     * @example
     * // Update or create a Case
     * const case = await prisma.case.upsert({
     *   create: {
     *     // ... data to create a Case
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Case we want to update
     *   }
     * })
     */
    upsert<T extends CaseUpsertArgs>(args: SelectSubset<T, CaseUpsertArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseCountArgs} args - Arguments to filter Cases to count.
     * @example
     * // Count the number of Cases
     * const count = await prisma.case.count({
     *   where: {
     *     // ... the filter for the Cases we want to count
     *   }
     * })
    **/
    count<T extends CaseCountArgs>(
      args?: Subset<T, CaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Case.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CaseAggregateArgs>(args: Subset<T, CaseAggregateArgs>): Prisma.PrismaPromise<GetCaseAggregateType<T>>

    /**
     * Group by Case.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseGroupByArgs} args - Group by arguments.
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
      T extends CaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseGroupByArgs['orderBy'] }
        : { orderBy?: CaseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Case model
   */
  readonly fields: CaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Case.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    uploadedFiles<T extends Case$uploadedFilesArgs<ExtArgs> = {}>(args?: Subset<T, Case$uploadedFilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    caseAssignments<T extends Case$caseAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Case$caseAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiAnalyses<T extends Case$aiAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, Case$aiAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalOpinions<T extends Case$medicalOpinionsArgs<ExtArgs> = {}>(args?: Subset<T, Case$medicalOpinionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    professionalPayments<T extends Case$professionalPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, Case$professionalPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Case model
   */
  interface CaseFieldRefs {
    readonly id: FieldRef<"Case", 'String'>
    readonly caseNumber: FieldRef<"Case", 'String'>
    readonly firstName: FieldRef<"Case", 'String'>
    readonly middleName: FieldRef<"Case", 'String'>
    readonly lastName: FieldRef<"Case", 'String'>
    readonly dateOfBirth: FieldRef<"Case", 'DateTime'>
    readonly email: FieldRef<"Case", 'String'>
    readonly phone: FieldRef<"Case", 'String'>
    readonly ethnicity: FieldRef<"Case", 'String'>
    readonly gender: FieldRef<"Case", 'String'>
    readonly diseaseType: FieldRef<"Case", 'String'>
    readonly isFirstOccurrence: FieldRef<"Case", 'Boolean'>
    readonly geneticFamilyHistory: FieldRef<"Case", 'String'>
    readonly paymentId: FieldRef<"Case", 'String'>
    readonly consentAccepted: FieldRef<"Case", 'Boolean'>
    readonly customerId: FieldRef<"Case", 'String'>
    readonly createdAt: FieldRef<"Case", 'DateTime'>
    readonly updatedAt: FieldRef<"Case", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Case findUnique
   */
  export type CaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case findUniqueOrThrow
   */
  export type CaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case findFirst
   */
  export type CaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cases.
     */
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case findFirstOrThrow
   */
  export type CaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Case to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cases.
     */
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case findMany
   */
  export type CaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter, which Cases to fetch.
     */
    where?: CaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cases to fetch.
     */
    orderBy?: CaseOrderByWithRelationInput | CaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cases.
     */
    cursor?: CaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cases.
     */
    skip?: number
    distinct?: CaseScalarFieldEnum | CaseScalarFieldEnum[]
  }

  /**
   * Case create
   */
  export type CaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Case.
     */
    data: XOR<CaseCreateInput, CaseUncheckedCreateInput>
  }

  /**
   * Case createMany
   */
  export type CaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cases.
     */
    data: CaseCreateManyInput | CaseCreateManyInput[]
  }

  /**
   * Case createManyAndReturn
   */
  export type CaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * The data used to create many Cases.
     */
    data: CaseCreateManyInput | CaseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Case update
   */
  export type CaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Case.
     */
    data: XOR<CaseUpdateInput, CaseUncheckedUpdateInput>
    /**
     * Choose, which Case to update.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case updateMany
   */
  export type CaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cases.
     */
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyInput>
    /**
     * Filter which Cases to update
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to update.
     */
    limit?: number
  }

  /**
   * Case updateManyAndReturn
   */
  export type CaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * The data used to update Cases.
     */
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyInput>
    /**
     * Filter which Cases to update
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Case upsert
   */
  export type CaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Case to update in case it exists.
     */
    where: CaseWhereUniqueInput
    /**
     * In case the Case found by the `where` argument doesn't exist, create a new Case with this data.
     */
    create: XOR<CaseCreateInput, CaseUncheckedCreateInput>
    /**
     * In case the Case was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseUpdateInput, CaseUncheckedUpdateInput>
  }

  /**
   * Case delete
   */
  export type CaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
    /**
     * Filter which Case to delete.
     */
    where: CaseWhereUniqueInput
  }

  /**
   * Case deleteMany
   */
  export type CaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cases to delete
     */
    where?: CaseWhereInput
    /**
     * Limit how many Cases to delete.
     */
    limit?: number
  }

  /**
   * Case.uploadedFiles
   */
  export type Case$uploadedFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    where?: UploadedFileWhereInput
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    cursor?: UploadedFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * Case.caseAssignments
   */
  export type Case$caseAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    where?: CaseAssignmentWhereInput
    orderBy?: CaseAssignmentOrderByWithRelationInput | CaseAssignmentOrderByWithRelationInput[]
    cursor?: CaseAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseAssignmentScalarFieldEnum | CaseAssignmentScalarFieldEnum[]
  }

  /**
   * Case.aiAnalyses
   */
  export type Case$aiAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    cursor?: AIAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * Case.medicalOpinions
   */
  export type Case$medicalOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    where?: MedicalOpinionWhereInput
    orderBy?: MedicalOpinionOrderByWithRelationInput | MedicalOpinionOrderByWithRelationInput[]
    cursor?: MedicalOpinionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicalOpinionScalarFieldEnum | MedicalOpinionScalarFieldEnum[]
  }

  /**
   * Case.professionalPayments
   */
  export type Case$professionalPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    where?: ProfessionalPaymentWhereInput
    orderBy?: ProfessionalPaymentOrderByWithRelationInput | ProfessionalPaymentOrderByWithRelationInput[]
    cursor?: ProfessionalPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalPaymentScalarFieldEnum | ProfessionalPaymentScalarFieldEnum[]
  }

  /**
   * Case without action
   */
  export type CaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Case
     */
    select?: CaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Case
     */
    omit?: CaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseInclude<ExtArgs> | null
  }


  /**
   * Model UploadedFile
   */

  export type AggregateUploadedFile = {
    _count: UploadedFileCountAggregateOutputType | null
    _avg: UploadedFileAvgAggregateOutputType | null
    _sum: UploadedFileSumAggregateOutputType | null
    _min: UploadedFileMinAggregateOutputType | null
    _max: UploadedFileMaxAggregateOutputType | null
  }

  export type UploadedFileAvgAggregateOutputType = {
    size: number | null
  }

  export type UploadedFileSumAggregateOutputType = {
    size: number | null
  }

  export type UploadedFileMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    filename: string | null
    s3Key: string | null
    mimetype: string | null
    size: number | null
    category: string | null
    createdAt: Date | null
  }

  export type UploadedFileMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    filename: string | null
    s3Key: string | null
    mimetype: string | null
    size: number | null
    category: string | null
    createdAt: Date | null
  }

  export type UploadedFileCountAggregateOutputType = {
    id: number
    caseId: number
    filename: number
    s3Key: number
    mimetype: number
    size: number
    category: number
    createdAt: number
    _all: number
  }


  export type UploadedFileAvgAggregateInputType = {
    size?: true
  }

  export type UploadedFileSumAggregateInputType = {
    size?: true
  }

  export type UploadedFileMinAggregateInputType = {
    id?: true
    caseId?: true
    filename?: true
    s3Key?: true
    mimetype?: true
    size?: true
    category?: true
    createdAt?: true
  }

  export type UploadedFileMaxAggregateInputType = {
    id?: true
    caseId?: true
    filename?: true
    s3Key?: true
    mimetype?: true
    size?: true
    category?: true
    createdAt?: true
  }

  export type UploadedFileCountAggregateInputType = {
    id?: true
    caseId?: true
    filename?: true
    s3Key?: true
    mimetype?: true
    size?: true
    category?: true
    createdAt?: true
    _all?: true
  }

  export type UploadedFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedFile to aggregate.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadedFiles
    **/
    _count?: true | UploadedFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UploadedFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UploadedFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadedFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadedFileMaxAggregateInputType
  }

  export type GetUploadedFileAggregateType<T extends UploadedFileAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadedFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadedFile[P]>
      : GetScalarType<T[P], AggregateUploadedFile[P]>
  }




  export type UploadedFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedFileWhereInput
    orderBy?: UploadedFileOrderByWithAggregationInput | UploadedFileOrderByWithAggregationInput[]
    by: UploadedFileScalarFieldEnum[] | UploadedFileScalarFieldEnum
    having?: UploadedFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadedFileCountAggregateInputType | true
    _avg?: UploadedFileAvgAggregateInputType
    _sum?: UploadedFileSumAggregateInputType
    _min?: UploadedFileMinAggregateInputType
    _max?: UploadedFileMaxAggregateInputType
  }

  export type UploadedFileGroupByOutputType = {
    id: string
    caseId: string
    filename: string
    s3Key: string
    mimetype: string
    size: number
    category: string
    createdAt: Date
    _count: UploadedFileCountAggregateOutputType | null
    _avg: UploadedFileAvgAggregateOutputType | null
    _sum: UploadedFileSumAggregateOutputType | null
    _min: UploadedFileMinAggregateOutputType | null
    _max: UploadedFileMaxAggregateOutputType | null
  }

  type GetUploadedFileGroupByPayload<T extends UploadedFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadedFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadedFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadedFileGroupByOutputType[P]>
            : GetScalarType<T[P], UploadedFileGroupByOutputType[P]>
        }
      >
    >


  export type UploadedFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    filename?: boolean
    s3Key?: boolean
    mimetype?: boolean
    size?: boolean
    category?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    filename?: boolean
    s3Key?: boolean
    mimetype?: boolean
    size?: boolean
    category?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    filename?: boolean
    s3Key?: boolean
    mimetype?: boolean
    size?: boolean
    category?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectScalar = {
    id?: boolean
    caseId?: boolean
    filename?: boolean
    s3Key?: boolean
    mimetype?: boolean
    size?: boolean
    category?: boolean
    createdAt?: boolean
  }

  export type UploadedFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "filename" | "s3Key" | "mimetype" | "size" | "category" | "createdAt", ExtArgs["result"]["uploadedFile"]>
  export type UploadedFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type UploadedFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type UploadedFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $UploadedFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadedFile"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      filename: string
      s3Key: string
      mimetype: string
      size: number
      category: string
      createdAt: Date
    }, ExtArgs["result"]["uploadedFile"]>
    composites: {}
  }

  type UploadedFileGetPayload<S extends boolean | null | undefined | UploadedFileDefaultArgs> = $Result.GetResult<Prisma.$UploadedFilePayload, S>

  type UploadedFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadedFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadedFileCountAggregateInputType | true
    }

  export interface UploadedFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadedFile'], meta: { name: 'UploadedFile' } }
    /**
     * Find zero or one UploadedFile that matches the filter.
     * @param {UploadedFileFindUniqueArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadedFileFindUniqueArgs>(args: SelectSubset<T, UploadedFileFindUniqueArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadedFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadedFileFindUniqueOrThrowArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadedFileFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadedFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileFindFirstArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadedFileFindFirstArgs>(args?: SelectSubset<T, UploadedFileFindFirstArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileFindFirstOrThrowArgs} args - Arguments to find a UploadedFile
     * @example
     * // Get one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadedFileFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadedFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadedFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadedFiles
     * const uploadedFiles = await prisma.uploadedFile.findMany()
     * 
     * // Get first 10 UploadedFiles
     * const uploadedFiles = await prisma.uploadedFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadedFileWithIdOnly = await prisma.uploadedFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadedFileFindManyArgs>(args?: SelectSubset<T, UploadedFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadedFile.
     * @param {UploadedFileCreateArgs} args - Arguments to create a UploadedFile.
     * @example
     * // Create one UploadedFile
     * const UploadedFile = await prisma.uploadedFile.create({
     *   data: {
     *     // ... data to create a UploadedFile
     *   }
     * })
     * 
     */
    create<T extends UploadedFileCreateArgs>(args: SelectSubset<T, UploadedFileCreateArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadedFiles.
     * @param {UploadedFileCreateManyArgs} args - Arguments to create many UploadedFiles.
     * @example
     * // Create many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadedFileCreateManyArgs>(args?: SelectSubset<T, UploadedFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadedFiles and returns the data saved in the database.
     * @param {UploadedFileCreateManyAndReturnArgs} args - Arguments to create many UploadedFiles.
     * @example
     * // Create many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadedFiles and only return the `id`
     * const uploadedFileWithIdOnly = await prisma.uploadedFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadedFileCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadedFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UploadedFile.
     * @param {UploadedFileDeleteArgs} args - Arguments to delete one UploadedFile.
     * @example
     * // Delete one UploadedFile
     * const UploadedFile = await prisma.uploadedFile.delete({
     *   where: {
     *     // ... filter to delete one UploadedFile
     *   }
     * })
     * 
     */
    delete<T extends UploadedFileDeleteArgs>(args: SelectSubset<T, UploadedFileDeleteArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadedFile.
     * @param {UploadedFileUpdateArgs} args - Arguments to update one UploadedFile.
     * @example
     * // Update one UploadedFile
     * const uploadedFile = await prisma.uploadedFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadedFileUpdateArgs>(args: SelectSubset<T, UploadedFileUpdateArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadedFiles.
     * @param {UploadedFileDeleteManyArgs} args - Arguments to filter UploadedFiles to delete.
     * @example
     * // Delete a few UploadedFiles
     * const { count } = await prisma.uploadedFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadedFileDeleteManyArgs>(args?: SelectSubset<T, UploadedFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadedFileUpdateManyArgs>(args: SelectSubset<T, UploadedFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedFiles and returns the data updated in the database.
     * @param {UploadedFileUpdateManyAndReturnArgs} args - Arguments to update many UploadedFiles.
     * @example
     * // Update many UploadedFiles
     * const uploadedFile = await prisma.uploadedFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadedFiles and only return the `id`
     * const uploadedFileWithIdOnly = await prisma.uploadedFile.updateManyAndReturn({
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
    updateManyAndReturn<T extends UploadedFileUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadedFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UploadedFile.
     * @param {UploadedFileUpsertArgs} args - Arguments to update or create a UploadedFile.
     * @example
     * // Update or create a UploadedFile
     * const uploadedFile = await prisma.uploadedFile.upsert({
     *   create: {
     *     // ... data to create a UploadedFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadedFile we want to update
     *   }
     * })
     */
    upsert<T extends UploadedFileUpsertArgs>(args: SelectSubset<T, UploadedFileUpsertArgs<ExtArgs>>): Prisma__UploadedFileClient<$Result.GetResult<Prisma.$UploadedFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadedFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileCountArgs} args - Arguments to filter UploadedFiles to count.
     * @example
     * // Count the number of UploadedFiles
     * const count = await prisma.uploadedFile.count({
     *   where: {
     *     // ... the filter for the UploadedFiles we want to count
     *   }
     * })
    **/
    count<T extends UploadedFileCountArgs>(
      args?: Subset<T, UploadedFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadedFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadedFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UploadedFileAggregateArgs>(args: Subset<T, UploadedFileAggregateArgs>): Prisma.PrismaPromise<GetUploadedFileAggregateType<T>>

    /**
     * Group by UploadedFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedFileGroupByArgs} args - Group by arguments.
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
      T extends UploadedFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadedFileGroupByArgs['orderBy'] }
        : { orderBy?: UploadedFileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UploadedFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadedFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadedFile model
   */
  readonly fields: UploadedFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadedFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadedFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UploadedFile model
   */
  interface UploadedFileFieldRefs {
    readonly id: FieldRef<"UploadedFile", 'String'>
    readonly caseId: FieldRef<"UploadedFile", 'String'>
    readonly filename: FieldRef<"UploadedFile", 'String'>
    readonly s3Key: FieldRef<"UploadedFile", 'String'>
    readonly mimetype: FieldRef<"UploadedFile", 'String'>
    readonly size: FieldRef<"UploadedFile", 'Int'>
    readonly category: FieldRef<"UploadedFile", 'String'>
    readonly createdAt: FieldRef<"UploadedFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UploadedFile findUnique
   */
  export type UploadedFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile findUniqueOrThrow
   */
  export type UploadedFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile findFirst
   */
  export type UploadedFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedFiles.
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedFiles.
     */
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * UploadedFile findFirstOrThrow
   */
  export type UploadedFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFile to fetch.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedFiles.
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedFiles.
     */
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * UploadedFile findMany
   */
  export type UploadedFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter, which UploadedFiles to fetch.
     */
    where?: UploadedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedFiles to fetch.
     */
    orderBy?: UploadedFileOrderByWithRelationInput | UploadedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadedFiles.
     */
    cursor?: UploadedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedFiles.
     */
    skip?: number
    distinct?: UploadedFileScalarFieldEnum | UploadedFileScalarFieldEnum[]
  }

  /**
   * UploadedFile create
   */
  export type UploadedFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadedFile.
     */
    data: XOR<UploadedFileCreateInput, UploadedFileUncheckedCreateInput>
  }

  /**
   * UploadedFile createMany
   */
  export type UploadedFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadedFiles.
     */
    data: UploadedFileCreateManyInput | UploadedFileCreateManyInput[]
  }

  /**
   * UploadedFile createManyAndReturn
   */
  export type UploadedFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * The data used to create many UploadedFiles.
     */
    data: UploadedFileCreateManyInput | UploadedFileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedFile update
   */
  export type UploadedFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadedFile.
     */
    data: XOR<UploadedFileUpdateInput, UploadedFileUncheckedUpdateInput>
    /**
     * Choose, which UploadedFile to update.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile updateMany
   */
  export type UploadedFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadedFiles.
     */
    data: XOR<UploadedFileUpdateManyMutationInput, UploadedFileUncheckedUpdateManyInput>
    /**
     * Filter which UploadedFiles to update
     */
    where?: UploadedFileWhereInput
    /**
     * Limit how many UploadedFiles to update.
     */
    limit?: number
  }

  /**
   * UploadedFile updateManyAndReturn
   */
  export type UploadedFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * The data used to update UploadedFiles.
     */
    data: XOR<UploadedFileUpdateManyMutationInput, UploadedFileUncheckedUpdateManyInput>
    /**
     * Filter which UploadedFiles to update
     */
    where?: UploadedFileWhereInput
    /**
     * Limit how many UploadedFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedFile upsert
   */
  export type UploadedFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadedFile to update in case it exists.
     */
    where: UploadedFileWhereUniqueInput
    /**
     * In case the UploadedFile found by the `where` argument doesn't exist, create a new UploadedFile with this data.
     */
    create: XOR<UploadedFileCreateInput, UploadedFileUncheckedCreateInput>
    /**
     * In case the UploadedFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadedFileUpdateInput, UploadedFileUncheckedUpdateInput>
  }

  /**
   * UploadedFile delete
   */
  export type UploadedFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
    /**
     * Filter which UploadedFile to delete.
     */
    where: UploadedFileWhereUniqueInput
  }

  /**
   * UploadedFile deleteMany
   */
  export type UploadedFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedFiles to delete
     */
    where?: UploadedFileWhereInput
    /**
     * Limit how many UploadedFiles to delete.
     */
    limit?: number
  }

  /**
   * UploadedFile without action
   */
  export type UploadedFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedFile
     */
    select?: UploadedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedFile
     */
    omit?: UploadedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedFileInclude<ExtArgs> | null
  }


  /**
   * Model MedicalProfessional
   */

  export type AggregateMedicalProfessional = {
    _count: MedicalProfessionalCountAggregateOutputType | null
    _avg: MedicalProfessionalAvgAggregateOutputType | null
    _sum: MedicalProfessionalSumAggregateOutputType | null
    _min: MedicalProfessionalMinAggregateOutputType | null
    _max: MedicalProfessionalMaxAggregateOutputType | null
  }

  export type MedicalProfessionalAvgAggregateOutputType = {
    yearsPractice: number | null
    publications: number | null
    score: number | null
    billingRate: number | null
  }

  export type MedicalProfessionalSumAggregateOutputType = {
    yearsPractice: number | null
    publications: number | null
    score: number | null
    billingRate: number | null
  }

  export type MedicalProfessionalMinAggregateOutputType = {
    id: string | null
    proNumber: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dob: Date | null
    email: string | null
    phone: string | null
    nationality: string | null
    licenseNumber: string | null
    licenseCountry: string | null
    licenseExpiry: Date | null
    vetted: boolean | null
    level: $Enums.ProLevel | null
    cvUrl: string | null
    subspecialties: string | null
    yearsPractice: number | null
    publications: number | null
    trialInvolved: boolean | null
    leadership: string | null
    societyMemberships: string | null
    score: number | null
    hashedPassword: string | null
    twoFactorMethod: $Enums.TwoFactorMethod | null
    twoFactorSecret: string | null
    profileLastUpdated: Date | null
    codeOfConductAcknowledged: Date | null
    address: string | null
    billingAddress: string | null
    vatNumber: string | null
    billingRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalProfessionalMaxAggregateOutputType = {
    id: string | null
    proNumber: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dob: Date | null
    email: string | null
    phone: string | null
    nationality: string | null
    licenseNumber: string | null
    licenseCountry: string | null
    licenseExpiry: Date | null
    vetted: boolean | null
    level: $Enums.ProLevel | null
    cvUrl: string | null
    subspecialties: string | null
    yearsPractice: number | null
    publications: number | null
    trialInvolved: boolean | null
    leadership: string | null
    societyMemberships: string | null
    score: number | null
    hashedPassword: string | null
    twoFactorMethod: $Enums.TwoFactorMethod | null
    twoFactorSecret: string | null
    profileLastUpdated: Date | null
    codeOfConductAcknowledged: Date | null
    address: string | null
    billingAddress: string | null
    vatNumber: string | null
    billingRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalProfessionalCountAggregateOutputType = {
    id: number
    proNumber: number
    firstName: number
    middleName: number
    lastName: number
    dob: number
    email: number
    phone: number
    nationality: number
    licenseNumber: number
    licenseCountry: number
    licenseExpiry: number
    vetted: number
    level: number
    cvUrl: number
    documents: number
    subspecialties: number
    yearsPractice: number
    publications: number
    trialInvolved: number
    leadership: number
    societyMemberships: number
    score: number
    hashedPassword: number
    twoFactorMethod: number
    twoFactorSecret: number
    profileLastUpdated: number
    codeOfConductAcknowledged: number
    address: number
    billingAddress: number
    bankDetails: number
    vatNumber: number
    billingRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MedicalProfessionalAvgAggregateInputType = {
    yearsPractice?: true
    publications?: true
    score?: true
    billingRate?: true
  }

  export type MedicalProfessionalSumAggregateInputType = {
    yearsPractice?: true
    publications?: true
    score?: true
    billingRate?: true
  }

  export type MedicalProfessionalMinAggregateInputType = {
    id?: true
    proNumber?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    email?: true
    phone?: true
    nationality?: true
    licenseNumber?: true
    licenseCountry?: true
    licenseExpiry?: true
    vetted?: true
    level?: true
    cvUrl?: true
    subspecialties?: true
    yearsPractice?: true
    publications?: true
    trialInvolved?: true
    leadership?: true
    societyMemberships?: true
    score?: true
    hashedPassword?: true
    twoFactorMethod?: true
    twoFactorSecret?: true
    profileLastUpdated?: true
    codeOfConductAcknowledged?: true
    address?: true
    billingAddress?: true
    vatNumber?: true
    billingRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicalProfessionalMaxAggregateInputType = {
    id?: true
    proNumber?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    email?: true
    phone?: true
    nationality?: true
    licenseNumber?: true
    licenseCountry?: true
    licenseExpiry?: true
    vetted?: true
    level?: true
    cvUrl?: true
    subspecialties?: true
    yearsPractice?: true
    publications?: true
    trialInvolved?: true
    leadership?: true
    societyMemberships?: true
    score?: true
    hashedPassword?: true
    twoFactorMethod?: true
    twoFactorSecret?: true
    profileLastUpdated?: true
    codeOfConductAcknowledged?: true
    address?: true
    billingAddress?: true
    vatNumber?: true
    billingRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicalProfessionalCountAggregateInputType = {
    id?: true
    proNumber?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dob?: true
    email?: true
    phone?: true
    nationality?: true
    licenseNumber?: true
    licenseCountry?: true
    licenseExpiry?: true
    vetted?: true
    level?: true
    cvUrl?: true
    documents?: true
    subspecialties?: true
    yearsPractice?: true
    publications?: true
    trialInvolved?: true
    leadership?: true
    societyMemberships?: true
    score?: true
    hashedPassword?: true
    twoFactorMethod?: true
    twoFactorSecret?: true
    profileLastUpdated?: true
    codeOfConductAcknowledged?: true
    address?: true
    billingAddress?: true
    bankDetails?: true
    vatNumber?: true
    billingRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MedicalProfessionalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalProfessional to aggregate.
     */
    where?: MedicalProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalProfessionals to fetch.
     */
    orderBy?: MedicalProfessionalOrderByWithRelationInput | MedicalProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalProfessionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalProfessionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalProfessionals
    **/
    _count?: true | MedicalProfessionalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicalProfessionalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicalProfessionalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalProfessionalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalProfessionalMaxAggregateInputType
  }

  export type GetMedicalProfessionalAggregateType<T extends MedicalProfessionalAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalProfessional]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalProfessional[P]>
      : GetScalarType<T[P], AggregateMedicalProfessional[P]>
  }




  export type MedicalProfessionalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalProfessionalWhereInput
    orderBy?: MedicalProfessionalOrderByWithAggregationInput | MedicalProfessionalOrderByWithAggregationInput[]
    by: MedicalProfessionalScalarFieldEnum[] | MedicalProfessionalScalarFieldEnum
    having?: MedicalProfessionalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalProfessionalCountAggregateInputType | true
    _avg?: MedicalProfessionalAvgAggregateInputType
    _sum?: MedicalProfessionalSumAggregateInputType
    _min?: MedicalProfessionalMinAggregateInputType
    _max?: MedicalProfessionalMaxAggregateInputType
  }

  export type MedicalProfessionalGroupByOutputType = {
    id: string
    proNumber: string
    firstName: string
    middleName: string | null
    lastName: string
    dob: Date
    email: string
    phone: string | null
    nationality: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date
    vetted: boolean
    level: $Enums.ProLevel
    cvUrl: string | null
    documents: JsonValue | null
    subspecialties: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership: string | null
    societyMemberships: string | null
    score: number | null
    hashedPassword: string | null
    twoFactorMethod: $Enums.TwoFactorMethod
    twoFactorSecret: string | null
    profileLastUpdated: Date | null
    codeOfConductAcknowledged: Date | null
    address: string | null
    billingAddress: string | null
    bankDetails: JsonValue | null
    vatNumber: string | null
    billingRate: number | null
    createdAt: Date
    updatedAt: Date
    _count: MedicalProfessionalCountAggregateOutputType | null
    _avg: MedicalProfessionalAvgAggregateOutputType | null
    _sum: MedicalProfessionalSumAggregateOutputType | null
    _min: MedicalProfessionalMinAggregateOutputType | null
    _max: MedicalProfessionalMaxAggregateOutputType | null
  }

  type GetMedicalProfessionalGroupByPayload<T extends MedicalProfessionalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalProfessionalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalProfessionalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalProfessionalGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalProfessionalGroupByOutputType[P]>
        }
      >
    >


  export type MedicalProfessionalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    proNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    email?: boolean
    phone?: boolean
    nationality?: boolean
    licenseNumber?: boolean
    licenseCountry?: boolean
    licenseExpiry?: boolean
    vetted?: boolean
    level?: boolean
    cvUrl?: boolean
    documents?: boolean
    subspecialties?: boolean
    yearsPractice?: boolean
    publications?: boolean
    trialInvolved?: boolean
    leadership?: boolean
    societyMemberships?: boolean
    score?: boolean
    hashedPassword?: boolean
    twoFactorMethod?: boolean
    twoFactorSecret?: boolean
    profileLastUpdated?: boolean
    codeOfConductAcknowledged?: boolean
    address?: boolean
    billingAddress?: boolean
    bankDetails?: boolean
    vatNumber?: boolean
    billingRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    caseAssignments?: boolean | MedicalProfessional$caseAssignmentsArgs<ExtArgs>
    medicalOpinions?: boolean | MedicalProfessional$medicalOpinionsArgs<ExtArgs>
    professionalPayments?: boolean | MedicalProfessional$professionalPaymentsArgs<ExtArgs>
    professionalSessions?: boolean | MedicalProfessional$professionalSessionsArgs<ExtArgs>
    _count?: boolean | MedicalProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalProfessional"]>

  export type MedicalProfessionalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    proNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    email?: boolean
    phone?: boolean
    nationality?: boolean
    licenseNumber?: boolean
    licenseCountry?: boolean
    licenseExpiry?: boolean
    vetted?: boolean
    level?: boolean
    cvUrl?: boolean
    documents?: boolean
    subspecialties?: boolean
    yearsPractice?: boolean
    publications?: boolean
    trialInvolved?: boolean
    leadership?: boolean
    societyMemberships?: boolean
    score?: boolean
    hashedPassword?: boolean
    twoFactorMethod?: boolean
    twoFactorSecret?: boolean
    profileLastUpdated?: boolean
    codeOfConductAcknowledged?: boolean
    address?: boolean
    billingAddress?: boolean
    bankDetails?: boolean
    vatNumber?: boolean
    billingRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["medicalProfessional"]>

  export type MedicalProfessionalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    proNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    email?: boolean
    phone?: boolean
    nationality?: boolean
    licenseNumber?: boolean
    licenseCountry?: boolean
    licenseExpiry?: boolean
    vetted?: boolean
    level?: boolean
    cvUrl?: boolean
    documents?: boolean
    subspecialties?: boolean
    yearsPractice?: boolean
    publications?: boolean
    trialInvolved?: boolean
    leadership?: boolean
    societyMemberships?: boolean
    score?: boolean
    hashedPassword?: boolean
    twoFactorMethod?: boolean
    twoFactorSecret?: boolean
    profileLastUpdated?: boolean
    codeOfConductAcknowledged?: boolean
    address?: boolean
    billingAddress?: boolean
    bankDetails?: boolean
    vatNumber?: boolean
    billingRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["medicalProfessional"]>

  export type MedicalProfessionalSelectScalar = {
    id?: boolean
    proNumber?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dob?: boolean
    email?: boolean
    phone?: boolean
    nationality?: boolean
    licenseNumber?: boolean
    licenseCountry?: boolean
    licenseExpiry?: boolean
    vetted?: boolean
    level?: boolean
    cvUrl?: boolean
    documents?: boolean
    subspecialties?: boolean
    yearsPractice?: boolean
    publications?: boolean
    trialInvolved?: boolean
    leadership?: boolean
    societyMemberships?: boolean
    score?: boolean
    hashedPassword?: boolean
    twoFactorMethod?: boolean
    twoFactorSecret?: boolean
    profileLastUpdated?: boolean
    codeOfConductAcknowledged?: boolean
    address?: boolean
    billingAddress?: boolean
    bankDetails?: boolean
    vatNumber?: boolean
    billingRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MedicalProfessionalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "proNumber" | "firstName" | "middleName" | "lastName" | "dob" | "email" | "phone" | "nationality" | "licenseNumber" | "licenseCountry" | "licenseExpiry" | "vetted" | "level" | "cvUrl" | "documents" | "subspecialties" | "yearsPractice" | "publications" | "trialInvolved" | "leadership" | "societyMemberships" | "score" | "hashedPassword" | "twoFactorMethod" | "twoFactorSecret" | "profileLastUpdated" | "codeOfConductAcknowledged" | "address" | "billingAddress" | "bankDetails" | "vatNumber" | "billingRate" | "createdAt" | "updatedAt", ExtArgs["result"]["medicalProfessional"]>
  export type MedicalProfessionalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caseAssignments?: boolean | MedicalProfessional$caseAssignmentsArgs<ExtArgs>
    medicalOpinions?: boolean | MedicalProfessional$medicalOpinionsArgs<ExtArgs>
    professionalPayments?: boolean | MedicalProfessional$professionalPaymentsArgs<ExtArgs>
    professionalSessions?: boolean | MedicalProfessional$professionalSessionsArgs<ExtArgs>
    _count?: boolean | MedicalProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MedicalProfessionalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MedicalProfessionalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MedicalProfessionalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalProfessional"
    objects: {
      caseAssignments: Prisma.$CaseAssignmentPayload<ExtArgs>[]
      medicalOpinions: Prisma.$MedicalOpinionPayload<ExtArgs>[]
      professionalPayments: Prisma.$ProfessionalPaymentPayload<ExtArgs>[]
      professionalSessions: Prisma.$ProfessionalSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      proNumber: string
      firstName: string
      middleName: string | null
      lastName: string
      dob: Date
      email: string
      phone: string | null
      nationality: string | null
      licenseNumber: string
      licenseCountry: string
      licenseExpiry: Date
      vetted: boolean
      level: $Enums.ProLevel
      cvUrl: string | null
      documents: Prisma.JsonValue | null
      subspecialties: string | null
      yearsPractice: number
      publications: number
      trialInvolved: boolean
      leadership: string | null
      societyMemberships: string | null
      score: number | null
      hashedPassword: string | null
      twoFactorMethod: $Enums.TwoFactorMethod
      twoFactorSecret: string | null
      profileLastUpdated: Date | null
      codeOfConductAcknowledged: Date | null
      address: string | null
      billingAddress: string | null
      bankDetails: Prisma.JsonValue | null
      vatNumber: string | null
      billingRate: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["medicalProfessional"]>
    composites: {}
  }

  type MedicalProfessionalGetPayload<S extends boolean | null | undefined | MedicalProfessionalDefaultArgs> = $Result.GetResult<Prisma.$MedicalProfessionalPayload, S>

  type MedicalProfessionalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicalProfessionalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicalProfessionalCountAggregateInputType | true
    }

  export interface MedicalProfessionalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalProfessional'], meta: { name: 'MedicalProfessional' } }
    /**
     * Find zero or one MedicalProfessional that matches the filter.
     * @param {MedicalProfessionalFindUniqueArgs} args - Arguments to find a MedicalProfessional
     * @example
     * // Get one MedicalProfessional
     * const medicalProfessional = await prisma.medicalProfessional.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicalProfessionalFindUniqueArgs>(args: SelectSubset<T, MedicalProfessionalFindUniqueArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicalProfessional that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicalProfessionalFindUniqueOrThrowArgs} args - Arguments to find a MedicalProfessional
     * @example
     * // Get one MedicalProfessional
     * const medicalProfessional = await prisma.medicalProfessional.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicalProfessionalFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicalProfessionalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalProfessional that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalProfessionalFindFirstArgs} args - Arguments to find a MedicalProfessional
     * @example
     * // Get one MedicalProfessional
     * const medicalProfessional = await prisma.medicalProfessional.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicalProfessionalFindFirstArgs>(args?: SelectSubset<T, MedicalProfessionalFindFirstArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalProfessional that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalProfessionalFindFirstOrThrowArgs} args - Arguments to find a MedicalProfessional
     * @example
     * // Get one MedicalProfessional
     * const medicalProfessional = await prisma.medicalProfessional.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicalProfessionalFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicalProfessionalFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicalProfessionals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalProfessionalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalProfessionals
     * const medicalProfessionals = await prisma.medicalProfessional.findMany()
     * 
     * // Get first 10 MedicalProfessionals
     * const medicalProfessionals = await prisma.medicalProfessional.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicalProfessionalWithIdOnly = await prisma.medicalProfessional.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicalProfessionalFindManyArgs>(args?: SelectSubset<T, MedicalProfessionalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicalProfessional.
     * @param {MedicalProfessionalCreateArgs} args - Arguments to create a MedicalProfessional.
     * @example
     * // Create one MedicalProfessional
     * const MedicalProfessional = await prisma.medicalProfessional.create({
     *   data: {
     *     // ... data to create a MedicalProfessional
     *   }
     * })
     * 
     */
    create<T extends MedicalProfessionalCreateArgs>(args: SelectSubset<T, MedicalProfessionalCreateArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicalProfessionals.
     * @param {MedicalProfessionalCreateManyArgs} args - Arguments to create many MedicalProfessionals.
     * @example
     * // Create many MedicalProfessionals
     * const medicalProfessional = await prisma.medicalProfessional.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicalProfessionalCreateManyArgs>(args?: SelectSubset<T, MedicalProfessionalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicalProfessionals and returns the data saved in the database.
     * @param {MedicalProfessionalCreateManyAndReturnArgs} args - Arguments to create many MedicalProfessionals.
     * @example
     * // Create many MedicalProfessionals
     * const medicalProfessional = await prisma.medicalProfessional.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicalProfessionals and only return the `id`
     * const medicalProfessionalWithIdOnly = await prisma.medicalProfessional.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicalProfessionalCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicalProfessionalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicalProfessional.
     * @param {MedicalProfessionalDeleteArgs} args - Arguments to delete one MedicalProfessional.
     * @example
     * // Delete one MedicalProfessional
     * const MedicalProfessional = await prisma.medicalProfessional.delete({
     *   where: {
     *     // ... filter to delete one MedicalProfessional
     *   }
     * })
     * 
     */
    delete<T extends MedicalProfessionalDeleteArgs>(args: SelectSubset<T, MedicalProfessionalDeleteArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicalProfessional.
     * @param {MedicalProfessionalUpdateArgs} args - Arguments to update one MedicalProfessional.
     * @example
     * // Update one MedicalProfessional
     * const medicalProfessional = await prisma.medicalProfessional.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicalProfessionalUpdateArgs>(args: SelectSubset<T, MedicalProfessionalUpdateArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicalProfessionals.
     * @param {MedicalProfessionalDeleteManyArgs} args - Arguments to filter MedicalProfessionals to delete.
     * @example
     * // Delete a few MedicalProfessionals
     * const { count } = await prisma.medicalProfessional.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicalProfessionalDeleteManyArgs>(args?: SelectSubset<T, MedicalProfessionalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalProfessionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalProfessionalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalProfessionals
     * const medicalProfessional = await prisma.medicalProfessional.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicalProfessionalUpdateManyArgs>(args: SelectSubset<T, MedicalProfessionalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalProfessionals and returns the data updated in the database.
     * @param {MedicalProfessionalUpdateManyAndReturnArgs} args - Arguments to update many MedicalProfessionals.
     * @example
     * // Update many MedicalProfessionals
     * const medicalProfessional = await prisma.medicalProfessional.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicalProfessionals and only return the `id`
     * const medicalProfessionalWithIdOnly = await prisma.medicalProfessional.updateManyAndReturn({
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
    updateManyAndReturn<T extends MedicalProfessionalUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicalProfessionalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicalProfessional.
     * @param {MedicalProfessionalUpsertArgs} args - Arguments to update or create a MedicalProfessional.
     * @example
     * // Update or create a MedicalProfessional
     * const medicalProfessional = await prisma.medicalProfessional.upsert({
     *   create: {
     *     // ... data to create a MedicalProfessional
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalProfessional we want to update
     *   }
     * })
     */
    upsert<T extends MedicalProfessionalUpsertArgs>(args: SelectSubset<T, MedicalProfessionalUpsertArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicalProfessionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalProfessionalCountArgs} args - Arguments to filter MedicalProfessionals to count.
     * @example
     * // Count the number of MedicalProfessionals
     * const count = await prisma.medicalProfessional.count({
     *   where: {
     *     // ... the filter for the MedicalProfessionals we want to count
     *   }
     * })
    **/
    count<T extends MedicalProfessionalCountArgs>(
      args?: Subset<T, MedicalProfessionalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalProfessionalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalProfessional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalProfessionalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicalProfessionalAggregateArgs>(args: Subset<T, MedicalProfessionalAggregateArgs>): Prisma.PrismaPromise<GetMedicalProfessionalAggregateType<T>>

    /**
     * Group by MedicalProfessional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalProfessionalGroupByArgs} args - Group by arguments.
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
      T extends MedicalProfessionalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalProfessionalGroupByArgs['orderBy'] }
        : { orderBy?: MedicalProfessionalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MedicalProfessionalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalProfessionalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalProfessional model
   */
  readonly fields: MedicalProfessionalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalProfessional.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalProfessionalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    caseAssignments<T extends MedicalProfessional$caseAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessional$caseAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalOpinions<T extends MedicalProfessional$medicalOpinionsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessional$medicalOpinionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    professionalPayments<T extends MedicalProfessional$professionalPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessional$professionalPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    professionalSessions<T extends MedicalProfessional$professionalSessionsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessional$professionalSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MedicalProfessional model
   */
  interface MedicalProfessionalFieldRefs {
    readonly id: FieldRef<"MedicalProfessional", 'String'>
    readonly proNumber: FieldRef<"MedicalProfessional", 'String'>
    readonly firstName: FieldRef<"MedicalProfessional", 'String'>
    readonly middleName: FieldRef<"MedicalProfessional", 'String'>
    readonly lastName: FieldRef<"MedicalProfessional", 'String'>
    readonly dob: FieldRef<"MedicalProfessional", 'DateTime'>
    readonly email: FieldRef<"MedicalProfessional", 'String'>
    readonly phone: FieldRef<"MedicalProfessional", 'String'>
    readonly nationality: FieldRef<"MedicalProfessional", 'String'>
    readonly licenseNumber: FieldRef<"MedicalProfessional", 'String'>
    readonly licenseCountry: FieldRef<"MedicalProfessional", 'String'>
    readonly licenseExpiry: FieldRef<"MedicalProfessional", 'DateTime'>
    readonly vetted: FieldRef<"MedicalProfessional", 'Boolean'>
    readonly level: FieldRef<"MedicalProfessional", 'ProLevel'>
    readonly cvUrl: FieldRef<"MedicalProfessional", 'String'>
    readonly documents: FieldRef<"MedicalProfessional", 'Json'>
    readonly subspecialties: FieldRef<"MedicalProfessional", 'String'>
    readonly yearsPractice: FieldRef<"MedicalProfessional", 'Int'>
    readonly publications: FieldRef<"MedicalProfessional", 'Int'>
    readonly trialInvolved: FieldRef<"MedicalProfessional", 'Boolean'>
    readonly leadership: FieldRef<"MedicalProfessional", 'String'>
    readonly societyMemberships: FieldRef<"MedicalProfessional", 'String'>
    readonly score: FieldRef<"MedicalProfessional", 'Int'>
    readonly hashedPassword: FieldRef<"MedicalProfessional", 'String'>
    readonly twoFactorMethod: FieldRef<"MedicalProfessional", 'TwoFactorMethod'>
    readonly twoFactorSecret: FieldRef<"MedicalProfessional", 'String'>
    readonly profileLastUpdated: FieldRef<"MedicalProfessional", 'DateTime'>
    readonly codeOfConductAcknowledged: FieldRef<"MedicalProfessional", 'DateTime'>
    readonly address: FieldRef<"MedicalProfessional", 'String'>
    readonly billingAddress: FieldRef<"MedicalProfessional", 'String'>
    readonly bankDetails: FieldRef<"MedicalProfessional", 'Json'>
    readonly vatNumber: FieldRef<"MedicalProfessional", 'String'>
    readonly billingRate: FieldRef<"MedicalProfessional", 'Float'>
    readonly createdAt: FieldRef<"MedicalProfessional", 'DateTime'>
    readonly updatedAt: FieldRef<"MedicalProfessional", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MedicalProfessional findUnique
   */
  export type MedicalProfessionalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which MedicalProfessional to fetch.
     */
    where: MedicalProfessionalWhereUniqueInput
  }

  /**
   * MedicalProfessional findUniqueOrThrow
   */
  export type MedicalProfessionalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which MedicalProfessional to fetch.
     */
    where: MedicalProfessionalWhereUniqueInput
  }

  /**
   * MedicalProfessional findFirst
   */
  export type MedicalProfessionalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which MedicalProfessional to fetch.
     */
    where?: MedicalProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalProfessionals to fetch.
     */
    orderBy?: MedicalProfessionalOrderByWithRelationInput | MedicalProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalProfessionals.
     */
    cursor?: MedicalProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalProfessionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalProfessionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalProfessionals.
     */
    distinct?: MedicalProfessionalScalarFieldEnum | MedicalProfessionalScalarFieldEnum[]
  }

  /**
   * MedicalProfessional findFirstOrThrow
   */
  export type MedicalProfessionalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which MedicalProfessional to fetch.
     */
    where?: MedicalProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalProfessionals to fetch.
     */
    orderBy?: MedicalProfessionalOrderByWithRelationInput | MedicalProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalProfessionals.
     */
    cursor?: MedicalProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalProfessionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalProfessionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalProfessionals.
     */
    distinct?: MedicalProfessionalScalarFieldEnum | MedicalProfessionalScalarFieldEnum[]
  }

  /**
   * MedicalProfessional findMany
   */
  export type MedicalProfessionalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which MedicalProfessionals to fetch.
     */
    where?: MedicalProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalProfessionals to fetch.
     */
    orderBy?: MedicalProfessionalOrderByWithRelationInput | MedicalProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalProfessionals.
     */
    cursor?: MedicalProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalProfessionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalProfessionals.
     */
    skip?: number
    distinct?: MedicalProfessionalScalarFieldEnum | MedicalProfessionalScalarFieldEnum[]
  }

  /**
   * MedicalProfessional create
   */
  export type MedicalProfessionalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalProfessional.
     */
    data: XOR<MedicalProfessionalCreateInput, MedicalProfessionalUncheckedCreateInput>
  }

  /**
   * MedicalProfessional createMany
   */
  export type MedicalProfessionalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalProfessionals.
     */
    data: MedicalProfessionalCreateManyInput | MedicalProfessionalCreateManyInput[]
  }

  /**
   * MedicalProfessional createManyAndReturn
   */
  export type MedicalProfessionalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * The data used to create many MedicalProfessionals.
     */
    data: MedicalProfessionalCreateManyInput | MedicalProfessionalCreateManyInput[]
  }

  /**
   * MedicalProfessional update
   */
  export type MedicalProfessionalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalProfessional.
     */
    data: XOR<MedicalProfessionalUpdateInput, MedicalProfessionalUncheckedUpdateInput>
    /**
     * Choose, which MedicalProfessional to update.
     */
    where: MedicalProfessionalWhereUniqueInput
  }

  /**
   * MedicalProfessional updateMany
   */
  export type MedicalProfessionalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalProfessionals.
     */
    data: XOR<MedicalProfessionalUpdateManyMutationInput, MedicalProfessionalUncheckedUpdateManyInput>
    /**
     * Filter which MedicalProfessionals to update
     */
    where?: MedicalProfessionalWhereInput
    /**
     * Limit how many MedicalProfessionals to update.
     */
    limit?: number
  }

  /**
   * MedicalProfessional updateManyAndReturn
   */
  export type MedicalProfessionalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * The data used to update MedicalProfessionals.
     */
    data: XOR<MedicalProfessionalUpdateManyMutationInput, MedicalProfessionalUncheckedUpdateManyInput>
    /**
     * Filter which MedicalProfessionals to update
     */
    where?: MedicalProfessionalWhereInput
    /**
     * Limit how many MedicalProfessionals to update.
     */
    limit?: number
  }

  /**
   * MedicalProfessional upsert
   */
  export type MedicalProfessionalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalProfessional to update in case it exists.
     */
    where: MedicalProfessionalWhereUniqueInput
    /**
     * In case the MedicalProfessional found by the `where` argument doesn't exist, create a new MedicalProfessional with this data.
     */
    create: XOR<MedicalProfessionalCreateInput, MedicalProfessionalUncheckedCreateInput>
    /**
     * In case the MedicalProfessional was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalProfessionalUpdateInput, MedicalProfessionalUncheckedUpdateInput>
  }

  /**
   * MedicalProfessional delete
   */
  export type MedicalProfessionalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
    /**
     * Filter which MedicalProfessional to delete.
     */
    where: MedicalProfessionalWhereUniqueInput
  }

  /**
   * MedicalProfessional deleteMany
   */
  export type MedicalProfessionalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalProfessionals to delete
     */
    where?: MedicalProfessionalWhereInput
    /**
     * Limit how many MedicalProfessionals to delete.
     */
    limit?: number
  }

  /**
   * MedicalProfessional.caseAssignments
   */
  export type MedicalProfessional$caseAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    where?: CaseAssignmentWhereInput
    orderBy?: CaseAssignmentOrderByWithRelationInput | CaseAssignmentOrderByWithRelationInput[]
    cursor?: CaseAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseAssignmentScalarFieldEnum | CaseAssignmentScalarFieldEnum[]
  }

  /**
   * MedicalProfessional.medicalOpinions
   */
  export type MedicalProfessional$medicalOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    where?: MedicalOpinionWhereInput
    orderBy?: MedicalOpinionOrderByWithRelationInput | MedicalOpinionOrderByWithRelationInput[]
    cursor?: MedicalOpinionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicalOpinionScalarFieldEnum | MedicalOpinionScalarFieldEnum[]
  }

  /**
   * MedicalProfessional.professionalPayments
   */
  export type MedicalProfessional$professionalPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    where?: ProfessionalPaymentWhereInput
    orderBy?: ProfessionalPaymentOrderByWithRelationInput | ProfessionalPaymentOrderByWithRelationInput[]
    cursor?: ProfessionalPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalPaymentScalarFieldEnum | ProfessionalPaymentScalarFieldEnum[]
  }

  /**
   * MedicalProfessional.professionalSessions
   */
  export type MedicalProfessional$professionalSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    where?: ProfessionalSessionWhereInput
    orderBy?: ProfessionalSessionOrderByWithRelationInput | ProfessionalSessionOrderByWithRelationInput[]
    cursor?: ProfessionalSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalSessionScalarFieldEnum | ProfessionalSessionScalarFieldEnum[]
  }

  /**
   * MedicalProfessional without action
   */
  export type MedicalProfessionalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalProfessional
     */
    select?: MedicalProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalProfessional
     */
    omit?: MedicalProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalProfessionalInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalSession
   */

  export type AggregateProfessionalSession = {
    _count: ProfessionalSessionCountAggregateOutputType | null
    _min: ProfessionalSessionMinAggregateOutputType | null
    _max: ProfessionalSessionMaxAggregateOutputType | null
  }

  export type ProfessionalSessionMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    sessionToken: string | null
    twoFactorVerified: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ProfessionalSessionMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    sessionToken: string | null
    twoFactorVerified: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ProfessionalSessionCountAggregateOutputType = {
    id: number
    professionalId: number
    sessionToken: number
    twoFactorVerified: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type ProfessionalSessionMinAggregateInputType = {
    id?: true
    professionalId?: true
    sessionToken?: true
    twoFactorVerified?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ProfessionalSessionMaxAggregateInputType = {
    id?: true
    professionalId?: true
    sessionToken?: true
    twoFactorVerified?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ProfessionalSessionCountAggregateInputType = {
    id?: true
    professionalId?: true
    sessionToken?: true
    twoFactorVerified?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type ProfessionalSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalSession to aggregate.
     */
    where?: ProfessionalSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSessions to fetch.
     */
    orderBy?: ProfessionalSessionOrderByWithRelationInput | ProfessionalSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalSessions
    **/
    _count?: true | ProfessionalSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalSessionMaxAggregateInputType
  }

  export type GetProfessionalSessionAggregateType<T extends ProfessionalSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalSession[P]>
      : GetScalarType<T[P], AggregateProfessionalSession[P]>
  }




  export type ProfessionalSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalSessionWhereInput
    orderBy?: ProfessionalSessionOrderByWithAggregationInput | ProfessionalSessionOrderByWithAggregationInput[]
    by: ProfessionalSessionScalarFieldEnum[] | ProfessionalSessionScalarFieldEnum
    having?: ProfessionalSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalSessionCountAggregateInputType | true
    _min?: ProfessionalSessionMinAggregateInputType
    _max?: ProfessionalSessionMaxAggregateInputType
  }

  export type ProfessionalSessionGroupByOutputType = {
    id: string
    professionalId: string
    sessionToken: string
    twoFactorVerified: boolean
    expiresAt: Date
    createdAt: Date
    _count: ProfessionalSessionCountAggregateOutputType | null
    _min: ProfessionalSessionMinAggregateOutputType | null
    _max: ProfessionalSessionMaxAggregateOutputType | null
  }

  type GetProfessionalSessionGroupByPayload<T extends ProfessionalSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalSessionGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    sessionToken?: boolean
    twoFactorVerified?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalSession"]>

  export type ProfessionalSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    sessionToken?: boolean
    twoFactorVerified?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalSession"]>

  export type ProfessionalSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    sessionToken?: boolean
    twoFactorVerified?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalSession"]>

  export type ProfessionalSessionSelectScalar = {
    id?: boolean
    professionalId?: boolean
    sessionToken?: boolean
    twoFactorVerified?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type ProfessionalSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "sessionToken" | "twoFactorVerified" | "expiresAt" | "createdAt", ExtArgs["result"]["professionalSession"]>
  export type ProfessionalSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalSession"
    objects: {
      professional: Prisma.$MedicalProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      sessionToken: string
      twoFactorVerified: boolean
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["professionalSession"]>
    composites: {}
  }

  type ProfessionalSessionGetPayload<S extends boolean | null | undefined | ProfessionalSessionDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalSessionPayload, S>

  type ProfessionalSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalSessionCountAggregateInputType | true
    }

  export interface ProfessionalSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalSession'], meta: { name: 'ProfessionalSession' } }
    /**
     * Find zero or one ProfessionalSession that matches the filter.
     * @param {ProfessionalSessionFindUniqueArgs} args - Arguments to find a ProfessionalSession
     * @example
     * // Get one ProfessionalSession
     * const professionalSession = await prisma.professionalSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalSessionFindUniqueArgs>(args: SelectSubset<T, ProfessionalSessionFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalSessionFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalSession
     * @example
     * // Get one ProfessionalSession
     * const professionalSession = await prisma.professionalSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSessionFindFirstArgs} args - Arguments to find a ProfessionalSession
     * @example
     * // Get one ProfessionalSession
     * const professionalSession = await prisma.professionalSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalSessionFindFirstArgs>(args?: SelectSubset<T, ProfessionalSessionFindFirstArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSessionFindFirstOrThrowArgs} args - Arguments to find a ProfessionalSession
     * @example
     * // Get one ProfessionalSession
     * const professionalSession = await prisma.professionalSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalSessions
     * const professionalSessions = await prisma.professionalSession.findMany()
     * 
     * // Get first 10 ProfessionalSessions
     * const professionalSessions = await prisma.professionalSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalSessionWithIdOnly = await prisma.professionalSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalSessionFindManyArgs>(args?: SelectSubset<T, ProfessionalSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalSession.
     * @param {ProfessionalSessionCreateArgs} args - Arguments to create a ProfessionalSession.
     * @example
     * // Create one ProfessionalSession
     * const ProfessionalSession = await prisma.professionalSession.create({
     *   data: {
     *     // ... data to create a ProfessionalSession
     *   }
     * })
     * 
     */
    create<T extends ProfessionalSessionCreateArgs>(args: SelectSubset<T, ProfessionalSessionCreateArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalSessions.
     * @param {ProfessionalSessionCreateManyArgs} args - Arguments to create many ProfessionalSessions.
     * @example
     * // Create many ProfessionalSessions
     * const professionalSession = await prisma.professionalSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalSessionCreateManyArgs>(args?: SelectSubset<T, ProfessionalSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalSessions and returns the data saved in the database.
     * @param {ProfessionalSessionCreateManyAndReturnArgs} args - Arguments to create many ProfessionalSessions.
     * @example
     * // Create many ProfessionalSessions
     * const professionalSession = await prisma.professionalSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalSessions and only return the `id`
     * const professionalSessionWithIdOnly = await prisma.professionalSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalSession.
     * @param {ProfessionalSessionDeleteArgs} args - Arguments to delete one ProfessionalSession.
     * @example
     * // Delete one ProfessionalSession
     * const ProfessionalSession = await prisma.professionalSession.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalSession
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalSessionDeleteArgs>(args: SelectSubset<T, ProfessionalSessionDeleteArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalSession.
     * @param {ProfessionalSessionUpdateArgs} args - Arguments to update one ProfessionalSession.
     * @example
     * // Update one ProfessionalSession
     * const professionalSession = await prisma.professionalSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalSessionUpdateArgs>(args: SelectSubset<T, ProfessionalSessionUpdateArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalSessions.
     * @param {ProfessionalSessionDeleteManyArgs} args - Arguments to filter ProfessionalSessions to delete.
     * @example
     * // Delete a few ProfessionalSessions
     * const { count } = await prisma.professionalSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalSessionDeleteManyArgs>(args?: SelectSubset<T, ProfessionalSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalSessions
     * const professionalSession = await prisma.professionalSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalSessionUpdateManyArgs>(args: SelectSubset<T, ProfessionalSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalSessions and returns the data updated in the database.
     * @param {ProfessionalSessionUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalSessions.
     * @example
     * // Update many ProfessionalSessions
     * const professionalSession = await prisma.professionalSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalSessions and only return the `id`
     * const professionalSessionWithIdOnly = await prisma.professionalSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProfessionalSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalSession.
     * @param {ProfessionalSessionUpsertArgs} args - Arguments to update or create a ProfessionalSession.
     * @example
     * // Update or create a ProfessionalSession
     * const professionalSession = await prisma.professionalSession.upsert({
     *   create: {
     *     // ... data to create a ProfessionalSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalSession we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalSessionUpsertArgs>(args: SelectSubset<T, ProfessionalSessionUpsertArgs<ExtArgs>>): Prisma__ProfessionalSessionClient<$Result.GetResult<Prisma.$ProfessionalSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSessionCountArgs} args - Arguments to filter ProfessionalSessions to count.
     * @example
     * // Count the number of ProfessionalSessions
     * const count = await prisma.professionalSession.count({
     *   where: {
     *     // ... the filter for the ProfessionalSessions we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalSessionCountArgs>(
      args?: Subset<T, ProfessionalSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfessionalSessionAggregateArgs>(args: Subset<T, ProfessionalSessionAggregateArgs>): Prisma.PrismaPromise<GetProfessionalSessionAggregateType<T>>

    /**
     * Group by ProfessionalSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalSessionGroupByArgs} args - Group by arguments.
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
      T extends ProfessionalSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalSessionGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfessionalSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalSession model
   */
  readonly fields: ProfessionalSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends MedicalProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessionalDefaultArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProfessionalSession model
   */
  interface ProfessionalSessionFieldRefs {
    readonly id: FieldRef<"ProfessionalSession", 'String'>
    readonly professionalId: FieldRef<"ProfessionalSession", 'String'>
    readonly sessionToken: FieldRef<"ProfessionalSession", 'String'>
    readonly twoFactorVerified: FieldRef<"ProfessionalSession", 'Boolean'>
    readonly expiresAt: FieldRef<"ProfessionalSession", 'DateTime'>
    readonly createdAt: FieldRef<"ProfessionalSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalSession findUnique
   */
  export type ProfessionalSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSession to fetch.
     */
    where: ProfessionalSessionWhereUniqueInput
  }

  /**
   * ProfessionalSession findUniqueOrThrow
   */
  export type ProfessionalSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSession to fetch.
     */
    where: ProfessionalSessionWhereUniqueInput
  }

  /**
   * ProfessionalSession findFirst
   */
  export type ProfessionalSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSession to fetch.
     */
    where?: ProfessionalSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSessions to fetch.
     */
    orderBy?: ProfessionalSessionOrderByWithRelationInput | ProfessionalSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalSessions.
     */
    cursor?: ProfessionalSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalSessions.
     */
    distinct?: ProfessionalSessionScalarFieldEnum | ProfessionalSessionScalarFieldEnum[]
  }

  /**
   * ProfessionalSession findFirstOrThrow
   */
  export type ProfessionalSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSession to fetch.
     */
    where?: ProfessionalSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSessions to fetch.
     */
    orderBy?: ProfessionalSessionOrderByWithRelationInput | ProfessionalSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalSessions.
     */
    cursor?: ProfessionalSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalSessions.
     */
    distinct?: ProfessionalSessionScalarFieldEnum | ProfessionalSessionScalarFieldEnum[]
  }

  /**
   * ProfessionalSession findMany
   */
  export type ProfessionalSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalSessions to fetch.
     */
    where?: ProfessionalSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalSessions to fetch.
     */
    orderBy?: ProfessionalSessionOrderByWithRelationInput | ProfessionalSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalSessions.
     */
    cursor?: ProfessionalSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalSessions.
     */
    skip?: number
    distinct?: ProfessionalSessionScalarFieldEnum | ProfessionalSessionScalarFieldEnum[]
  }

  /**
   * ProfessionalSession create
   */
  export type ProfessionalSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalSession.
     */
    data: XOR<ProfessionalSessionCreateInput, ProfessionalSessionUncheckedCreateInput>
  }

  /**
   * ProfessionalSession createMany
   */
  export type ProfessionalSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalSessions.
     */
    data: ProfessionalSessionCreateManyInput | ProfessionalSessionCreateManyInput[]
  }

  /**
   * ProfessionalSession createManyAndReturn
   */
  export type ProfessionalSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalSessions.
     */
    data: ProfessionalSessionCreateManyInput | ProfessionalSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalSession update
   */
  export type ProfessionalSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalSession.
     */
    data: XOR<ProfessionalSessionUpdateInput, ProfessionalSessionUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalSession to update.
     */
    where: ProfessionalSessionWhereUniqueInput
  }

  /**
   * ProfessionalSession updateMany
   */
  export type ProfessionalSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalSessions.
     */
    data: XOR<ProfessionalSessionUpdateManyMutationInput, ProfessionalSessionUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalSessions to update
     */
    where?: ProfessionalSessionWhereInput
    /**
     * Limit how many ProfessionalSessions to update.
     */
    limit?: number
  }

  /**
   * ProfessionalSession updateManyAndReturn
   */
  export type ProfessionalSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalSessions.
     */
    data: XOR<ProfessionalSessionUpdateManyMutationInput, ProfessionalSessionUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalSessions to update
     */
    where?: ProfessionalSessionWhereInput
    /**
     * Limit how many ProfessionalSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalSession upsert
   */
  export type ProfessionalSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalSession to update in case it exists.
     */
    where: ProfessionalSessionWhereUniqueInput
    /**
     * In case the ProfessionalSession found by the `where` argument doesn't exist, create a new ProfessionalSession with this data.
     */
    create: XOR<ProfessionalSessionCreateInput, ProfessionalSessionUncheckedCreateInput>
    /**
     * In case the ProfessionalSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalSessionUpdateInput, ProfessionalSessionUncheckedUpdateInput>
  }

  /**
   * ProfessionalSession delete
   */
  export type ProfessionalSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalSession to delete.
     */
    where: ProfessionalSessionWhereUniqueInput
  }

  /**
   * ProfessionalSession deleteMany
   */
  export type ProfessionalSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalSessions to delete
     */
    where?: ProfessionalSessionWhereInput
    /**
     * Limit how many ProfessionalSessions to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalSession without action
   */
  export type ProfessionalSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalSession
     */
    select?: ProfessionalSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalSession
     */
    omit?: ProfessionalSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalSessionInclude<ExtArgs> | null
  }


  /**
   * Model CaseAssignment
   */

  export type AggregateCaseAssignment = {
    _count: CaseAssignmentCountAggregateOutputType | null
    _min: CaseAssignmentMinAggregateOutputType | null
    _max: CaseAssignmentMaxAggregateOutputType | null
  }

  export type CaseAssignmentMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    status: string | null
    assignedAt: Date | null
    completedAt: Date | null
  }

  export type CaseAssignmentMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    status: string | null
    assignedAt: Date | null
    completedAt: Date | null
  }

  export type CaseAssignmentCountAggregateOutputType = {
    id: number
    caseId: number
    professionalId: number
    status: number
    assignedAt: number
    completedAt: number
    _all: number
  }


  export type CaseAssignmentMinAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    status?: true
    assignedAt?: true
    completedAt?: true
  }

  export type CaseAssignmentMaxAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    status?: true
    assignedAt?: true
    completedAt?: true
  }

  export type CaseAssignmentCountAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    status?: true
    assignedAt?: true
    completedAt?: true
    _all?: true
  }

  export type CaseAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseAssignment to aggregate.
     */
    where?: CaseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAssignments to fetch.
     */
    orderBy?: CaseAssignmentOrderByWithRelationInput | CaseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseAssignments
    **/
    _count?: true | CaseAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseAssignmentMaxAggregateInputType
  }

  export type GetCaseAssignmentAggregateType<T extends CaseAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseAssignment[P]>
      : GetScalarType<T[P], AggregateCaseAssignment[P]>
  }




  export type CaseAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAssignmentWhereInput
    orderBy?: CaseAssignmentOrderByWithAggregationInput | CaseAssignmentOrderByWithAggregationInput[]
    by: CaseAssignmentScalarFieldEnum[] | CaseAssignmentScalarFieldEnum
    having?: CaseAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseAssignmentCountAggregateInputType | true
    _min?: CaseAssignmentMinAggregateInputType
    _max?: CaseAssignmentMaxAggregateInputType
  }

  export type CaseAssignmentGroupByOutputType = {
    id: string
    caseId: string
    professionalId: string
    status: string
    assignedAt: Date
    completedAt: Date | null
    _count: CaseAssignmentCountAggregateOutputType | null
    _min: CaseAssignmentMinAggregateOutputType | null
    _max: CaseAssignmentMaxAggregateOutputType | null
  }

  type GetCaseAssignmentGroupByPayload<T extends CaseAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], CaseAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type CaseAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    status?: boolean
    assignedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    status?: boolean
    assignedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    status?: boolean
    assignedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectScalar = {
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    status?: boolean
    assignedAt?: boolean
    completedAt?: boolean
  }

  export type CaseAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "professionalId" | "status" | "assignedAt" | "completedAt", ExtArgs["result"]["caseAssignment"]>
  export type CaseAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type CaseAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type CaseAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }

  export type $CaseAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseAssignment"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
      professional: Prisma.$MedicalProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      professionalId: string
      status: string
      assignedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["caseAssignment"]>
    composites: {}
  }

  type CaseAssignmentGetPayload<S extends boolean | null | undefined | CaseAssignmentDefaultArgs> = $Result.GetResult<Prisma.$CaseAssignmentPayload, S>

  type CaseAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseAssignmentCountAggregateInputType | true
    }

  export interface CaseAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseAssignment'], meta: { name: 'CaseAssignment' } }
    /**
     * Find zero or one CaseAssignment that matches the filter.
     * @param {CaseAssignmentFindUniqueArgs} args - Arguments to find a CaseAssignment
     * @example
     * // Get one CaseAssignment
     * const caseAssignment = await prisma.caseAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseAssignmentFindUniqueArgs>(args: SelectSubset<T, CaseAssignmentFindUniqueArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseAssignmentFindUniqueOrThrowArgs} args - Arguments to find a CaseAssignment
     * @example
     * // Get one CaseAssignment
     * const caseAssignment = await prisma.caseAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAssignmentFindFirstArgs} args - Arguments to find a CaseAssignment
     * @example
     * // Get one CaseAssignment
     * const caseAssignment = await prisma.caseAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseAssignmentFindFirstArgs>(args?: SelectSubset<T, CaseAssignmentFindFirstArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAssignmentFindFirstOrThrowArgs} args - Arguments to find a CaseAssignment
     * @example
     * // Get one CaseAssignment
     * const caseAssignment = await prisma.caseAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseAssignments
     * const caseAssignments = await prisma.caseAssignment.findMany()
     * 
     * // Get first 10 CaseAssignments
     * const caseAssignments = await prisma.caseAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseAssignmentWithIdOnly = await prisma.caseAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseAssignmentFindManyArgs>(args?: SelectSubset<T, CaseAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseAssignment.
     * @param {CaseAssignmentCreateArgs} args - Arguments to create a CaseAssignment.
     * @example
     * // Create one CaseAssignment
     * const CaseAssignment = await prisma.caseAssignment.create({
     *   data: {
     *     // ... data to create a CaseAssignment
     *   }
     * })
     * 
     */
    create<T extends CaseAssignmentCreateArgs>(args: SelectSubset<T, CaseAssignmentCreateArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseAssignments.
     * @param {CaseAssignmentCreateManyArgs} args - Arguments to create many CaseAssignments.
     * @example
     * // Create many CaseAssignments
     * const caseAssignment = await prisma.caseAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseAssignmentCreateManyArgs>(args?: SelectSubset<T, CaseAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseAssignments and returns the data saved in the database.
     * @param {CaseAssignmentCreateManyAndReturnArgs} args - Arguments to create many CaseAssignments.
     * @example
     * // Create many CaseAssignments
     * const caseAssignment = await prisma.caseAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseAssignments and only return the `id`
     * const caseAssignmentWithIdOnly = await prisma.caseAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseAssignment.
     * @param {CaseAssignmentDeleteArgs} args - Arguments to delete one CaseAssignment.
     * @example
     * // Delete one CaseAssignment
     * const CaseAssignment = await prisma.caseAssignment.delete({
     *   where: {
     *     // ... filter to delete one CaseAssignment
     *   }
     * })
     * 
     */
    delete<T extends CaseAssignmentDeleteArgs>(args: SelectSubset<T, CaseAssignmentDeleteArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseAssignment.
     * @param {CaseAssignmentUpdateArgs} args - Arguments to update one CaseAssignment.
     * @example
     * // Update one CaseAssignment
     * const caseAssignment = await prisma.caseAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseAssignmentUpdateArgs>(args: SelectSubset<T, CaseAssignmentUpdateArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseAssignments.
     * @param {CaseAssignmentDeleteManyArgs} args - Arguments to filter CaseAssignments to delete.
     * @example
     * // Delete a few CaseAssignments
     * const { count } = await prisma.caseAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseAssignmentDeleteManyArgs>(args?: SelectSubset<T, CaseAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseAssignments
     * const caseAssignment = await prisma.caseAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseAssignmentUpdateManyArgs>(args: SelectSubset<T, CaseAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseAssignments and returns the data updated in the database.
     * @param {CaseAssignmentUpdateManyAndReturnArgs} args - Arguments to update many CaseAssignments.
     * @example
     * // Update many CaseAssignments
     * const caseAssignment = await prisma.caseAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseAssignments and only return the `id`
     * const caseAssignmentWithIdOnly = await prisma.caseAssignment.updateManyAndReturn({
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
    updateManyAndReturn<T extends CaseAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseAssignment.
     * @param {CaseAssignmentUpsertArgs} args - Arguments to update or create a CaseAssignment.
     * @example
     * // Update or create a CaseAssignment
     * const caseAssignment = await prisma.caseAssignment.upsert({
     *   create: {
     *     // ... data to create a CaseAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseAssignment we want to update
     *   }
     * })
     */
    upsert<T extends CaseAssignmentUpsertArgs>(args: SelectSubset<T, CaseAssignmentUpsertArgs<ExtArgs>>): Prisma__CaseAssignmentClient<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAssignmentCountArgs} args - Arguments to filter CaseAssignments to count.
     * @example
     * // Count the number of CaseAssignments
     * const count = await prisma.caseAssignment.count({
     *   where: {
     *     // ... the filter for the CaseAssignments we want to count
     *   }
     * })
    **/
    count<T extends CaseAssignmentCountArgs>(
      args?: Subset<T, CaseAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CaseAssignmentAggregateArgs>(args: Subset<T, CaseAssignmentAggregateArgs>): Prisma.PrismaPromise<GetCaseAssignmentAggregateType<T>>

    /**
     * Group by CaseAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseAssignmentGroupByArgs} args - Group by arguments.
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
      T extends CaseAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: CaseAssignmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CaseAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseAssignment model
   */
  readonly fields: CaseAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professional<T extends MedicalProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessionalDefaultArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CaseAssignment model
   */
  interface CaseAssignmentFieldRefs {
    readonly id: FieldRef<"CaseAssignment", 'String'>
    readonly caseId: FieldRef<"CaseAssignment", 'String'>
    readonly professionalId: FieldRef<"CaseAssignment", 'String'>
    readonly status: FieldRef<"CaseAssignment", 'String'>
    readonly assignedAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly completedAt: FieldRef<"CaseAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseAssignment findUnique
   */
  export type CaseAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAssignment to fetch.
     */
    where: CaseAssignmentWhereUniqueInput
  }

  /**
   * CaseAssignment findUniqueOrThrow
   */
  export type CaseAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAssignment to fetch.
     */
    where: CaseAssignmentWhereUniqueInput
  }

  /**
   * CaseAssignment findFirst
   */
  export type CaseAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAssignment to fetch.
     */
    where?: CaseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAssignments to fetch.
     */
    orderBy?: CaseAssignmentOrderByWithRelationInput | CaseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseAssignments.
     */
    cursor?: CaseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseAssignments.
     */
    distinct?: CaseAssignmentScalarFieldEnum | CaseAssignmentScalarFieldEnum[]
  }

  /**
   * CaseAssignment findFirstOrThrow
   */
  export type CaseAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAssignment to fetch.
     */
    where?: CaseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAssignments to fetch.
     */
    orderBy?: CaseAssignmentOrderByWithRelationInput | CaseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseAssignments.
     */
    cursor?: CaseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseAssignments.
     */
    distinct?: CaseAssignmentScalarFieldEnum | CaseAssignmentScalarFieldEnum[]
  }

  /**
   * CaseAssignment findMany
   */
  export type CaseAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CaseAssignments to fetch.
     */
    where?: CaseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseAssignments to fetch.
     */
    orderBy?: CaseAssignmentOrderByWithRelationInput | CaseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseAssignments.
     */
    cursor?: CaseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseAssignments.
     */
    skip?: number
    distinct?: CaseAssignmentScalarFieldEnum | CaseAssignmentScalarFieldEnum[]
  }

  /**
   * CaseAssignment create
   */
  export type CaseAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseAssignment.
     */
    data: XOR<CaseAssignmentCreateInput, CaseAssignmentUncheckedCreateInput>
  }

  /**
   * CaseAssignment createMany
   */
  export type CaseAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseAssignments.
     */
    data: CaseAssignmentCreateManyInput | CaseAssignmentCreateManyInput[]
  }

  /**
   * CaseAssignment createManyAndReturn
   */
  export type CaseAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many CaseAssignments.
     */
    data: CaseAssignmentCreateManyInput | CaseAssignmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseAssignment update
   */
  export type CaseAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseAssignment.
     */
    data: XOR<CaseAssignmentUpdateInput, CaseAssignmentUncheckedUpdateInput>
    /**
     * Choose, which CaseAssignment to update.
     */
    where: CaseAssignmentWhereUniqueInput
  }

  /**
   * CaseAssignment updateMany
   */
  export type CaseAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseAssignments.
     */
    data: XOR<CaseAssignmentUpdateManyMutationInput, CaseAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which CaseAssignments to update
     */
    where?: CaseAssignmentWhereInput
    /**
     * Limit how many CaseAssignments to update.
     */
    limit?: number
  }

  /**
   * CaseAssignment updateManyAndReturn
   */
  export type CaseAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update CaseAssignments.
     */
    data: XOR<CaseAssignmentUpdateManyMutationInput, CaseAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which CaseAssignments to update
     */
    where?: CaseAssignmentWhereInput
    /**
     * Limit how many CaseAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseAssignment upsert
   */
  export type CaseAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseAssignment to update in case it exists.
     */
    where: CaseAssignmentWhereUniqueInput
    /**
     * In case the CaseAssignment found by the `where` argument doesn't exist, create a new CaseAssignment with this data.
     */
    create: XOR<CaseAssignmentCreateInput, CaseAssignmentUncheckedCreateInput>
    /**
     * In case the CaseAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseAssignmentUpdateInput, CaseAssignmentUncheckedUpdateInput>
  }

  /**
   * CaseAssignment delete
   */
  export type CaseAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
    /**
     * Filter which CaseAssignment to delete.
     */
    where: CaseAssignmentWhereUniqueInput
  }

  /**
   * CaseAssignment deleteMany
   */
  export type CaseAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseAssignments to delete
     */
    where?: CaseAssignmentWhereInput
    /**
     * Limit how many CaseAssignments to delete.
     */
    limit?: number
  }

  /**
   * CaseAssignment without action
   */
  export type CaseAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseAssignment
     */
    select?: CaseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseAssignment
     */
    omit?: CaseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model AIAnalysis
   */

  export type AggregateAIAnalysis = {
    _count: AIAnalysisCountAggregateOutputType | null
    _min: AIAnalysisMinAggregateOutputType | null
    _max: AIAnalysisMaxAggregateOutputType | null
  }

  export type AIAnalysisMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    analysisType: string | null
    results: string | null
    createdAt: Date | null
  }

  export type AIAnalysisMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    analysisType: string | null
    results: string | null
    createdAt: Date | null
  }

  export type AIAnalysisCountAggregateOutputType = {
    id: number
    caseId: number
    analysisType: number
    results: number
    createdAt: number
    _all: number
  }


  export type AIAnalysisMinAggregateInputType = {
    id?: true
    caseId?: true
    analysisType?: true
    results?: true
    createdAt?: true
  }

  export type AIAnalysisMaxAggregateInputType = {
    id?: true
    caseId?: true
    analysisType?: true
    results?: true
    createdAt?: true
  }

  export type AIAnalysisCountAggregateInputType = {
    id?: true
    caseId?: true
    analysisType?: true
    results?: true
    createdAt?: true
    _all?: true
  }

  export type AIAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalysis to aggregate.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIAnalyses
    **/
    _count?: true | AIAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIAnalysisMaxAggregateInputType
  }

  export type GetAIAnalysisAggregateType<T extends AIAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateAIAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIAnalysis[P]>
      : GetScalarType<T[P], AggregateAIAnalysis[P]>
  }




  export type AIAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIAnalysisWhereInput
    orderBy?: AIAnalysisOrderByWithAggregationInput | AIAnalysisOrderByWithAggregationInput[]
    by: AIAnalysisScalarFieldEnum[] | AIAnalysisScalarFieldEnum
    having?: AIAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIAnalysisCountAggregateInputType | true
    _min?: AIAnalysisMinAggregateInputType
    _max?: AIAnalysisMaxAggregateInputType
  }

  export type AIAnalysisGroupByOutputType = {
    id: string
    caseId: string
    analysisType: string
    results: string
    createdAt: Date
    _count: AIAnalysisCountAggregateOutputType | null
    _min: AIAnalysisMinAggregateOutputType | null
    _max: AIAnalysisMaxAggregateOutputType | null
  }

  type GetAIAnalysisGroupByPayload<T extends AIAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], AIAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type AIAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    analysisType?: boolean
    results?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    analysisType?: boolean
    results?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    analysisType?: boolean
    results?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectScalar = {
    id?: boolean
    caseId?: boolean
    analysisType?: boolean
    results?: boolean
    createdAt?: boolean
  }

  export type AIAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "analysisType" | "results" | "createdAt", ExtArgs["result"]["aIAnalysis"]>
  export type AIAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type AIAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type AIAnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $AIAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIAnalysis"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      analysisType: string
      results: string
      createdAt: Date
    }, ExtArgs["result"]["aIAnalysis"]>
    composites: {}
  }

  type AIAnalysisGetPayload<S extends boolean | null | undefined | AIAnalysisDefaultArgs> = $Result.GetResult<Prisma.$AIAnalysisPayload, S>

  type AIAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIAnalysisCountAggregateInputType | true
    }

  export interface AIAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIAnalysis'], meta: { name: 'AIAnalysis' } }
    /**
     * Find zero or one AIAnalysis that matches the filter.
     * @param {AIAnalysisFindUniqueArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIAnalysisFindUniqueArgs>(args: SelectSubset<T, AIAnalysisFindUniqueArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIAnalysisFindUniqueOrThrowArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, AIAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindFirstArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIAnalysisFindFirstArgs>(args?: SelectSubset<T, AIAnalysisFindFirstArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindFirstOrThrowArgs} args - Arguments to find a AIAnalysis
     * @example
     * // Get one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, AIAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIAnalyses
     * const aIAnalyses = await prisma.aIAnalysis.findMany()
     * 
     * // Get first 10 AIAnalyses
     * const aIAnalyses = await prisma.aIAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIAnalysisFindManyArgs>(args?: SelectSubset<T, AIAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIAnalysis.
     * @param {AIAnalysisCreateArgs} args - Arguments to create a AIAnalysis.
     * @example
     * // Create one AIAnalysis
     * const AIAnalysis = await prisma.aIAnalysis.create({
     *   data: {
     *     // ... data to create a AIAnalysis
     *   }
     * })
     * 
     */
    create<T extends AIAnalysisCreateArgs>(args: SelectSubset<T, AIAnalysisCreateArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIAnalyses.
     * @param {AIAnalysisCreateManyArgs} args - Arguments to create many AIAnalyses.
     * @example
     * // Create many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIAnalysisCreateManyArgs>(args?: SelectSubset<T, AIAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIAnalyses and returns the data saved in the database.
     * @param {AIAnalysisCreateManyAndReturnArgs} args - Arguments to create many AIAnalyses.
     * @example
     * // Create many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIAnalyses and only return the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, AIAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIAnalysis.
     * @param {AIAnalysisDeleteArgs} args - Arguments to delete one AIAnalysis.
     * @example
     * // Delete one AIAnalysis
     * const AIAnalysis = await prisma.aIAnalysis.delete({
     *   where: {
     *     // ... filter to delete one AIAnalysis
     *   }
     * })
     * 
     */
    delete<T extends AIAnalysisDeleteArgs>(args: SelectSubset<T, AIAnalysisDeleteArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIAnalysis.
     * @param {AIAnalysisUpdateArgs} args - Arguments to update one AIAnalysis.
     * @example
     * // Update one AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIAnalysisUpdateArgs>(args: SelectSubset<T, AIAnalysisUpdateArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIAnalyses.
     * @param {AIAnalysisDeleteManyArgs} args - Arguments to filter AIAnalyses to delete.
     * @example
     * // Delete a few AIAnalyses
     * const { count } = await prisma.aIAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIAnalysisDeleteManyArgs>(args?: SelectSubset<T, AIAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIAnalysisUpdateManyArgs>(args: SelectSubset<T, AIAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIAnalyses and returns the data updated in the database.
     * @param {AIAnalysisUpdateManyAndReturnArgs} args - Arguments to update many AIAnalyses.
     * @example
     * // Update many AIAnalyses
     * const aIAnalysis = await prisma.aIAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIAnalyses and only return the `id`
     * const aIAnalysisWithIdOnly = await prisma.aIAnalysis.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, AIAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIAnalysis.
     * @param {AIAnalysisUpsertArgs} args - Arguments to update or create a AIAnalysis.
     * @example
     * // Update or create a AIAnalysis
     * const aIAnalysis = await prisma.aIAnalysis.upsert({
     *   create: {
     *     // ... data to create a AIAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends AIAnalysisUpsertArgs>(args: SelectSubset<T, AIAnalysisUpsertArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisCountArgs} args - Arguments to filter AIAnalyses to count.
     * @example
     * // Count the number of AIAnalyses
     * const count = await prisma.aIAnalysis.count({
     *   where: {
     *     // ... the filter for the AIAnalyses we want to count
     *   }
     * })
    **/
    count<T extends AIAnalysisCountArgs>(
      args?: Subset<T, AIAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIAnalysisAggregateArgs>(args: Subset<T, AIAnalysisAggregateArgs>): Prisma.PrismaPromise<GetAIAnalysisAggregateType<T>>

    /**
     * Group by AIAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIAnalysisGroupByArgs} args - Group by arguments.
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
      T extends AIAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: AIAnalysisGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIAnalysis model
   */
  readonly fields: AIAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AIAnalysis model
   */
  interface AIAnalysisFieldRefs {
    readonly id: FieldRef<"AIAnalysis", 'String'>
    readonly caseId: FieldRef<"AIAnalysis", 'String'>
    readonly analysisType: FieldRef<"AIAnalysis", 'String'>
    readonly results: FieldRef<"AIAnalysis", 'String'>
    readonly createdAt: FieldRef<"AIAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIAnalysis findUnique
   */
  export type AIAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis findUniqueOrThrow
   */
  export type AIAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis findFirst
   */
  export type AIAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalyses.
     */
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis findFirstOrThrow
   */
  export type AIAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalysis to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIAnalyses.
     */
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis findMany
   */
  export type AIAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which AIAnalyses to fetch.
     */
    where?: AIAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIAnalyses to fetch.
     */
    orderBy?: AIAnalysisOrderByWithRelationInput | AIAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIAnalyses.
     */
    cursor?: AIAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIAnalyses.
     */
    skip?: number
    distinct?: AIAnalysisScalarFieldEnum | AIAnalysisScalarFieldEnum[]
  }

  /**
   * AIAnalysis create
   */
  export type AIAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a AIAnalysis.
     */
    data: XOR<AIAnalysisCreateInput, AIAnalysisUncheckedCreateInput>
  }

  /**
   * AIAnalysis createMany
   */
  export type AIAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIAnalyses.
     */
    data: AIAnalysisCreateManyInput | AIAnalysisCreateManyInput[]
  }

  /**
   * AIAnalysis createManyAndReturn
   */
  export type AIAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many AIAnalyses.
     */
    data: AIAnalysisCreateManyInput | AIAnalysisCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIAnalysis update
   */
  export type AIAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a AIAnalysis.
     */
    data: XOR<AIAnalysisUpdateInput, AIAnalysisUncheckedUpdateInput>
    /**
     * Choose, which AIAnalysis to update.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis updateMany
   */
  export type AIAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIAnalyses.
     */
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which AIAnalyses to update
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to update.
     */
    limit?: number
  }

  /**
   * AIAnalysis updateManyAndReturn
   */
  export type AIAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update AIAnalyses.
     */
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which AIAnalyses to update
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIAnalysis upsert
   */
  export type AIAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the AIAnalysis to update in case it exists.
     */
    where: AIAnalysisWhereUniqueInput
    /**
     * In case the AIAnalysis found by the `where` argument doesn't exist, create a new AIAnalysis with this data.
     */
    create: XOR<AIAnalysisCreateInput, AIAnalysisUncheckedCreateInput>
    /**
     * In case the AIAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIAnalysisUpdateInput, AIAnalysisUncheckedUpdateInput>
  }

  /**
   * AIAnalysis delete
   */
  export type AIAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
    /**
     * Filter which AIAnalysis to delete.
     */
    where: AIAnalysisWhereUniqueInput
  }

  /**
   * AIAnalysis deleteMany
   */
  export type AIAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIAnalyses to delete
     */
    where?: AIAnalysisWhereInput
    /**
     * Limit how many AIAnalyses to delete.
     */
    limit?: number
  }

  /**
   * AIAnalysis without action
   */
  export type AIAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIAnalysis
     */
    select?: AIAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIAnalysis
     */
    omit?: AIAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIAnalysisInclude<ExtArgs> | null
  }


  /**
   * Model MedicalOpinion
   */

  export type AggregateMedicalOpinion = {
    _count: MedicalOpinionCountAggregateOutputType | null
    _min: MedicalOpinionMinAggregateOutputType | null
    _max: MedicalOpinionMaxAggregateOutputType | null
  }

  export type MedicalOpinionMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    content: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalOpinionMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    content: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalOpinionCountAggregateOutputType = {
    id: number
    caseId: number
    professionalId: number
    content: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MedicalOpinionMinAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicalOpinionMaxAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicalOpinionCountAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MedicalOpinionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalOpinion to aggregate.
     */
    where?: MedicalOpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalOpinions to fetch.
     */
    orderBy?: MedicalOpinionOrderByWithRelationInput | MedicalOpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalOpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalOpinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalOpinions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalOpinions
    **/
    _count?: true | MedicalOpinionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalOpinionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalOpinionMaxAggregateInputType
  }

  export type GetMedicalOpinionAggregateType<T extends MedicalOpinionAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalOpinion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalOpinion[P]>
      : GetScalarType<T[P], AggregateMedicalOpinion[P]>
  }




  export type MedicalOpinionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalOpinionWhereInput
    orderBy?: MedicalOpinionOrderByWithAggregationInput | MedicalOpinionOrderByWithAggregationInput[]
    by: MedicalOpinionScalarFieldEnum[] | MedicalOpinionScalarFieldEnum
    having?: MedicalOpinionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalOpinionCountAggregateInputType | true
    _min?: MedicalOpinionMinAggregateInputType
    _max?: MedicalOpinionMaxAggregateInputType
  }

  export type MedicalOpinionGroupByOutputType = {
    id: string
    caseId: string
    professionalId: string
    content: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: MedicalOpinionCountAggregateOutputType | null
    _min: MedicalOpinionMinAggregateOutputType | null
    _max: MedicalOpinionMaxAggregateOutputType | null
  }

  type GetMedicalOpinionGroupByPayload<T extends MedicalOpinionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalOpinionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalOpinionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalOpinionGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalOpinionGroupByOutputType[P]>
        }
      >
    >


  export type MedicalOpinionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalOpinion"]>

  export type MedicalOpinionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalOpinion"]>

  export type MedicalOpinionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalOpinion"]>

  export type MedicalOpinionSelectScalar = {
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MedicalOpinionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "professionalId" | "content" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["medicalOpinion"]>
  export type MedicalOpinionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type MedicalOpinionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type MedicalOpinionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }

  export type $MedicalOpinionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalOpinion"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
      professional: Prisma.$MedicalProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      professionalId: string
      content: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["medicalOpinion"]>
    composites: {}
  }

  type MedicalOpinionGetPayload<S extends boolean | null | undefined | MedicalOpinionDefaultArgs> = $Result.GetResult<Prisma.$MedicalOpinionPayload, S>

  type MedicalOpinionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicalOpinionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicalOpinionCountAggregateInputType | true
    }

  export interface MedicalOpinionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalOpinion'], meta: { name: 'MedicalOpinion' } }
    /**
     * Find zero or one MedicalOpinion that matches the filter.
     * @param {MedicalOpinionFindUniqueArgs} args - Arguments to find a MedicalOpinion
     * @example
     * // Get one MedicalOpinion
     * const medicalOpinion = await prisma.medicalOpinion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicalOpinionFindUniqueArgs>(args: SelectSubset<T, MedicalOpinionFindUniqueArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicalOpinion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicalOpinionFindUniqueOrThrowArgs} args - Arguments to find a MedicalOpinion
     * @example
     * // Get one MedicalOpinion
     * const medicalOpinion = await prisma.medicalOpinion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicalOpinionFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicalOpinionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalOpinion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalOpinionFindFirstArgs} args - Arguments to find a MedicalOpinion
     * @example
     * // Get one MedicalOpinion
     * const medicalOpinion = await prisma.medicalOpinion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicalOpinionFindFirstArgs>(args?: SelectSubset<T, MedicalOpinionFindFirstArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalOpinion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalOpinionFindFirstOrThrowArgs} args - Arguments to find a MedicalOpinion
     * @example
     * // Get one MedicalOpinion
     * const medicalOpinion = await prisma.medicalOpinion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicalOpinionFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicalOpinionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicalOpinions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalOpinionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalOpinions
     * const medicalOpinions = await prisma.medicalOpinion.findMany()
     * 
     * // Get first 10 MedicalOpinions
     * const medicalOpinions = await prisma.medicalOpinion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicalOpinionWithIdOnly = await prisma.medicalOpinion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicalOpinionFindManyArgs>(args?: SelectSubset<T, MedicalOpinionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicalOpinion.
     * @param {MedicalOpinionCreateArgs} args - Arguments to create a MedicalOpinion.
     * @example
     * // Create one MedicalOpinion
     * const MedicalOpinion = await prisma.medicalOpinion.create({
     *   data: {
     *     // ... data to create a MedicalOpinion
     *   }
     * })
     * 
     */
    create<T extends MedicalOpinionCreateArgs>(args: SelectSubset<T, MedicalOpinionCreateArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicalOpinions.
     * @param {MedicalOpinionCreateManyArgs} args - Arguments to create many MedicalOpinions.
     * @example
     * // Create many MedicalOpinions
     * const medicalOpinion = await prisma.medicalOpinion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicalOpinionCreateManyArgs>(args?: SelectSubset<T, MedicalOpinionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicalOpinions and returns the data saved in the database.
     * @param {MedicalOpinionCreateManyAndReturnArgs} args - Arguments to create many MedicalOpinions.
     * @example
     * // Create many MedicalOpinions
     * const medicalOpinion = await prisma.medicalOpinion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicalOpinions and only return the `id`
     * const medicalOpinionWithIdOnly = await prisma.medicalOpinion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicalOpinionCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicalOpinionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicalOpinion.
     * @param {MedicalOpinionDeleteArgs} args - Arguments to delete one MedicalOpinion.
     * @example
     * // Delete one MedicalOpinion
     * const MedicalOpinion = await prisma.medicalOpinion.delete({
     *   where: {
     *     // ... filter to delete one MedicalOpinion
     *   }
     * })
     * 
     */
    delete<T extends MedicalOpinionDeleteArgs>(args: SelectSubset<T, MedicalOpinionDeleteArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicalOpinion.
     * @param {MedicalOpinionUpdateArgs} args - Arguments to update one MedicalOpinion.
     * @example
     * // Update one MedicalOpinion
     * const medicalOpinion = await prisma.medicalOpinion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicalOpinionUpdateArgs>(args: SelectSubset<T, MedicalOpinionUpdateArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicalOpinions.
     * @param {MedicalOpinionDeleteManyArgs} args - Arguments to filter MedicalOpinions to delete.
     * @example
     * // Delete a few MedicalOpinions
     * const { count } = await prisma.medicalOpinion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicalOpinionDeleteManyArgs>(args?: SelectSubset<T, MedicalOpinionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalOpinions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalOpinionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalOpinions
     * const medicalOpinion = await prisma.medicalOpinion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicalOpinionUpdateManyArgs>(args: SelectSubset<T, MedicalOpinionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalOpinions and returns the data updated in the database.
     * @param {MedicalOpinionUpdateManyAndReturnArgs} args - Arguments to update many MedicalOpinions.
     * @example
     * // Update many MedicalOpinions
     * const medicalOpinion = await prisma.medicalOpinion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicalOpinions and only return the `id`
     * const medicalOpinionWithIdOnly = await prisma.medicalOpinion.updateManyAndReturn({
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
    updateManyAndReturn<T extends MedicalOpinionUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicalOpinionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicalOpinion.
     * @param {MedicalOpinionUpsertArgs} args - Arguments to update or create a MedicalOpinion.
     * @example
     * // Update or create a MedicalOpinion
     * const medicalOpinion = await prisma.medicalOpinion.upsert({
     *   create: {
     *     // ... data to create a MedicalOpinion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalOpinion we want to update
     *   }
     * })
     */
    upsert<T extends MedicalOpinionUpsertArgs>(args: SelectSubset<T, MedicalOpinionUpsertArgs<ExtArgs>>): Prisma__MedicalOpinionClient<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicalOpinions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalOpinionCountArgs} args - Arguments to filter MedicalOpinions to count.
     * @example
     * // Count the number of MedicalOpinions
     * const count = await prisma.medicalOpinion.count({
     *   where: {
     *     // ... the filter for the MedicalOpinions we want to count
     *   }
     * })
    **/
    count<T extends MedicalOpinionCountArgs>(
      args?: Subset<T, MedicalOpinionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalOpinionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalOpinion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalOpinionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicalOpinionAggregateArgs>(args: Subset<T, MedicalOpinionAggregateArgs>): Prisma.PrismaPromise<GetMedicalOpinionAggregateType<T>>

    /**
     * Group by MedicalOpinion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalOpinionGroupByArgs} args - Group by arguments.
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
      T extends MedicalOpinionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalOpinionGroupByArgs['orderBy'] }
        : { orderBy?: MedicalOpinionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MedicalOpinionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalOpinionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalOpinion model
   */
  readonly fields: MedicalOpinionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalOpinion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalOpinionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professional<T extends MedicalProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessionalDefaultArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MedicalOpinion model
   */
  interface MedicalOpinionFieldRefs {
    readonly id: FieldRef<"MedicalOpinion", 'String'>
    readonly caseId: FieldRef<"MedicalOpinion", 'String'>
    readonly professionalId: FieldRef<"MedicalOpinion", 'String'>
    readonly content: FieldRef<"MedicalOpinion", 'String'>
    readonly status: FieldRef<"MedicalOpinion", 'String'>
    readonly createdAt: FieldRef<"MedicalOpinion", 'DateTime'>
    readonly updatedAt: FieldRef<"MedicalOpinion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MedicalOpinion findUnique
   */
  export type MedicalOpinionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * Filter, which MedicalOpinion to fetch.
     */
    where: MedicalOpinionWhereUniqueInput
  }

  /**
   * MedicalOpinion findUniqueOrThrow
   */
  export type MedicalOpinionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * Filter, which MedicalOpinion to fetch.
     */
    where: MedicalOpinionWhereUniqueInput
  }

  /**
   * MedicalOpinion findFirst
   */
  export type MedicalOpinionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * Filter, which MedicalOpinion to fetch.
     */
    where?: MedicalOpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalOpinions to fetch.
     */
    orderBy?: MedicalOpinionOrderByWithRelationInput | MedicalOpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalOpinions.
     */
    cursor?: MedicalOpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalOpinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalOpinions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalOpinions.
     */
    distinct?: MedicalOpinionScalarFieldEnum | MedicalOpinionScalarFieldEnum[]
  }

  /**
   * MedicalOpinion findFirstOrThrow
   */
  export type MedicalOpinionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * Filter, which MedicalOpinion to fetch.
     */
    where?: MedicalOpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalOpinions to fetch.
     */
    orderBy?: MedicalOpinionOrderByWithRelationInput | MedicalOpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalOpinions.
     */
    cursor?: MedicalOpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalOpinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalOpinions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalOpinions.
     */
    distinct?: MedicalOpinionScalarFieldEnum | MedicalOpinionScalarFieldEnum[]
  }

  /**
   * MedicalOpinion findMany
   */
  export type MedicalOpinionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * Filter, which MedicalOpinions to fetch.
     */
    where?: MedicalOpinionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalOpinions to fetch.
     */
    orderBy?: MedicalOpinionOrderByWithRelationInput | MedicalOpinionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalOpinions.
     */
    cursor?: MedicalOpinionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalOpinions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalOpinions.
     */
    skip?: number
    distinct?: MedicalOpinionScalarFieldEnum | MedicalOpinionScalarFieldEnum[]
  }

  /**
   * MedicalOpinion create
   */
  export type MedicalOpinionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalOpinion.
     */
    data: XOR<MedicalOpinionCreateInput, MedicalOpinionUncheckedCreateInput>
  }

  /**
   * MedicalOpinion createMany
   */
  export type MedicalOpinionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalOpinions.
     */
    data: MedicalOpinionCreateManyInput | MedicalOpinionCreateManyInput[]
  }

  /**
   * MedicalOpinion createManyAndReturn
   */
  export type MedicalOpinionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * The data used to create many MedicalOpinions.
     */
    data: MedicalOpinionCreateManyInput | MedicalOpinionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalOpinion update
   */
  export type MedicalOpinionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalOpinion.
     */
    data: XOR<MedicalOpinionUpdateInput, MedicalOpinionUncheckedUpdateInput>
    /**
     * Choose, which MedicalOpinion to update.
     */
    where: MedicalOpinionWhereUniqueInput
  }

  /**
   * MedicalOpinion updateMany
   */
  export type MedicalOpinionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalOpinions.
     */
    data: XOR<MedicalOpinionUpdateManyMutationInput, MedicalOpinionUncheckedUpdateManyInput>
    /**
     * Filter which MedicalOpinions to update
     */
    where?: MedicalOpinionWhereInput
    /**
     * Limit how many MedicalOpinions to update.
     */
    limit?: number
  }

  /**
   * MedicalOpinion updateManyAndReturn
   */
  export type MedicalOpinionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * The data used to update MedicalOpinions.
     */
    data: XOR<MedicalOpinionUpdateManyMutationInput, MedicalOpinionUncheckedUpdateManyInput>
    /**
     * Filter which MedicalOpinions to update
     */
    where?: MedicalOpinionWhereInput
    /**
     * Limit how many MedicalOpinions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalOpinion upsert
   */
  export type MedicalOpinionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalOpinion to update in case it exists.
     */
    where: MedicalOpinionWhereUniqueInput
    /**
     * In case the MedicalOpinion found by the `where` argument doesn't exist, create a new MedicalOpinion with this data.
     */
    create: XOR<MedicalOpinionCreateInput, MedicalOpinionUncheckedCreateInput>
    /**
     * In case the MedicalOpinion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalOpinionUpdateInput, MedicalOpinionUncheckedUpdateInput>
  }

  /**
   * MedicalOpinion delete
   */
  export type MedicalOpinionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
    /**
     * Filter which MedicalOpinion to delete.
     */
    where: MedicalOpinionWhereUniqueInput
  }

  /**
   * MedicalOpinion deleteMany
   */
  export type MedicalOpinionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalOpinions to delete
     */
    where?: MedicalOpinionWhereInput
    /**
     * Limit how many MedicalOpinions to delete.
     */
    limit?: number
  }

  /**
   * MedicalOpinion without action
   */
  export type MedicalOpinionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalOpinion
     */
    select?: MedicalOpinionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalOpinion
     */
    omit?: MedicalOpinionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalOpinionInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalPayment
   */

  export type AggregateProfessionalPayment = {
    _count: ProfessionalPaymentCountAggregateOutputType | null
    _avg: ProfessionalPaymentAvgAggregateOutputType | null
    _sum: ProfessionalPaymentSumAggregateOutputType | null
    _min: ProfessionalPaymentMinAggregateOutputType | null
    _max: ProfessionalPaymentMaxAggregateOutputType | null
  }

  export type ProfessionalPaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type ProfessionalPaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type ProfessionalPaymentMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    amount: number | null
    status: string | null
    createdAt: Date | null
  }

  export type ProfessionalPaymentMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    amount: number | null
    status: string | null
    createdAt: Date | null
  }

  export type ProfessionalPaymentCountAggregateOutputType = {
    id: number
    caseId: number
    professionalId: number
    amount: number
    status: number
    createdAt: number
    _all: number
  }


  export type ProfessionalPaymentAvgAggregateInputType = {
    amount?: true
  }

  export type ProfessionalPaymentSumAggregateInputType = {
    amount?: true
  }

  export type ProfessionalPaymentMinAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    amount?: true
    status?: true
    createdAt?: true
  }

  export type ProfessionalPaymentMaxAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    amount?: true
    status?: true
    createdAt?: true
  }

  export type ProfessionalPaymentCountAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    amount?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ProfessionalPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalPayment to aggregate.
     */
    where?: ProfessionalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalPayments to fetch.
     */
    orderBy?: ProfessionalPaymentOrderByWithRelationInput | ProfessionalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalPayments
    **/
    _count?: true | ProfessionalPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessionalPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessionalPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalPaymentMaxAggregateInputType
  }

  export type GetProfessionalPaymentAggregateType<T extends ProfessionalPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalPayment[P]>
      : GetScalarType<T[P], AggregateProfessionalPayment[P]>
  }




  export type ProfessionalPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalPaymentWhereInput
    orderBy?: ProfessionalPaymentOrderByWithAggregationInput | ProfessionalPaymentOrderByWithAggregationInput[]
    by: ProfessionalPaymentScalarFieldEnum[] | ProfessionalPaymentScalarFieldEnum
    having?: ProfessionalPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalPaymentCountAggregateInputType | true
    _avg?: ProfessionalPaymentAvgAggregateInputType
    _sum?: ProfessionalPaymentSumAggregateInputType
    _min?: ProfessionalPaymentMinAggregateInputType
    _max?: ProfessionalPaymentMaxAggregateInputType
  }

  export type ProfessionalPaymentGroupByOutputType = {
    id: string
    caseId: string
    professionalId: string
    amount: number
    status: string
    createdAt: Date
    _count: ProfessionalPaymentCountAggregateOutputType | null
    _avg: ProfessionalPaymentAvgAggregateOutputType | null
    _sum: ProfessionalPaymentSumAggregateOutputType | null
    _min: ProfessionalPaymentMinAggregateOutputType | null
    _max: ProfessionalPaymentMaxAggregateOutputType | null
  }

  type GetProfessionalPaymentGroupByPayload<T extends ProfessionalPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalPaymentGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalPayment"]>

  export type ProfessionalPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalPayment"]>

  export type ProfessionalPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalPayment"]>

  export type ProfessionalPaymentSelectScalar = {
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ProfessionalPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "professionalId" | "amount" | "status" | "createdAt", ExtArgs["result"]["professionalPayment"]>
  export type ProfessionalPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalPayment"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
      professional: Prisma.$MedicalProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      professionalId: string
      amount: number
      status: string
      createdAt: Date
    }, ExtArgs["result"]["professionalPayment"]>
    composites: {}
  }

  type ProfessionalPaymentGetPayload<S extends boolean | null | undefined | ProfessionalPaymentDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalPaymentPayload, S>

  type ProfessionalPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalPaymentCountAggregateInputType | true
    }

  export interface ProfessionalPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalPayment'], meta: { name: 'ProfessionalPayment' } }
    /**
     * Find zero or one ProfessionalPayment that matches the filter.
     * @param {ProfessionalPaymentFindUniqueArgs} args - Arguments to find a ProfessionalPayment
     * @example
     * // Get one ProfessionalPayment
     * const professionalPayment = await prisma.professionalPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalPaymentFindUniqueArgs>(args: SelectSubset<T, ProfessionalPaymentFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalPaymentFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalPayment
     * @example
     * // Get one ProfessionalPayment
     * const professionalPayment = await prisma.professionalPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalPaymentFindFirstArgs} args - Arguments to find a ProfessionalPayment
     * @example
     * // Get one ProfessionalPayment
     * const professionalPayment = await prisma.professionalPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalPaymentFindFirstArgs>(args?: SelectSubset<T, ProfessionalPaymentFindFirstArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalPaymentFindFirstOrThrowArgs} args - Arguments to find a ProfessionalPayment
     * @example
     * // Get one ProfessionalPayment
     * const professionalPayment = await prisma.professionalPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalPayments
     * const professionalPayments = await prisma.professionalPayment.findMany()
     * 
     * // Get first 10 ProfessionalPayments
     * const professionalPayments = await prisma.professionalPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalPaymentWithIdOnly = await prisma.professionalPayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalPaymentFindManyArgs>(args?: SelectSubset<T, ProfessionalPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalPayment.
     * @param {ProfessionalPaymentCreateArgs} args - Arguments to create a ProfessionalPayment.
     * @example
     * // Create one ProfessionalPayment
     * const ProfessionalPayment = await prisma.professionalPayment.create({
     *   data: {
     *     // ... data to create a ProfessionalPayment
     *   }
     * })
     * 
     */
    create<T extends ProfessionalPaymentCreateArgs>(args: SelectSubset<T, ProfessionalPaymentCreateArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalPayments.
     * @param {ProfessionalPaymentCreateManyArgs} args - Arguments to create many ProfessionalPayments.
     * @example
     * // Create many ProfessionalPayments
     * const professionalPayment = await prisma.professionalPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalPaymentCreateManyArgs>(args?: SelectSubset<T, ProfessionalPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProfessionalPayments and returns the data saved in the database.
     * @param {ProfessionalPaymentCreateManyAndReturnArgs} args - Arguments to create many ProfessionalPayments.
     * @example
     * // Create many ProfessionalPayments
     * const professionalPayment = await prisma.professionalPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProfessionalPayments and only return the `id`
     * const professionalPaymentWithIdOnly = await prisma.professionalPayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfessionalPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfessionalPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProfessionalPayment.
     * @param {ProfessionalPaymentDeleteArgs} args - Arguments to delete one ProfessionalPayment.
     * @example
     * // Delete one ProfessionalPayment
     * const ProfessionalPayment = await prisma.professionalPayment.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalPayment
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalPaymentDeleteArgs>(args: SelectSubset<T, ProfessionalPaymentDeleteArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalPayment.
     * @param {ProfessionalPaymentUpdateArgs} args - Arguments to update one ProfessionalPayment.
     * @example
     * // Update one ProfessionalPayment
     * const professionalPayment = await prisma.professionalPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalPaymentUpdateArgs>(args: SelectSubset<T, ProfessionalPaymentUpdateArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalPayments.
     * @param {ProfessionalPaymentDeleteManyArgs} args - Arguments to filter ProfessionalPayments to delete.
     * @example
     * // Delete a few ProfessionalPayments
     * const { count } = await prisma.professionalPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalPaymentDeleteManyArgs>(args?: SelectSubset<T, ProfessionalPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalPayments
     * const professionalPayment = await prisma.professionalPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalPaymentUpdateManyArgs>(args: SelectSubset<T, ProfessionalPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalPayments and returns the data updated in the database.
     * @param {ProfessionalPaymentUpdateManyAndReturnArgs} args - Arguments to update many ProfessionalPayments.
     * @example
     * // Update many ProfessionalPayments
     * const professionalPayment = await prisma.professionalPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProfessionalPayments and only return the `id`
     * const professionalPaymentWithIdOnly = await prisma.professionalPayment.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProfessionalPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfessionalPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProfessionalPayment.
     * @param {ProfessionalPaymentUpsertArgs} args - Arguments to update or create a ProfessionalPayment.
     * @example
     * // Update or create a ProfessionalPayment
     * const professionalPayment = await prisma.professionalPayment.upsert({
     *   create: {
     *     // ... data to create a ProfessionalPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalPayment we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalPaymentUpsertArgs>(args: SelectSubset<T, ProfessionalPaymentUpsertArgs<ExtArgs>>): Prisma__ProfessionalPaymentClient<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalPaymentCountArgs} args - Arguments to filter ProfessionalPayments to count.
     * @example
     * // Count the number of ProfessionalPayments
     * const count = await prisma.professionalPayment.count({
     *   where: {
     *     // ... the filter for the ProfessionalPayments we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalPaymentCountArgs>(
      args?: Subset<T, ProfessionalPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfessionalPaymentAggregateArgs>(args: Subset<T, ProfessionalPaymentAggregateArgs>): Prisma.PrismaPromise<GetProfessionalPaymentAggregateType<T>>

    /**
     * Group by ProfessionalPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalPaymentGroupByArgs} args - Group by arguments.
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
      T extends ProfessionalPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalPaymentGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalPaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfessionalPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalPayment model
   */
  readonly fields: ProfessionalPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professional<T extends MedicalProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessionalDefaultArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProfessionalPayment model
   */
  interface ProfessionalPaymentFieldRefs {
    readonly id: FieldRef<"ProfessionalPayment", 'String'>
    readonly caseId: FieldRef<"ProfessionalPayment", 'String'>
    readonly professionalId: FieldRef<"ProfessionalPayment", 'String'>
    readonly amount: FieldRef<"ProfessionalPayment", 'Float'>
    readonly status: FieldRef<"ProfessionalPayment", 'String'>
    readonly createdAt: FieldRef<"ProfessionalPayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalPayment findUnique
   */
  export type ProfessionalPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalPayment to fetch.
     */
    where: ProfessionalPaymentWhereUniqueInput
  }

  /**
   * ProfessionalPayment findUniqueOrThrow
   */
  export type ProfessionalPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalPayment to fetch.
     */
    where: ProfessionalPaymentWhereUniqueInput
  }

  /**
   * ProfessionalPayment findFirst
   */
  export type ProfessionalPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalPayment to fetch.
     */
    where?: ProfessionalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalPayments to fetch.
     */
    orderBy?: ProfessionalPaymentOrderByWithRelationInput | ProfessionalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalPayments.
     */
    cursor?: ProfessionalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalPayments.
     */
    distinct?: ProfessionalPaymentScalarFieldEnum | ProfessionalPaymentScalarFieldEnum[]
  }

  /**
   * ProfessionalPayment findFirstOrThrow
   */
  export type ProfessionalPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalPayment to fetch.
     */
    where?: ProfessionalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalPayments to fetch.
     */
    orderBy?: ProfessionalPaymentOrderByWithRelationInput | ProfessionalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalPayments.
     */
    cursor?: ProfessionalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalPayments.
     */
    distinct?: ProfessionalPaymentScalarFieldEnum | ProfessionalPaymentScalarFieldEnum[]
  }

  /**
   * ProfessionalPayment findMany
   */
  export type ProfessionalPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalPayments to fetch.
     */
    where?: ProfessionalPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalPayments to fetch.
     */
    orderBy?: ProfessionalPaymentOrderByWithRelationInput | ProfessionalPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalPayments.
     */
    cursor?: ProfessionalPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalPayments.
     */
    skip?: number
    distinct?: ProfessionalPaymentScalarFieldEnum | ProfessionalPaymentScalarFieldEnum[]
  }

  /**
   * ProfessionalPayment create
   */
  export type ProfessionalPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalPayment.
     */
    data: XOR<ProfessionalPaymentCreateInput, ProfessionalPaymentUncheckedCreateInput>
  }

  /**
   * ProfessionalPayment createMany
   */
  export type ProfessionalPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalPayments.
     */
    data: ProfessionalPaymentCreateManyInput | ProfessionalPaymentCreateManyInput[]
  }

  /**
   * ProfessionalPayment createManyAndReturn
   */
  export type ProfessionalPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many ProfessionalPayments.
     */
    data: ProfessionalPaymentCreateManyInput | ProfessionalPaymentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalPayment update
   */
  export type ProfessionalPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalPayment.
     */
    data: XOR<ProfessionalPaymentUpdateInput, ProfessionalPaymentUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalPayment to update.
     */
    where: ProfessionalPaymentWhereUniqueInput
  }

  /**
   * ProfessionalPayment updateMany
   */
  export type ProfessionalPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalPayments.
     */
    data: XOR<ProfessionalPaymentUpdateManyMutationInput, ProfessionalPaymentUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalPayments to update
     */
    where?: ProfessionalPaymentWhereInput
    /**
     * Limit how many ProfessionalPayments to update.
     */
    limit?: number
  }

  /**
   * ProfessionalPayment updateManyAndReturn
   */
  export type ProfessionalPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * The data used to update ProfessionalPayments.
     */
    data: XOR<ProfessionalPaymentUpdateManyMutationInput, ProfessionalPaymentUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalPayments to update
     */
    where?: ProfessionalPaymentWhereInput
    /**
     * Limit how many ProfessionalPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProfessionalPayment upsert
   */
  export type ProfessionalPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalPayment to update in case it exists.
     */
    where: ProfessionalPaymentWhereUniqueInput
    /**
     * In case the ProfessionalPayment found by the `where` argument doesn't exist, create a new ProfessionalPayment with this data.
     */
    create: XOR<ProfessionalPaymentCreateInput, ProfessionalPaymentUncheckedCreateInput>
    /**
     * In case the ProfessionalPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalPaymentUpdateInput, ProfessionalPaymentUncheckedUpdateInput>
  }

  /**
   * ProfessionalPayment delete
   */
  export type ProfessionalPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalPayment to delete.
     */
    where: ProfessionalPaymentWhereUniqueInput
  }

  /**
   * ProfessionalPayment deleteMany
   */
  export type ProfessionalPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalPayments to delete
     */
    where?: ProfessionalPaymentWhereInput
    /**
     * Limit how many ProfessionalPayments to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalPayment without action
   */
  export type ProfessionalPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalPayment
     */
    select?: ProfessionalPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalPayment
     */
    omit?: ProfessionalPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalPaymentInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    email: number
    hashedPassword: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    email: string
    hashedPassword: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "hashedPassword" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      hashedPassword: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
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
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly hashedPassword: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'String'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    hashedPassword: 'hashedPassword',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dateOfBirth: 'dateOfBirth',
    email: 'email',
    phone: 'phone',
    preferredChannel: 'preferredChannel',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const TempSubmissionScalarFieldEnum: {
    id: 'id',
    payload: 'payload',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type TempSubmissionScalarFieldEnum = (typeof TempSubmissionScalarFieldEnum)[keyof typeof TempSubmissionScalarFieldEnum]


  export const CaseScalarFieldEnum: {
    id: 'id',
    caseNumber: 'caseNumber',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dateOfBirth: 'dateOfBirth',
    email: 'email',
    phone: 'phone',
    ethnicity: 'ethnicity',
    gender: 'gender',
    diseaseType: 'diseaseType',
    isFirstOccurrence: 'isFirstOccurrence',
    geneticFamilyHistory: 'geneticFamilyHistory',
    paymentId: 'paymentId',
    consentAccepted: 'consentAccepted',
    customerId: 'customerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseScalarFieldEnum = (typeof CaseScalarFieldEnum)[keyof typeof CaseScalarFieldEnum]


  export const UploadedFileScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    filename: 'filename',
    s3Key: 's3Key',
    mimetype: 'mimetype',
    size: 'size',
    category: 'category',
    createdAt: 'createdAt'
  };

  export type UploadedFileScalarFieldEnum = (typeof UploadedFileScalarFieldEnum)[keyof typeof UploadedFileScalarFieldEnum]


  export const MedicalProfessionalScalarFieldEnum: {
    id: 'id',
    proNumber: 'proNumber',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dob: 'dob',
    email: 'email',
    phone: 'phone',
    nationality: 'nationality',
    licenseNumber: 'licenseNumber',
    licenseCountry: 'licenseCountry',
    licenseExpiry: 'licenseExpiry',
    vetted: 'vetted',
    level: 'level',
    cvUrl: 'cvUrl',
    documents: 'documents',
    subspecialties: 'subspecialties',
    yearsPractice: 'yearsPractice',
    publications: 'publications',
    trialInvolved: 'trialInvolved',
    leadership: 'leadership',
    societyMemberships: 'societyMemberships',
    score: 'score',
    hashedPassword: 'hashedPassword',
    twoFactorMethod: 'twoFactorMethod',
    twoFactorSecret: 'twoFactorSecret',
    profileLastUpdated: 'profileLastUpdated',
    codeOfConductAcknowledged: 'codeOfConductAcknowledged',
    address: 'address',
    billingAddress: 'billingAddress',
    bankDetails: 'bankDetails',
    vatNumber: 'vatNumber',
    billingRate: 'billingRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MedicalProfessionalScalarFieldEnum = (typeof MedicalProfessionalScalarFieldEnum)[keyof typeof MedicalProfessionalScalarFieldEnum]


  export const ProfessionalSessionScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    sessionToken: 'sessionToken',
    twoFactorVerified: 'twoFactorVerified',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type ProfessionalSessionScalarFieldEnum = (typeof ProfessionalSessionScalarFieldEnum)[keyof typeof ProfessionalSessionScalarFieldEnum]


  export const CaseAssignmentScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    professionalId: 'professionalId',
    status: 'status',
    assignedAt: 'assignedAt',
    completedAt: 'completedAt'
  };

  export type CaseAssignmentScalarFieldEnum = (typeof CaseAssignmentScalarFieldEnum)[keyof typeof CaseAssignmentScalarFieldEnum]


  export const AIAnalysisScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    analysisType: 'analysisType',
    results: 'results',
    createdAt: 'createdAt'
  };

  export type AIAnalysisScalarFieldEnum = (typeof AIAnalysisScalarFieldEnum)[keyof typeof AIAnalysisScalarFieldEnum]


  export const MedicalOpinionScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    professionalId: 'professionalId',
    content: 'content',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MedicalOpinionScalarFieldEnum = (typeof MedicalOpinionScalarFieldEnum)[keyof typeof MedicalOpinionScalarFieldEnum]


  export const ProfessionalPaymentScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    professionalId: 'professionalId',
    amount: 'amount',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ProfessionalPaymentScalarFieldEnum = (typeof ProfessionalPaymentScalarFieldEnum)[keyof typeof ProfessionalPaymentScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    hashedPassword: 'hashedPassword',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'CommunicationChannel'
   */
  export type EnumCommunicationChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CommunicationChannel'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'ProLevel'
   */
  export type EnumProLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProLevel'>
    


  /**
   * Reference to a field of type 'TwoFactorMethod'
   */
  export type EnumTwoFactorMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TwoFactorMethod'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    hashedPassword?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    hashedPassword?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    firstName?: StringFilter<"Customer"> | string
    middleName?: StringNullableFilter<"Customer"> | string | null
    lastName?: StringFilter<"Customer"> | string
    dateOfBirth?: DateTimeFilter<"Customer"> | Date | string
    email?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    preferredChannel?: EnumCommunicationChannelFilter<"Customer"> | $Enums.CommunicationChannel
    userId?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    cases?: CaseListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    preferredChannel?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    cases?: CaseOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    userId?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    firstName?: StringFilter<"Customer"> | string
    middleName?: StringNullableFilter<"Customer"> | string | null
    lastName?: StringFilter<"Customer"> | string
    dateOfBirth?: DateTimeFilter<"Customer"> | Date | string
    phone?: StringNullableFilter<"Customer"> | string | null
    preferredChannel?: EnumCommunicationChannelFilter<"Customer"> | $Enums.CommunicationChannel
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    cases?: CaseListRelationFilter
  }, "id" | "email" | "userId">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    preferredChannel?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    firstName?: StringWithAggregatesFilter<"Customer"> | string
    middleName?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    lastName?: StringWithAggregatesFilter<"Customer"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    preferredChannel?: EnumCommunicationChannelWithAggregatesFilter<"Customer"> | $Enums.CommunicationChannel
    userId?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type TempSubmissionWhereInput = {
    AND?: TempSubmissionWhereInput | TempSubmissionWhereInput[]
    OR?: TempSubmissionWhereInput[]
    NOT?: TempSubmissionWhereInput | TempSubmissionWhereInput[]
    id?: StringFilter<"TempSubmission"> | string
    payload?: JsonFilter<"TempSubmission">
    expiresAt?: DateTimeFilter<"TempSubmission"> | Date | string
    createdAt?: DateTimeFilter<"TempSubmission"> | Date | string
  }

  export type TempSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    payload?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TempSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TempSubmissionWhereInput | TempSubmissionWhereInput[]
    OR?: TempSubmissionWhereInput[]
    NOT?: TempSubmissionWhereInput | TempSubmissionWhereInput[]
    payload?: JsonFilter<"TempSubmission">
    expiresAt?: DateTimeFilter<"TempSubmission"> | Date | string
    createdAt?: DateTimeFilter<"TempSubmission"> | Date | string
  }, "id">

  export type TempSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    payload?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: TempSubmissionCountOrderByAggregateInput
    _max?: TempSubmissionMaxOrderByAggregateInput
    _min?: TempSubmissionMinOrderByAggregateInput
  }

  export type TempSubmissionScalarWhereWithAggregatesInput = {
    AND?: TempSubmissionScalarWhereWithAggregatesInput | TempSubmissionScalarWhereWithAggregatesInput[]
    OR?: TempSubmissionScalarWhereWithAggregatesInput[]
    NOT?: TempSubmissionScalarWhereWithAggregatesInput | TempSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TempSubmission"> | string
    payload?: JsonWithAggregatesFilter<"TempSubmission">
    expiresAt?: DateTimeWithAggregatesFilter<"TempSubmission"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TempSubmission"> | Date | string
  }

  export type CaseWhereInput = {
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    id?: StringFilter<"Case"> | string
    caseNumber?: StringFilter<"Case"> | string
    firstName?: StringFilter<"Case"> | string
    middleName?: StringNullableFilter<"Case"> | string | null
    lastName?: StringFilter<"Case"> | string
    dateOfBirth?: DateTimeFilter<"Case"> | Date | string
    email?: StringFilter<"Case"> | string
    phone?: StringNullableFilter<"Case"> | string | null
    ethnicity?: StringNullableFilter<"Case"> | string | null
    gender?: StringNullableFilter<"Case"> | string | null
    diseaseType?: StringNullableFilter<"Case"> | string | null
    isFirstOccurrence?: BoolNullableFilter<"Case"> | boolean | null
    geneticFamilyHistory?: StringNullableFilter<"Case"> | string | null
    paymentId?: StringNullableFilter<"Case"> | string | null
    consentAccepted?: BoolFilter<"Case"> | boolean
    customerId?: StringFilter<"Case"> | string
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    uploadedFiles?: UploadedFileListRelationFilter
    caseAssignments?: CaseAssignmentListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
    medicalOpinions?: MedicalOpinionListRelationFilter
    professionalPayments?: ProfessionalPaymentListRelationFilter
  }

  export type CaseOrderByWithRelationInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    ethnicity?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    diseaseType?: SortOrderInput | SortOrder
    isFirstOccurrence?: SortOrderInput | SortOrder
    geneticFamilyHistory?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    consentAccepted?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    uploadedFiles?: UploadedFileOrderByRelationAggregateInput
    caseAssignments?: CaseAssignmentOrderByRelationAggregateInput
    aiAnalyses?: AIAnalysisOrderByRelationAggregateInput
    medicalOpinions?: MedicalOpinionOrderByRelationAggregateInput
    professionalPayments?: ProfessionalPaymentOrderByRelationAggregateInput
  }

  export type CaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    caseNumber?: string
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    firstName?: StringFilter<"Case"> | string
    middleName?: StringNullableFilter<"Case"> | string | null
    lastName?: StringFilter<"Case"> | string
    dateOfBirth?: DateTimeFilter<"Case"> | Date | string
    email?: StringFilter<"Case"> | string
    phone?: StringNullableFilter<"Case"> | string | null
    ethnicity?: StringNullableFilter<"Case"> | string | null
    gender?: StringNullableFilter<"Case"> | string | null
    diseaseType?: StringNullableFilter<"Case"> | string | null
    isFirstOccurrence?: BoolNullableFilter<"Case"> | boolean | null
    geneticFamilyHistory?: StringNullableFilter<"Case"> | string | null
    paymentId?: StringNullableFilter<"Case"> | string | null
    consentAccepted?: BoolFilter<"Case"> | boolean
    customerId?: StringFilter<"Case"> | string
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    uploadedFiles?: UploadedFileListRelationFilter
    caseAssignments?: CaseAssignmentListRelationFilter
    aiAnalyses?: AIAnalysisListRelationFilter
    medicalOpinions?: MedicalOpinionListRelationFilter
    professionalPayments?: ProfessionalPaymentListRelationFilter
  }, "id" | "caseNumber">

  export type CaseOrderByWithAggregationInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    ethnicity?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    diseaseType?: SortOrderInput | SortOrder
    isFirstOccurrence?: SortOrderInput | SortOrder
    geneticFamilyHistory?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    consentAccepted?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseCountOrderByAggregateInput
    _max?: CaseMaxOrderByAggregateInput
    _min?: CaseMinOrderByAggregateInput
  }

  export type CaseScalarWhereWithAggregatesInput = {
    AND?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    OR?: CaseScalarWhereWithAggregatesInput[]
    NOT?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Case"> | string
    caseNumber?: StringWithAggregatesFilter<"Case"> | string
    firstName?: StringWithAggregatesFilter<"Case"> | string
    middleName?: StringNullableWithAggregatesFilter<"Case"> | string | null
    lastName?: StringWithAggregatesFilter<"Case"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    email?: StringWithAggregatesFilter<"Case"> | string
    phone?: StringNullableWithAggregatesFilter<"Case"> | string | null
    ethnicity?: StringNullableWithAggregatesFilter<"Case"> | string | null
    gender?: StringNullableWithAggregatesFilter<"Case"> | string | null
    diseaseType?: StringNullableWithAggregatesFilter<"Case"> | string | null
    isFirstOccurrence?: BoolNullableWithAggregatesFilter<"Case"> | boolean | null
    geneticFamilyHistory?: StringNullableWithAggregatesFilter<"Case"> | string | null
    paymentId?: StringNullableWithAggregatesFilter<"Case"> | string | null
    consentAccepted?: BoolWithAggregatesFilter<"Case"> | boolean
    customerId?: StringWithAggregatesFilter<"Case"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
  }

  export type UploadedFileWhereInput = {
    AND?: UploadedFileWhereInput | UploadedFileWhereInput[]
    OR?: UploadedFileWhereInput[]
    NOT?: UploadedFileWhereInput | UploadedFileWhereInput[]
    id?: StringFilter<"UploadedFile"> | string
    caseId?: StringFilter<"UploadedFile"> | string
    filename?: StringFilter<"UploadedFile"> | string
    s3Key?: StringFilter<"UploadedFile"> | string
    mimetype?: StringFilter<"UploadedFile"> | string
    size?: IntFilter<"UploadedFile"> | number
    category?: StringFilter<"UploadedFile"> | string
    createdAt?: DateTimeFilter<"UploadedFile"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type UploadedFileOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    filename?: SortOrder
    s3Key?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type UploadedFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadedFileWhereInput | UploadedFileWhereInput[]
    OR?: UploadedFileWhereInput[]
    NOT?: UploadedFileWhereInput | UploadedFileWhereInput[]
    caseId?: StringFilter<"UploadedFile"> | string
    filename?: StringFilter<"UploadedFile"> | string
    s3Key?: StringFilter<"UploadedFile"> | string
    mimetype?: StringFilter<"UploadedFile"> | string
    size?: IntFilter<"UploadedFile"> | number
    category?: StringFilter<"UploadedFile"> | string
    createdAt?: DateTimeFilter<"UploadedFile"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id">

  export type UploadedFileOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    filename?: SortOrder
    s3Key?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    _count?: UploadedFileCountOrderByAggregateInput
    _avg?: UploadedFileAvgOrderByAggregateInput
    _max?: UploadedFileMaxOrderByAggregateInput
    _min?: UploadedFileMinOrderByAggregateInput
    _sum?: UploadedFileSumOrderByAggregateInput
  }

  export type UploadedFileScalarWhereWithAggregatesInput = {
    AND?: UploadedFileScalarWhereWithAggregatesInput | UploadedFileScalarWhereWithAggregatesInput[]
    OR?: UploadedFileScalarWhereWithAggregatesInput[]
    NOT?: UploadedFileScalarWhereWithAggregatesInput | UploadedFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadedFile"> | string
    caseId?: StringWithAggregatesFilter<"UploadedFile"> | string
    filename?: StringWithAggregatesFilter<"UploadedFile"> | string
    s3Key?: StringWithAggregatesFilter<"UploadedFile"> | string
    mimetype?: StringWithAggregatesFilter<"UploadedFile"> | string
    size?: IntWithAggregatesFilter<"UploadedFile"> | number
    category?: StringWithAggregatesFilter<"UploadedFile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UploadedFile"> | Date | string
  }

  export type MedicalProfessionalWhereInput = {
    AND?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    OR?: MedicalProfessionalWhereInput[]
    NOT?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    id?: StringFilter<"MedicalProfessional"> | string
    proNumber?: StringFilter<"MedicalProfessional"> | string
    firstName?: StringFilter<"MedicalProfessional"> | string
    middleName?: StringNullableFilter<"MedicalProfessional"> | string | null
    lastName?: StringFilter<"MedicalProfessional"> | string
    dob?: DateTimeFilter<"MedicalProfessional"> | Date | string
    email?: StringFilter<"MedicalProfessional"> | string
    phone?: StringNullableFilter<"MedicalProfessional"> | string | null
    nationality?: StringNullableFilter<"MedicalProfessional"> | string | null
    licenseNumber?: StringFilter<"MedicalProfessional"> | string
    licenseCountry?: StringFilter<"MedicalProfessional"> | string
    licenseExpiry?: DateTimeFilter<"MedicalProfessional"> | Date | string
    vetted?: BoolFilter<"MedicalProfessional"> | boolean
    level?: EnumProLevelFilter<"MedicalProfessional"> | $Enums.ProLevel
    cvUrl?: StringNullableFilter<"MedicalProfessional"> | string | null
    documents?: JsonNullableFilter<"MedicalProfessional">
    subspecialties?: StringNullableFilter<"MedicalProfessional"> | string | null
    yearsPractice?: IntFilter<"MedicalProfessional"> | number
    publications?: IntFilter<"MedicalProfessional"> | number
    trialInvolved?: BoolFilter<"MedicalProfessional"> | boolean
    leadership?: StringNullableFilter<"MedicalProfessional"> | string | null
    societyMemberships?: StringNullableFilter<"MedicalProfessional"> | string | null
    score?: IntNullableFilter<"MedicalProfessional"> | number | null
    hashedPassword?: StringNullableFilter<"MedicalProfessional"> | string | null
    twoFactorMethod?: EnumTwoFactorMethodFilter<"MedicalProfessional"> | $Enums.TwoFactorMethod
    twoFactorSecret?: StringNullableFilter<"MedicalProfessional"> | string | null
    profileLastUpdated?: DateTimeNullableFilter<"MedicalProfessional"> | Date | string | null
    codeOfConductAcknowledged?: DateTimeNullableFilter<"MedicalProfessional"> | Date | string | null
    address?: StringNullableFilter<"MedicalProfessional"> | string | null
    billingAddress?: StringNullableFilter<"MedicalProfessional"> | string | null
    bankDetails?: JsonNullableFilter<"MedicalProfessional">
    vatNumber?: StringNullableFilter<"MedicalProfessional"> | string | null
    billingRate?: FloatNullableFilter<"MedicalProfessional"> | number | null
    createdAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    caseAssignments?: CaseAssignmentListRelationFilter
    medicalOpinions?: MedicalOpinionListRelationFilter
    professionalPayments?: ProfessionalPaymentListRelationFilter
    professionalSessions?: ProfessionalSessionListRelationFilter
  }

  export type MedicalProfessionalOrderByWithRelationInput = {
    id?: SortOrder
    proNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    licenseNumber?: SortOrder
    licenseCountry?: SortOrder
    licenseExpiry?: SortOrder
    vetted?: SortOrder
    level?: SortOrder
    cvUrl?: SortOrderInput | SortOrder
    documents?: SortOrderInput | SortOrder
    subspecialties?: SortOrderInput | SortOrder
    yearsPractice?: SortOrder
    publications?: SortOrder
    trialInvolved?: SortOrder
    leadership?: SortOrderInput | SortOrder
    societyMemberships?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    twoFactorMethod?: SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    profileLastUpdated?: SortOrderInput | SortOrder
    codeOfConductAcknowledged?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    bankDetails?: SortOrderInput | SortOrder
    vatNumber?: SortOrderInput | SortOrder
    billingRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    caseAssignments?: CaseAssignmentOrderByRelationAggregateInput
    medicalOpinions?: MedicalOpinionOrderByRelationAggregateInput
    professionalPayments?: ProfessionalPaymentOrderByRelationAggregateInput
    professionalSessions?: ProfessionalSessionOrderByRelationAggregateInput
  }

  export type MedicalProfessionalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    proNumber?: string
    email?: string
    AND?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    OR?: MedicalProfessionalWhereInput[]
    NOT?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    firstName?: StringFilter<"MedicalProfessional"> | string
    middleName?: StringNullableFilter<"MedicalProfessional"> | string | null
    lastName?: StringFilter<"MedicalProfessional"> | string
    dob?: DateTimeFilter<"MedicalProfessional"> | Date | string
    phone?: StringNullableFilter<"MedicalProfessional"> | string | null
    nationality?: StringNullableFilter<"MedicalProfessional"> | string | null
    licenseNumber?: StringFilter<"MedicalProfessional"> | string
    licenseCountry?: StringFilter<"MedicalProfessional"> | string
    licenseExpiry?: DateTimeFilter<"MedicalProfessional"> | Date | string
    vetted?: BoolFilter<"MedicalProfessional"> | boolean
    level?: EnumProLevelFilter<"MedicalProfessional"> | $Enums.ProLevel
    cvUrl?: StringNullableFilter<"MedicalProfessional"> | string | null
    documents?: JsonNullableFilter<"MedicalProfessional">
    subspecialties?: StringNullableFilter<"MedicalProfessional"> | string | null
    yearsPractice?: IntFilter<"MedicalProfessional"> | number
    publications?: IntFilter<"MedicalProfessional"> | number
    trialInvolved?: BoolFilter<"MedicalProfessional"> | boolean
    leadership?: StringNullableFilter<"MedicalProfessional"> | string | null
    societyMemberships?: StringNullableFilter<"MedicalProfessional"> | string | null
    score?: IntNullableFilter<"MedicalProfessional"> | number | null
    hashedPassword?: StringNullableFilter<"MedicalProfessional"> | string | null
    twoFactorMethod?: EnumTwoFactorMethodFilter<"MedicalProfessional"> | $Enums.TwoFactorMethod
    twoFactorSecret?: StringNullableFilter<"MedicalProfessional"> | string | null
    profileLastUpdated?: DateTimeNullableFilter<"MedicalProfessional"> | Date | string | null
    codeOfConductAcknowledged?: DateTimeNullableFilter<"MedicalProfessional"> | Date | string | null
    address?: StringNullableFilter<"MedicalProfessional"> | string | null
    billingAddress?: StringNullableFilter<"MedicalProfessional"> | string | null
    bankDetails?: JsonNullableFilter<"MedicalProfessional">
    vatNumber?: StringNullableFilter<"MedicalProfessional"> | string | null
    billingRate?: FloatNullableFilter<"MedicalProfessional"> | number | null
    createdAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    caseAssignments?: CaseAssignmentListRelationFilter
    medicalOpinions?: MedicalOpinionListRelationFilter
    professionalPayments?: ProfessionalPaymentListRelationFilter
    professionalSessions?: ProfessionalSessionListRelationFilter
  }, "id" | "proNumber" | "email">

  export type MedicalProfessionalOrderByWithAggregationInput = {
    id?: SortOrder
    proNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    nationality?: SortOrderInput | SortOrder
    licenseNumber?: SortOrder
    licenseCountry?: SortOrder
    licenseExpiry?: SortOrder
    vetted?: SortOrder
    level?: SortOrder
    cvUrl?: SortOrderInput | SortOrder
    documents?: SortOrderInput | SortOrder
    subspecialties?: SortOrderInput | SortOrder
    yearsPractice?: SortOrder
    publications?: SortOrder
    trialInvolved?: SortOrder
    leadership?: SortOrderInput | SortOrder
    societyMemberships?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    twoFactorMethod?: SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    profileLastUpdated?: SortOrderInput | SortOrder
    codeOfConductAcknowledged?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    bankDetails?: SortOrderInput | SortOrder
    vatNumber?: SortOrderInput | SortOrder
    billingRate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MedicalProfessionalCountOrderByAggregateInput
    _avg?: MedicalProfessionalAvgOrderByAggregateInput
    _max?: MedicalProfessionalMaxOrderByAggregateInput
    _min?: MedicalProfessionalMinOrderByAggregateInput
    _sum?: MedicalProfessionalSumOrderByAggregateInput
  }

  export type MedicalProfessionalScalarWhereWithAggregatesInput = {
    AND?: MedicalProfessionalScalarWhereWithAggregatesInput | MedicalProfessionalScalarWhereWithAggregatesInput[]
    OR?: MedicalProfessionalScalarWhereWithAggregatesInput[]
    NOT?: MedicalProfessionalScalarWhereWithAggregatesInput | MedicalProfessionalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    proNumber?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    firstName?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    middleName?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    lastName?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    dob?: DateTimeWithAggregatesFilter<"MedicalProfessional"> | Date | string
    email?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    phone?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    nationality?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    licenseNumber?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    licenseCountry?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    licenseExpiry?: DateTimeWithAggregatesFilter<"MedicalProfessional"> | Date | string
    vetted?: BoolWithAggregatesFilter<"MedicalProfessional"> | boolean
    level?: EnumProLevelWithAggregatesFilter<"MedicalProfessional"> | $Enums.ProLevel
    cvUrl?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    documents?: JsonNullableWithAggregatesFilter<"MedicalProfessional">
    subspecialties?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    yearsPractice?: IntWithAggregatesFilter<"MedicalProfessional"> | number
    publications?: IntWithAggregatesFilter<"MedicalProfessional"> | number
    trialInvolved?: BoolWithAggregatesFilter<"MedicalProfessional"> | boolean
    leadership?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    societyMemberships?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    score?: IntNullableWithAggregatesFilter<"MedicalProfessional"> | number | null
    hashedPassword?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    twoFactorMethod?: EnumTwoFactorMethodWithAggregatesFilter<"MedicalProfessional"> | $Enums.TwoFactorMethod
    twoFactorSecret?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    profileLastUpdated?: DateTimeNullableWithAggregatesFilter<"MedicalProfessional"> | Date | string | null
    codeOfConductAcknowledged?: DateTimeNullableWithAggregatesFilter<"MedicalProfessional"> | Date | string | null
    address?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    billingAddress?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    bankDetails?: JsonNullableWithAggregatesFilter<"MedicalProfessional">
    vatNumber?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    billingRate?: FloatNullableWithAggregatesFilter<"MedicalProfessional"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MedicalProfessional"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MedicalProfessional"> | Date | string
  }

  export type ProfessionalSessionWhereInput = {
    AND?: ProfessionalSessionWhereInput | ProfessionalSessionWhereInput[]
    OR?: ProfessionalSessionWhereInput[]
    NOT?: ProfessionalSessionWhereInput | ProfessionalSessionWhereInput[]
    id?: StringFilter<"ProfessionalSession"> | string
    professionalId?: StringFilter<"ProfessionalSession"> | string
    sessionToken?: StringFilter<"ProfessionalSession"> | string
    twoFactorVerified?: BoolFilter<"ProfessionalSession"> | boolean
    expiresAt?: DateTimeFilter<"ProfessionalSession"> | Date | string
    createdAt?: DateTimeFilter<"ProfessionalSession"> | Date | string
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }

  export type ProfessionalSessionOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    sessionToken?: SortOrder
    twoFactorVerified?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    professional?: MedicalProfessionalOrderByWithRelationInput
  }

  export type ProfessionalSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: ProfessionalSessionWhereInput | ProfessionalSessionWhereInput[]
    OR?: ProfessionalSessionWhereInput[]
    NOT?: ProfessionalSessionWhereInput | ProfessionalSessionWhereInput[]
    professionalId?: StringFilter<"ProfessionalSession"> | string
    twoFactorVerified?: BoolFilter<"ProfessionalSession"> | boolean
    expiresAt?: DateTimeFilter<"ProfessionalSession"> | Date | string
    createdAt?: DateTimeFilter<"ProfessionalSession"> | Date | string
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }, "id" | "sessionToken">

  export type ProfessionalSessionOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    sessionToken?: SortOrder
    twoFactorVerified?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: ProfessionalSessionCountOrderByAggregateInput
    _max?: ProfessionalSessionMaxOrderByAggregateInput
    _min?: ProfessionalSessionMinOrderByAggregateInput
  }

  export type ProfessionalSessionScalarWhereWithAggregatesInput = {
    AND?: ProfessionalSessionScalarWhereWithAggregatesInput | ProfessionalSessionScalarWhereWithAggregatesInput[]
    OR?: ProfessionalSessionScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalSessionScalarWhereWithAggregatesInput | ProfessionalSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalSession"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalSession"> | string
    sessionToken?: StringWithAggregatesFilter<"ProfessionalSession"> | string
    twoFactorVerified?: BoolWithAggregatesFilter<"ProfessionalSession"> | boolean
    expiresAt?: DateTimeWithAggregatesFilter<"ProfessionalSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalSession"> | Date | string
  }

  export type CaseAssignmentWhereInput = {
    AND?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    OR?: CaseAssignmentWhereInput[]
    NOT?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    id?: StringFilter<"CaseAssignment"> | string
    caseId?: StringFilter<"CaseAssignment"> | string
    professionalId?: StringFilter<"CaseAssignment"> | string
    status?: StringFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }

  export type CaseAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    case?: CaseOrderByWithRelationInput
    professional?: MedicalProfessionalOrderByWithRelationInput
  }

  export type CaseAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    OR?: CaseAssignmentWhereInput[]
    NOT?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    caseId?: StringFilter<"CaseAssignment"> | string
    professionalId?: StringFilter<"CaseAssignment"> | string
    status?: StringFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }, "id">

  export type CaseAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: CaseAssignmentCountOrderByAggregateInput
    _max?: CaseAssignmentMaxOrderByAggregateInput
    _min?: CaseAssignmentMinOrderByAggregateInput
  }

  export type CaseAssignmentScalarWhereWithAggregatesInput = {
    AND?: CaseAssignmentScalarWhereWithAggregatesInput | CaseAssignmentScalarWhereWithAggregatesInput[]
    OR?: CaseAssignmentScalarWhereWithAggregatesInput[]
    NOT?: CaseAssignmentScalarWhereWithAggregatesInput | CaseAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseAssignment"> | string
    caseId?: StringWithAggregatesFilter<"CaseAssignment"> | string
    professionalId?: StringWithAggregatesFilter<"CaseAssignment"> | string
    status?: StringWithAggregatesFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"CaseAssignment"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"CaseAssignment"> | Date | string | null
  }

  export type AIAnalysisWhereInput = {
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    id?: StringFilter<"AIAnalysis"> | string
    caseId?: StringFilter<"AIAnalysis"> | string
    analysisType?: StringFilter<"AIAnalysis"> | string
    results?: StringFilter<"AIAnalysis"> | string
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type AIAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    results?: SortOrder
    createdAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type AIAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    caseId?: StringFilter<"AIAnalysis"> | string
    analysisType?: StringFilter<"AIAnalysis"> | string
    results?: StringFilter<"AIAnalysis"> | string
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id">

  export type AIAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    results?: SortOrder
    createdAt?: SortOrder
    _count?: AIAnalysisCountOrderByAggregateInput
    _max?: AIAnalysisMaxOrderByAggregateInput
    _min?: AIAnalysisMinOrderByAggregateInput
  }

  export type AIAnalysisScalarWhereWithAggregatesInput = {
    AND?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    OR?: AIAnalysisScalarWhereWithAggregatesInput[]
    NOT?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIAnalysis"> | string
    caseId?: StringWithAggregatesFilter<"AIAnalysis"> | string
    analysisType?: StringWithAggregatesFilter<"AIAnalysis"> | string
    results?: StringWithAggregatesFilter<"AIAnalysis"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AIAnalysis"> | Date | string
  }

  export type MedicalOpinionWhereInput = {
    AND?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    OR?: MedicalOpinionWhereInput[]
    NOT?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    id?: StringFilter<"MedicalOpinion"> | string
    caseId?: StringFilter<"MedicalOpinion"> | string
    professionalId?: StringFilter<"MedicalOpinion"> | string
    content?: StringFilter<"MedicalOpinion"> | string
    status?: StringFilter<"MedicalOpinion"> | string
    createdAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }

  export type MedicalOpinionOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    case?: CaseOrderByWithRelationInput
    professional?: MedicalProfessionalOrderByWithRelationInput
  }

  export type MedicalOpinionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    OR?: MedicalOpinionWhereInput[]
    NOT?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    caseId?: StringFilter<"MedicalOpinion"> | string
    professionalId?: StringFilter<"MedicalOpinion"> | string
    content?: StringFilter<"MedicalOpinion"> | string
    status?: StringFilter<"MedicalOpinion"> | string
    createdAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }, "id">

  export type MedicalOpinionOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MedicalOpinionCountOrderByAggregateInput
    _max?: MedicalOpinionMaxOrderByAggregateInput
    _min?: MedicalOpinionMinOrderByAggregateInput
  }

  export type MedicalOpinionScalarWhereWithAggregatesInput = {
    AND?: MedicalOpinionScalarWhereWithAggregatesInput | MedicalOpinionScalarWhereWithAggregatesInput[]
    OR?: MedicalOpinionScalarWhereWithAggregatesInput[]
    NOT?: MedicalOpinionScalarWhereWithAggregatesInput | MedicalOpinionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    caseId?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    professionalId?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    content?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    status?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MedicalOpinion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MedicalOpinion"> | Date | string
  }

  export type ProfessionalPaymentWhereInput = {
    AND?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    OR?: ProfessionalPaymentWhereInput[]
    NOT?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    id?: StringFilter<"ProfessionalPayment"> | string
    caseId?: StringFilter<"ProfessionalPayment"> | string
    professionalId?: StringFilter<"ProfessionalPayment"> | string
    amount?: FloatFilter<"ProfessionalPayment"> | number
    status?: StringFilter<"ProfessionalPayment"> | string
    createdAt?: DateTimeFilter<"ProfessionalPayment"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }

  export type ProfessionalPaymentOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    case?: CaseOrderByWithRelationInput
    professional?: MedicalProfessionalOrderByWithRelationInput
  }

  export type ProfessionalPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    OR?: ProfessionalPaymentWhereInput[]
    NOT?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    caseId?: StringFilter<"ProfessionalPayment"> | string
    professionalId?: StringFilter<"ProfessionalPayment"> | string
    amount?: FloatFilter<"ProfessionalPayment"> | number
    status?: StringFilter<"ProfessionalPayment"> | string
    createdAt?: DateTimeFilter<"ProfessionalPayment"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }, "id">

  export type ProfessionalPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ProfessionalPaymentCountOrderByAggregateInput
    _avg?: ProfessionalPaymentAvgOrderByAggregateInput
    _max?: ProfessionalPaymentMaxOrderByAggregateInput
    _min?: ProfessionalPaymentMinOrderByAggregateInput
    _sum?: ProfessionalPaymentSumOrderByAggregateInput
  }

  export type ProfessionalPaymentScalarWhereWithAggregatesInput = {
    AND?: ProfessionalPaymentScalarWhereWithAggregatesInput | ProfessionalPaymentScalarWhereWithAggregatesInput[]
    OR?: ProfessionalPaymentScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalPaymentScalarWhereWithAggregatesInput | ProfessionalPaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    caseId?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    professionalId?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    amount?: FloatWithAggregatesFilter<"ProfessionalPayment"> | number
    status?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProfessionalPayment"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    hashedPassword?: StringFilter<"Admin"> | string
    role?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    hashedPassword?: StringFilter<"Admin"> | string
    role?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }, "id" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    hashedPassword?: StringWithAggregatesFilter<"Admin"> | string
    role?: StringWithAggregatesFilter<"Admin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    hashedPassword: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    hashedPassword: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    hashedPassword: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    preferredChannel?: $Enums.CommunicationChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCustomerInput
    cases?: CaseCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    preferredChannel?: $Enums.CommunicationChannel
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCustomerNestedInput
    cases?: CaseUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    preferredChannel?: $Enums.CommunicationChannel
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempSubmissionCreateInput = {
    id?: string
    payload: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type TempSubmissionUncheckedCreateInput = {
    id?: string
    payload: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type TempSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempSubmissionCreateManyInput = {
    id?: string
    payload: JsonNullValueInput | InputJsonValue
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type TempSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateManyInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileCreateInput = {
    id?: string
    filename: string
    s3Key: string
    mimetype: string
    size: number
    category: string
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutUploadedFilesInput
  }

  export type UploadedFileUncheckedCreateInput = {
    id?: string
    caseId: string
    filename: string
    s3Key: string
    mimetype: string
    size: number
    category: string
    createdAt?: Date | string
  }

  export type UploadedFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutUploadedFilesNestedInput
  }

  export type UploadedFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileCreateManyInput = {
    id?: string
    caseId: string
    filename: string
    s3Key: string
    mimetype: string
    size: number
    category: string
    createdAt?: Date | string
  }

  export type UploadedFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalProfessionalCreateInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalCreateManyInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalProfessionalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalProfessionalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSessionCreateInput = {
    id?: string
    sessionToken: string
    twoFactorVerified?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
    professional: MedicalProfessionalCreateNestedOneWithoutProfessionalSessionsInput
  }

  export type ProfessionalSessionUncheckedCreateInput = {
    id?: string
    professionalId: string
    sessionToken: string
    twoFactorVerified?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ProfessionalSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    twoFactorVerified?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: MedicalProfessionalUpdateOneRequiredWithoutProfessionalSessionsNestedInput
  }

  export type ProfessionalSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    twoFactorVerified?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSessionCreateManyInput = {
    id?: string
    professionalId: string
    sessionToken: string
    twoFactorVerified?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ProfessionalSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    twoFactorVerified?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    twoFactorVerified?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentCreateInput = {
    id?: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
    case: CaseCreateNestedOneWithoutCaseAssignmentsInput
    professional: MedicalProfessionalCreateNestedOneWithoutCaseAssignmentsInput
  }

  export type CaseAssignmentUncheckedCreateInput = {
    id?: string
    caseId: string
    professionalId: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CaseAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutCaseAssignmentsNestedInput
    professional?: MedicalProfessionalUpdateOneRequiredWithoutCaseAssignmentsNestedInput
  }

  export type CaseAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentCreateManyInput = {
    id?: string
    caseId: string
    professionalId: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CaseAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIAnalysisCreateInput = {
    id?: string
    analysisType: string
    results: string
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutAiAnalysesInput
  }

  export type AIAnalysisUncheckedCreateInput = {
    id?: string
    caseId: string
    analysisType: string
    results: string
    createdAt?: Date | string
  }

  export type AIAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutAiAnalysesNestedInput
  }

  export type AIAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisCreateManyInput = {
    id?: string
    caseId: string
    analysisType: string
    results: string
    createdAt?: Date | string
  }

  export type AIAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalOpinionCreateInput = {
    id?: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    case: CaseCreateNestedOneWithoutMedicalOpinionsInput
    professional: MedicalProfessionalCreateNestedOneWithoutMedicalOpinionsInput
  }

  export type MedicalOpinionUncheckedCreateInput = {
    id?: string
    caseId: string
    professionalId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalOpinionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutMedicalOpinionsNestedInput
    professional?: MedicalProfessionalUpdateOneRequiredWithoutMedicalOpinionsNestedInput
  }

  export type MedicalOpinionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalOpinionCreateManyInput = {
    id?: string
    caseId: string
    professionalId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalOpinionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalOpinionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalPaymentCreateInput = {
    id?: string
    amount: number
    status?: string
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutProfessionalPaymentsInput
    professional: MedicalProfessionalCreateNestedOneWithoutProfessionalPaymentsInput
  }

  export type ProfessionalPaymentUncheckedCreateInput = {
    id?: string
    caseId: string
    professionalId: string
    amount: number
    status?: string
    createdAt?: Date | string
  }

  export type ProfessionalPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutProfessionalPaymentsNestedInput
    professional?: MedicalProfessionalUpdateOneRequiredWithoutProfessionalPaymentsNestedInput
  }

  export type ProfessionalPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalPaymentCreateManyInput = {
    id?: string
    caseId: string
    professionalId: string
    amount: number
    status?: string
    createdAt?: Date | string
  }

  export type ProfessionalPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    id?: string
    email: string
    hashedPassword: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    email: string
    hashedPassword: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateManyInput = {
    id?: string
    email: string
    hashedPassword: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumCommunicationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[]
    notIn?: $Enums.CommunicationChannel[]
    not?: NestedEnumCommunicationChannelFilter<$PrismaModel> | $Enums.CommunicationChannel
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CaseListRelationFilter = {
    every?: CaseWhereInput
    some?: CaseWhereInput
    none?: CaseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    preferredChannel?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    preferredChannel?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    preferredChannel?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type EnumCommunicationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[]
    notIn?: $Enums.CommunicationChannel[]
    not?: NestedEnumCommunicationChannelWithAggregatesFilter<$PrismaModel> | $Enums.CommunicationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommunicationChannelFilter<$PrismaModel>
    _max?: NestedEnumCommunicationChannelFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TempSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    payload?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TempSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TempSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type UploadedFileListRelationFilter = {
    every?: UploadedFileWhereInput
    some?: UploadedFileWhereInput
    none?: UploadedFileWhereInput
  }

  export type CaseAssignmentListRelationFilter = {
    every?: CaseAssignmentWhereInput
    some?: CaseAssignmentWhereInput
    none?: CaseAssignmentWhereInput
  }

  export type AIAnalysisListRelationFilter = {
    every?: AIAnalysisWhereInput
    some?: AIAnalysisWhereInput
    none?: AIAnalysisWhereInput
  }

  export type MedicalOpinionListRelationFilter = {
    every?: MedicalOpinionWhereInput
    some?: MedicalOpinionWhereInput
    none?: MedicalOpinionWhereInput
  }

  export type ProfessionalPaymentListRelationFilter = {
    every?: ProfessionalPaymentWhereInput
    some?: ProfessionalPaymentWhereInput
    none?: ProfessionalPaymentWhereInput
  }

  export type UploadedFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalOpinionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseCountOrderByAggregateInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    ethnicity?: SortOrder
    gender?: SortOrder
    diseaseType?: SortOrder
    isFirstOccurrence?: SortOrder
    geneticFamilyHistory?: SortOrder
    paymentId?: SortOrder
    consentAccepted?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseMaxOrderByAggregateInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    ethnicity?: SortOrder
    gender?: SortOrder
    diseaseType?: SortOrder
    isFirstOccurrence?: SortOrder
    geneticFamilyHistory?: SortOrder
    paymentId?: SortOrder
    consentAccepted?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseMinOrderByAggregateInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    ethnicity?: SortOrder
    gender?: SortOrder
    diseaseType?: SortOrder
    isFirstOccurrence?: SortOrder
    geneticFamilyHistory?: SortOrder
    paymentId?: SortOrder
    consentAccepted?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CaseScalarRelationFilter = {
    is?: CaseWhereInput
    isNot?: CaseWhereInput
  }

  export type UploadedFileCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    filename?: SortOrder
    s3Key?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadedFileAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type UploadedFileMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    filename?: SortOrder
    s3Key?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadedFileMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    filename?: SortOrder
    s3Key?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadedFileSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type EnumProLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ProLevel | EnumProLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProLevel[]
    notIn?: $Enums.ProLevel[]
    not?: NestedEnumProLevelFilter<$PrismaModel> | $Enums.ProLevel
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumTwoFactorMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.TwoFactorMethod | EnumTwoFactorMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TwoFactorMethod[]
    notIn?: $Enums.TwoFactorMethod[]
    not?: NestedEnumTwoFactorMethodFilter<$PrismaModel> | $Enums.TwoFactorMethod
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProfessionalSessionListRelationFilter = {
    every?: ProfessionalSessionWhereInput
    some?: ProfessionalSessionWhereInput
    none?: ProfessionalSessionWhereInput
  }

  export type ProfessionalSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalProfessionalCountOrderByAggregateInput = {
    id?: SortOrder
    proNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    nationality?: SortOrder
    licenseNumber?: SortOrder
    licenseCountry?: SortOrder
    licenseExpiry?: SortOrder
    vetted?: SortOrder
    level?: SortOrder
    cvUrl?: SortOrder
    documents?: SortOrder
    subspecialties?: SortOrder
    yearsPractice?: SortOrder
    publications?: SortOrder
    trialInvolved?: SortOrder
    leadership?: SortOrder
    societyMemberships?: SortOrder
    score?: SortOrder
    hashedPassword?: SortOrder
    twoFactorMethod?: SortOrder
    twoFactorSecret?: SortOrder
    profileLastUpdated?: SortOrder
    codeOfConductAcknowledged?: SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    bankDetails?: SortOrder
    vatNumber?: SortOrder
    billingRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalProfessionalAvgOrderByAggregateInput = {
    yearsPractice?: SortOrder
    publications?: SortOrder
    score?: SortOrder
    billingRate?: SortOrder
  }

  export type MedicalProfessionalMaxOrderByAggregateInput = {
    id?: SortOrder
    proNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    nationality?: SortOrder
    licenseNumber?: SortOrder
    licenseCountry?: SortOrder
    licenseExpiry?: SortOrder
    vetted?: SortOrder
    level?: SortOrder
    cvUrl?: SortOrder
    subspecialties?: SortOrder
    yearsPractice?: SortOrder
    publications?: SortOrder
    trialInvolved?: SortOrder
    leadership?: SortOrder
    societyMemberships?: SortOrder
    score?: SortOrder
    hashedPassword?: SortOrder
    twoFactorMethod?: SortOrder
    twoFactorSecret?: SortOrder
    profileLastUpdated?: SortOrder
    codeOfConductAcknowledged?: SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    vatNumber?: SortOrder
    billingRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalProfessionalMinOrderByAggregateInput = {
    id?: SortOrder
    proNumber?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dob?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    nationality?: SortOrder
    licenseNumber?: SortOrder
    licenseCountry?: SortOrder
    licenseExpiry?: SortOrder
    vetted?: SortOrder
    level?: SortOrder
    cvUrl?: SortOrder
    subspecialties?: SortOrder
    yearsPractice?: SortOrder
    publications?: SortOrder
    trialInvolved?: SortOrder
    leadership?: SortOrder
    societyMemberships?: SortOrder
    score?: SortOrder
    hashedPassword?: SortOrder
    twoFactorMethod?: SortOrder
    twoFactorSecret?: SortOrder
    profileLastUpdated?: SortOrder
    codeOfConductAcknowledged?: SortOrder
    address?: SortOrder
    billingAddress?: SortOrder
    vatNumber?: SortOrder
    billingRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalProfessionalSumOrderByAggregateInput = {
    yearsPractice?: SortOrder
    publications?: SortOrder
    score?: SortOrder
    billingRate?: SortOrder
  }

  export type EnumProLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProLevel | EnumProLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProLevel[]
    notIn?: $Enums.ProLevel[]
    not?: NestedEnumProLevelWithAggregatesFilter<$PrismaModel> | $Enums.ProLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProLevelFilter<$PrismaModel>
    _max?: NestedEnumProLevelFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type EnumTwoFactorMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TwoFactorMethod | EnumTwoFactorMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TwoFactorMethod[]
    notIn?: $Enums.TwoFactorMethod[]
    not?: NestedEnumTwoFactorMethodWithAggregatesFilter<$PrismaModel> | $Enums.TwoFactorMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTwoFactorMethodFilter<$PrismaModel>
    _max?: NestedEnumTwoFactorMethodFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type MedicalProfessionalScalarRelationFilter = {
    is?: MedicalProfessionalWhereInput
    isNot?: MedicalProfessionalWhereInput
  }

  export type ProfessionalSessionCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    sessionToken?: SortOrder
    twoFactorVerified?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    sessionToken?: SortOrder
    twoFactorVerified?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalSessionMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    sessionToken?: SortOrder
    twoFactorVerified?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type CaseAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type CaseAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    status?: SortOrder
    assignedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AIAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    results?: SortOrder
    createdAt?: SortOrder
  }

  export type AIAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    results?: SortOrder
    createdAt?: SortOrder
  }

  export type AIAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    results?: SortOrder
    createdAt?: SortOrder
  }

  export type MedicalOpinionCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalOpinionMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalOpinionMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProfessionalPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalPaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ProfessionalPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalPaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type CustomerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomerUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutCustomerInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    connect?: UserWhereUniqueInput
  }

  export type CaseCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type CaseUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumCommunicationChannelFieldUpdateOperationsInput = {
    set?: $Enums.CommunicationChannel
  }

  export type UserUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    upsert?: UserUpsertWithoutCustomerInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomerInput, UserUpdateWithoutCustomerInput>, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type CaseUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutCustomerInput | CaseUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutCustomerInput | CaseUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutCustomerInput | CaseUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CaseUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput> | CaseCreateWithoutCustomerInput[] | CaseUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: CaseCreateOrConnectWithoutCustomerInput | CaseCreateOrConnectWithoutCustomerInput[]
    upsert?: CaseUpsertWithWhereUniqueWithoutCustomerInput | CaseUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: CaseCreateManyCustomerInputEnvelope
    set?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    disconnect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    delete?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    connect?: CaseWhereUniqueInput | CaseWhereUniqueInput[]
    update?: CaseUpdateWithWhereUniqueWithoutCustomerInput | CaseUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: CaseUpdateManyWithWhereWithoutCustomerInput | CaseUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: CaseScalarWhereInput | CaseScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutCasesInput = {
    create?: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCasesInput
    connect?: CustomerWhereUniqueInput
  }

  export type UploadedFileCreateNestedManyWithoutCaseInput = {
    create?: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput> | UploadedFileCreateWithoutCaseInput[] | UploadedFileUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutCaseInput | UploadedFileCreateOrConnectWithoutCaseInput[]
    createMany?: UploadedFileCreateManyCaseInputEnvelope
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
  }

  export type CaseAssignmentCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type AIAnalysisCreateNestedManyWithoutCaseInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput> | AIAnalysisCreateWithoutCaseInput[] | AIAnalysisUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput | AIAnalysisCreateOrConnectWithoutCaseInput[]
    createMany?: AIAnalysisCreateManyCaseInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type MedicalOpinionCreateNestedManyWithoutCaseInput = {
    create?: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput> | MedicalOpinionCreateWithoutCaseInput[] | MedicalOpinionUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutCaseInput | MedicalOpinionCreateOrConnectWithoutCaseInput[]
    createMany?: MedicalOpinionCreateManyCaseInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type ProfessionalPaymentCreateNestedManyWithoutCaseInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutCaseInput, ProfessionalPaymentUncheckedCreateWithoutCaseInput> | ProfessionalPaymentCreateWithoutCaseInput[] | ProfessionalPaymentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutCaseInput | ProfessionalPaymentCreateOrConnectWithoutCaseInput[]
    createMany?: ProfessionalPaymentCreateManyCaseInputEnvelope
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
  }

  export type UploadedFileUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput> | UploadedFileCreateWithoutCaseInput[] | UploadedFileUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutCaseInput | UploadedFileCreateOrConnectWithoutCaseInput[]
    createMany?: UploadedFileCreateManyCaseInputEnvelope
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
  }

  export type CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type AIAnalysisUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput> | AIAnalysisCreateWithoutCaseInput[] | AIAnalysisUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput | AIAnalysisCreateOrConnectWithoutCaseInput[]
    createMany?: AIAnalysisCreateManyCaseInputEnvelope
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
  }

  export type MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput> | MedicalOpinionCreateWithoutCaseInput[] | MedicalOpinionUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutCaseInput | MedicalOpinionCreateOrConnectWithoutCaseInput[]
    createMany?: MedicalOpinionCreateManyCaseInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type ProfessionalPaymentUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutCaseInput, ProfessionalPaymentUncheckedCreateWithoutCaseInput> | ProfessionalPaymentCreateWithoutCaseInput[] | ProfessionalPaymentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutCaseInput | ProfessionalPaymentCreateOrConnectWithoutCaseInput[]
    createMany?: ProfessionalPaymentCreateManyCaseInputEnvelope
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CustomerUpdateOneRequiredWithoutCasesNestedInput = {
    create?: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutCasesInput
    upsert?: CustomerUpsertWithoutCasesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutCasesInput, CustomerUpdateWithoutCasesInput>, CustomerUncheckedUpdateWithoutCasesInput>
  }

  export type UploadedFileUpdateManyWithoutCaseNestedInput = {
    create?: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput> | UploadedFileCreateWithoutCaseInput[] | UploadedFileUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutCaseInput | UploadedFileCreateOrConnectWithoutCaseInput[]
    upsert?: UploadedFileUpsertWithWhereUniqueWithoutCaseInput | UploadedFileUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: UploadedFileCreateManyCaseInputEnvelope
    set?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    disconnect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    delete?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    update?: UploadedFileUpdateWithWhereUniqueWithoutCaseInput | UploadedFileUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: UploadedFileUpdateManyWithWhereWithoutCaseInput | UploadedFileUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
  }

  export type CaseAssignmentUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    upsert?: CaseAssignmentUpsertWithWhereUniqueWithoutCaseInput | CaseAssignmentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    set?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    disconnect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    delete?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    update?: CaseAssignmentUpdateWithWhereUniqueWithoutCaseInput | CaseAssignmentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseAssignmentUpdateManyWithWhereWithoutCaseInput | CaseAssignmentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseAssignmentScalarWhereInput | CaseAssignmentScalarWhereInput[]
  }

  export type AIAnalysisUpdateManyWithoutCaseNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput> | AIAnalysisCreateWithoutCaseInput[] | AIAnalysisUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput | AIAnalysisCreateOrConnectWithoutCaseInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutCaseInput | AIAnalysisUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: AIAnalysisCreateManyCaseInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutCaseInput | AIAnalysisUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutCaseInput | AIAnalysisUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type MedicalOpinionUpdateManyWithoutCaseNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput> | MedicalOpinionCreateWithoutCaseInput[] | MedicalOpinionUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutCaseInput | MedicalOpinionCreateOrConnectWithoutCaseInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutCaseInput | MedicalOpinionUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: MedicalOpinionCreateManyCaseInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutCaseInput | MedicalOpinionUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutCaseInput | MedicalOpinionUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
  }

  export type ProfessionalPaymentUpdateManyWithoutCaseNestedInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutCaseInput, ProfessionalPaymentUncheckedCreateWithoutCaseInput> | ProfessionalPaymentCreateWithoutCaseInput[] | ProfessionalPaymentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutCaseInput | ProfessionalPaymentCreateOrConnectWithoutCaseInput[]
    upsert?: ProfessionalPaymentUpsertWithWhereUniqueWithoutCaseInput | ProfessionalPaymentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: ProfessionalPaymentCreateManyCaseInputEnvelope
    set?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    disconnect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    delete?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    update?: ProfessionalPaymentUpdateWithWhereUniqueWithoutCaseInput | ProfessionalPaymentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: ProfessionalPaymentUpdateManyWithWhereWithoutCaseInput | ProfessionalPaymentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
  }

  export type UploadedFileUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput> | UploadedFileCreateWithoutCaseInput[] | UploadedFileUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutCaseInput | UploadedFileCreateOrConnectWithoutCaseInput[]
    upsert?: UploadedFileUpsertWithWhereUniqueWithoutCaseInput | UploadedFileUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: UploadedFileCreateManyCaseInputEnvelope
    set?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    disconnect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    delete?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
    update?: UploadedFileUpdateWithWhereUniqueWithoutCaseInput | UploadedFileUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: UploadedFileUpdateManyWithWhereWithoutCaseInput | UploadedFileUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
  }

  export type CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    upsert?: CaseAssignmentUpsertWithWhereUniqueWithoutCaseInput | CaseAssignmentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    set?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    disconnect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    delete?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    update?: CaseAssignmentUpdateWithWhereUniqueWithoutCaseInput | CaseAssignmentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseAssignmentUpdateManyWithWhereWithoutCaseInput | CaseAssignmentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseAssignmentScalarWhereInput | CaseAssignmentScalarWhereInput[]
  }

  export type AIAnalysisUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput> | AIAnalysisCreateWithoutCaseInput[] | AIAnalysisUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput | AIAnalysisCreateOrConnectWithoutCaseInput[]
    upsert?: AIAnalysisUpsertWithWhereUniqueWithoutCaseInput | AIAnalysisUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: AIAnalysisCreateManyCaseInputEnvelope
    set?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    disconnect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    delete?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    connect?: AIAnalysisWhereUniqueInput | AIAnalysisWhereUniqueInput[]
    update?: AIAnalysisUpdateWithWhereUniqueWithoutCaseInput | AIAnalysisUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: AIAnalysisUpdateManyWithWhereWithoutCaseInput | AIAnalysisUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput> | MedicalOpinionCreateWithoutCaseInput[] | MedicalOpinionUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutCaseInput | MedicalOpinionCreateOrConnectWithoutCaseInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutCaseInput | MedicalOpinionUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: MedicalOpinionCreateManyCaseInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutCaseInput | MedicalOpinionUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutCaseInput | MedicalOpinionUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
  }

  export type ProfessionalPaymentUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutCaseInput, ProfessionalPaymentUncheckedCreateWithoutCaseInput> | ProfessionalPaymentCreateWithoutCaseInput[] | ProfessionalPaymentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutCaseInput | ProfessionalPaymentCreateOrConnectWithoutCaseInput[]
    upsert?: ProfessionalPaymentUpsertWithWhereUniqueWithoutCaseInput | ProfessionalPaymentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: ProfessionalPaymentCreateManyCaseInputEnvelope
    set?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    disconnect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    delete?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    update?: ProfessionalPaymentUpdateWithWhereUniqueWithoutCaseInput | ProfessionalPaymentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: ProfessionalPaymentUpdateManyWithWhereWithoutCaseInput | ProfessionalPaymentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
  }

  export type CaseCreateNestedOneWithoutUploadedFilesInput = {
    create?: XOR<CaseCreateWithoutUploadedFilesInput, CaseUncheckedCreateWithoutUploadedFilesInput>
    connectOrCreate?: CaseCreateOrConnectWithoutUploadedFilesInput
    connect?: CaseWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CaseUpdateOneRequiredWithoutUploadedFilesNestedInput = {
    create?: XOR<CaseCreateWithoutUploadedFilesInput, CaseUncheckedCreateWithoutUploadedFilesInput>
    connectOrCreate?: CaseCreateOrConnectWithoutUploadedFilesInput
    upsert?: CaseUpsertWithoutUploadedFilesInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutUploadedFilesInput, CaseUpdateWithoutUploadedFilesInput>, CaseUncheckedUpdateWithoutUploadedFilesInput>
  }

  export type CaseAssignmentCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput> | CaseAssignmentCreateWithoutProfessionalInput[] | CaseAssignmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutProfessionalInput | CaseAssignmentCreateOrConnectWithoutProfessionalInput[]
    createMany?: CaseAssignmentCreateManyProfessionalInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type MedicalOpinionCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<MedicalOpinionCreateWithoutProfessionalInput, MedicalOpinionUncheckedCreateWithoutProfessionalInput> | MedicalOpinionCreateWithoutProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutProfessionalInput | MedicalOpinionCreateOrConnectWithoutProfessionalInput[]
    createMany?: MedicalOpinionCreateManyProfessionalInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type ProfessionalPaymentCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput> | ProfessionalPaymentCreateWithoutProfessionalInput[] | ProfessionalPaymentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutProfessionalInput | ProfessionalPaymentCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalPaymentCreateManyProfessionalInputEnvelope
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
  }

  export type ProfessionalSessionCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalSessionCreateWithoutProfessionalInput, ProfessionalSessionUncheckedCreateWithoutProfessionalInput> | ProfessionalSessionCreateWithoutProfessionalInput[] | ProfessionalSessionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSessionCreateOrConnectWithoutProfessionalInput | ProfessionalSessionCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalSessionCreateManyProfessionalInputEnvelope
    connect?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
  }

  export type CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput> | CaseAssignmentCreateWithoutProfessionalInput[] | CaseAssignmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutProfessionalInput | CaseAssignmentCreateOrConnectWithoutProfessionalInput[]
    createMany?: CaseAssignmentCreateManyProfessionalInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type MedicalOpinionUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<MedicalOpinionCreateWithoutProfessionalInput, MedicalOpinionUncheckedCreateWithoutProfessionalInput> | MedicalOpinionCreateWithoutProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutProfessionalInput | MedicalOpinionCreateOrConnectWithoutProfessionalInput[]
    createMany?: MedicalOpinionCreateManyProfessionalInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput> | ProfessionalPaymentCreateWithoutProfessionalInput[] | ProfessionalPaymentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutProfessionalInput | ProfessionalPaymentCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalPaymentCreateManyProfessionalInputEnvelope
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
  }

  export type ProfessionalSessionUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalSessionCreateWithoutProfessionalInput, ProfessionalSessionUncheckedCreateWithoutProfessionalInput> | ProfessionalSessionCreateWithoutProfessionalInput[] | ProfessionalSessionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSessionCreateOrConnectWithoutProfessionalInput | ProfessionalSessionCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalSessionCreateManyProfessionalInputEnvelope
    connect?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
  }

  export type EnumProLevelFieldUpdateOperationsInput = {
    set?: $Enums.ProLevel
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTwoFactorMethodFieldUpdateOperationsInput = {
    set?: $Enums.TwoFactorMethod
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CaseAssignmentUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput> | CaseAssignmentCreateWithoutProfessionalInput[] | CaseAssignmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutProfessionalInput | CaseAssignmentCreateOrConnectWithoutProfessionalInput[]
    upsert?: CaseAssignmentUpsertWithWhereUniqueWithoutProfessionalInput | CaseAssignmentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: CaseAssignmentCreateManyProfessionalInputEnvelope
    set?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    disconnect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    delete?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    update?: CaseAssignmentUpdateWithWhereUniqueWithoutProfessionalInput | CaseAssignmentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: CaseAssignmentUpdateManyWithWhereWithoutProfessionalInput | CaseAssignmentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: CaseAssignmentScalarWhereInput | CaseAssignmentScalarWhereInput[]
  }

  export type MedicalOpinionUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutProfessionalInput, MedicalOpinionUncheckedCreateWithoutProfessionalInput> | MedicalOpinionCreateWithoutProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutProfessionalInput | MedicalOpinionCreateOrConnectWithoutProfessionalInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutProfessionalInput | MedicalOpinionUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: MedicalOpinionCreateManyProfessionalInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutProfessionalInput | MedicalOpinionUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutProfessionalInput | MedicalOpinionUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
  }

  export type ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput> | ProfessionalPaymentCreateWithoutProfessionalInput[] | ProfessionalPaymentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutProfessionalInput | ProfessionalPaymentCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalPaymentUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalPaymentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalPaymentCreateManyProfessionalInputEnvelope
    set?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    disconnect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    delete?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    update?: ProfessionalPaymentUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalPaymentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalPaymentUpdateManyWithWhereWithoutProfessionalInput | ProfessionalPaymentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
  }

  export type ProfessionalSessionUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalSessionCreateWithoutProfessionalInput, ProfessionalSessionUncheckedCreateWithoutProfessionalInput> | ProfessionalSessionCreateWithoutProfessionalInput[] | ProfessionalSessionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSessionCreateOrConnectWithoutProfessionalInput | ProfessionalSessionCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalSessionUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalSessionUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalSessionCreateManyProfessionalInputEnvelope
    set?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    disconnect?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    delete?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    connect?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    update?: ProfessionalSessionUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalSessionUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalSessionUpdateManyWithWhereWithoutProfessionalInput | ProfessionalSessionUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalSessionScalarWhereInput | ProfessionalSessionScalarWhereInput[]
  }

  export type CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput> | CaseAssignmentCreateWithoutProfessionalInput[] | CaseAssignmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutProfessionalInput | CaseAssignmentCreateOrConnectWithoutProfessionalInput[]
    upsert?: CaseAssignmentUpsertWithWhereUniqueWithoutProfessionalInput | CaseAssignmentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: CaseAssignmentCreateManyProfessionalInputEnvelope
    set?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    disconnect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    delete?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
    update?: CaseAssignmentUpdateWithWhereUniqueWithoutProfessionalInput | CaseAssignmentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: CaseAssignmentUpdateManyWithWhereWithoutProfessionalInput | CaseAssignmentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: CaseAssignmentScalarWhereInput | CaseAssignmentScalarWhereInput[]
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutProfessionalInput, MedicalOpinionUncheckedCreateWithoutProfessionalInput> | MedicalOpinionCreateWithoutProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutProfessionalInput | MedicalOpinionCreateOrConnectWithoutProfessionalInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutProfessionalInput | MedicalOpinionUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: MedicalOpinionCreateManyProfessionalInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutProfessionalInput | MedicalOpinionUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutProfessionalInput | MedicalOpinionUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
  }

  export type ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput> | ProfessionalPaymentCreateWithoutProfessionalInput[] | ProfessionalPaymentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutProfessionalInput | ProfessionalPaymentCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalPaymentUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalPaymentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalPaymentCreateManyProfessionalInputEnvelope
    set?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    disconnect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    delete?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
    update?: ProfessionalPaymentUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalPaymentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalPaymentUpdateManyWithWhereWithoutProfessionalInput | ProfessionalPaymentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
  }

  export type ProfessionalSessionUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalSessionCreateWithoutProfessionalInput, ProfessionalSessionUncheckedCreateWithoutProfessionalInput> | ProfessionalSessionCreateWithoutProfessionalInput[] | ProfessionalSessionUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalSessionCreateOrConnectWithoutProfessionalInput | ProfessionalSessionCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalSessionUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalSessionUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalSessionCreateManyProfessionalInputEnvelope
    set?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    disconnect?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    delete?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    connect?: ProfessionalSessionWhereUniqueInput | ProfessionalSessionWhereUniqueInput[]
    update?: ProfessionalSessionUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalSessionUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalSessionUpdateManyWithWhereWithoutProfessionalInput | ProfessionalSessionUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalSessionScalarWhereInput | ProfessionalSessionScalarWhereInput[]
  }

  export type MedicalProfessionalCreateNestedOneWithoutProfessionalSessionsInput = {
    create?: XOR<MedicalProfessionalCreateWithoutProfessionalSessionsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalSessionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutProfessionalSessionsInput
    connect?: MedicalProfessionalWhereUniqueInput
  }

  export type MedicalProfessionalUpdateOneRequiredWithoutProfessionalSessionsNestedInput = {
    create?: XOR<MedicalProfessionalCreateWithoutProfessionalSessionsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalSessionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutProfessionalSessionsInput
    upsert?: MedicalProfessionalUpsertWithoutProfessionalSessionsInput
    connect?: MedicalProfessionalWhereUniqueInput
    update?: XOR<XOR<MedicalProfessionalUpdateToOneWithWhereWithoutProfessionalSessionsInput, MedicalProfessionalUpdateWithoutProfessionalSessionsInput>, MedicalProfessionalUncheckedUpdateWithoutProfessionalSessionsInput>
  }

  export type CaseCreateNestedOneWithoutCaseAssignmentsInput = {
    create?: XOR<CaseCreateWithoutCaseAssignmentsInput, CaseUncheckedCreateWithoutCaseAssignmentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutCaseAssignmentsInput
    connect?: CaseWhereUniqueInput
  }

  export type MedicalProfessionalCreateNestedOneWithoutCaseAssignmentsInput = {
    create?: XOR<MedicalProfessionalCreateWithoutCaseAssignmentsInput, MedicalProfessionalUncheckedCreateWithoutCaseAssignmentsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutCaseAssignmentsInput
    connect?: MedicalProfessionalWhereUniqueInput
  }

  export type CaseUpdateOneRequiredWithoutCaseAssignmentsNestedInput = {
    create?: XOR<CaseCreateWithoutCaseAssignmentsInput, CaseUncheckedCreateWithoutCaseAssignmentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutCaseAssignmentsInput
    upsert?: CaseUpsertWithoutCaseAssignmentsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutCaseAssignmentsInput, CaseUpdateWithoutCaseAssignmentsInput>, CaseUncheckedUpdateWithoutCaseAssignmentsInput>
  }

  export type MedicalProfessionalUpdateOneRequiredWithoutCaseAssignmentsNestedInput = {
    create?: XOR<MedicalProfessionalCreateWithoutCaseAssignmentsInput, MedicalProfessionalUncheckedCreateWithoutCaseAssignmentsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutCaseAssignmentsInput
    upsert?: MedicalProfessionalUpsertWithoutCaseAssignmentsInput
    connect?: MedicalProfessionalWhereUniqueInput
    update?: XOR<XOR<MedicalProfessionalUpdateToOneWithWhereWithoutCaseAssignmentsInput, MedicalProfessionalUpdateWithoutCaseAssignmentsInput>, MedicalProfessionalUncheckedUpdateWithoutCaseAssignmentsInput>
  }

  export type CaseCreateNestedOneWithoutAiAnalysesInput = {
    create?: XOR<CaseCreateWithoutAiAnalysesInput, CaseUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAiAnalysesInput
    connect?: CaseWhereUniqueInput
  }

  export type CaseUpdateOneRequiredWithoutAiAnalysesNestedInput = {
    create?: XOR<CaseCreateWithoutAiAnalysesInput, CaseUncheckedCreateWithoutAiAnalysesInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAiAnalysesInput
    upsert?: CaseUpsertWithoutAiAnalysesInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutAiAnalysesInput, CaseUpdateWithoutAiAnalysesInput>, CaseUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type CaseCreateNestedOneWithoutMedicalOpinionsInput = {
    create?: XOR<CaseCreateWithoutMedicalOpinionsInput, CaseUncheckedCreateWithoutMedicalOpinionsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutMedicalOpinionsInput
    connect?: CaseWhereUniqueInput
  }

  export type MedicalProfessionalCreateNestedOneWithoutMedicalOpinionsInput = {
    create?: XOR<MedicalProfessionalCreateWithoutMedicalOpinionsInput, MedicalProfessionalUncheckedCreateWithoutMedicalOpinionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutMedicalOpinionsInput
    connect?: MedicalProfessionalWhereUniqueInput
  }

  export type CaseUpdateOneRequiredWithoutMedicalOpinionsNestedInput = {
    create?: XOR<CaseCreateWithoutMedicalOpinionsInput, CaseUncheckedCreateWithoutMedicalOpinionsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutMedicalOpinionsInput
    upsert?: CaseUpsertWithoutMedicalOpinionsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutMedicalOpinionsInput, CaseUpdateWithoutMedicalOpinionsInput>, CaseUncheckedUpdateWithoutMedicalOpinionsInput>
  }

  export type MedicalProfessionalUpdateOneRequiredWithoutMedicalOpinionsNestedInput = {
    create?: XOR<MedicalProfessionalCreateWithoutMedicalOpinionsInput, MedicalProfessionalUncheckedCreateWithoutMedicalOpinionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutMedicalOpinionsInput
    upsert?: MedicalProfessionalUpsertWithoutMedicalOpinionsInput
    connect?: MedicalProfessionalWhereUniqueInput
    update?: XOR<XOR<MedicalProfessionalUpdateToOneWithWhereWithoutMedicalOpinionsInput, MedicalProfessionalUpdateWithoutMedicalOpinionsInput>, MedicalProfessionalUncheckedUpdateWithoutMedicalOpinionsInput>
  }

  export type CaseCreateNestedOneWithoutProfessionalPaymentsInput = {
    create?: XOR<CaseCreateWithoutProfessionalPaymentsInput, CaseUncheckedCreateWithoutProfessionalPaymentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutProfessionalPaymentsInput
    connect?: CaseWhereUniqueInput
  }

  export type MedicalProfessionalCreateNestedOneWithoutProfessionalPaymentsInput = {
    create?: XOR<MedicalProfessionalCreateWithoutProfessionalPaymentsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalPaymentsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutProfessionalPaymentsInput
    connect?: MedicalProfessionalWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CaseUpdateOneRequiredWithoutProfessionalPaymentsNestedInput = {
    create?: XOR<CaseCreateWithoutProfessionalPaymentsInput, CaseUncheckedCreateWithoutProfessionalPaymentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutProfessionalPaymentsInput
    upsert?: CaseUpsertWithoutProfessionalPaymentsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutProfessionalPaymentsInput, CaseUpdateWithoutProfessionalPaymentsInput>, CaseUncheckedUpdateWithoutProfessionalPaymentsInput>
  }

  export type MedicalProfessionalUpdateOneRequiredWithoutProfessionalPaymentsNestedInput = {
    create?: XOR<MedicalProfessionalCreateWithoutProfessionalPaymentsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalPaymentsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutProfessionalPaymentsInput
    upsert?: MedicalProfessionalUpsertWithoutProfessionalPaymentsInput
    connect?: MedicalProfessionalWhereUniqueInput
    update?: XOR<XOR<MedicalProfessionalUpdateToOneWithWhereWithoutProfessionalPaymentsInput, MedicalProfessionalUpdateWithoutProfessionalPaymentsInput>, MedicalProfessionalUncheckedUpdateWithoutProfessionalPaymentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumCommunicationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[]
    notIn?: $Enums.CommunicationChannel[]
    not?: NestedEnumCommunicationChannelFilter<$PrismaModel> | $Enums.CommunicationChannel
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCommunicationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CommunicationChannel | EnumCommunicationChannelFieldRefInput<$PrismaModel>
    in?: $Enums.CommunicationChannel[]
    notIn?: $Enums.CommunicationChannel[]
    not?: NestedEnumCommunicationChannelWithAggregatesFilter<$PrismaModel> | $Enums.CommunicationChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCommunicationChannelFilter<$PrismaModel>
    _max?: NestedEnumCommunicationChannelFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumProLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ProLevel | EnumProLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProLevel[]
    notIn?: $Enums.ProLevel[]
    not?: NestedEnumProLevelFilter<$PrismaModel> | $Enums.ProLevel
  }

  export type NestedEnumTwoFactorMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.TwoFactorMethod | EnumTwoFactorMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TwoFactorMethod[]
    notIn?: $Enums.TwoFactorMethod[]
    not?: NestedEnumTwoFactorMethodFilter<$PrismaModel> | $Enums.TwoFactorMethod
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumProLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProLevel | EnumProLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ProLevel[]
    notIn?: $Enums.ProLevel[]
    not?: NestedEnumProLevelWithAggregatesFilter<$PrismaModel> | $Enums.ProLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProLevelFilter<$PrismaModel>
    _max?: NestedEnumProLevelFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type NestedEnumTwoFactorMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TwoFactorMethod | EnumTwoFactorMethodFieldRefInput<$PrismaModel>
    in?: $Enums.TwoFactorMethod[]
    notIn?: $Enums.TwoFactorMethod[]
    not?: NestedEnumTwoFactorMethodWithAggregatesFilter<$PrismaModel> | $Enums.TwoFactorMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTwoFactorMethodFilter<$PrismaModel>
    _max?: NestedEnumTwoFactorMethodFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type CustomerCreateWithoutUserInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    preferredChannel?: $Enums.CommunicationChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    preferredChannel?: $Enums.CommunicationChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutUserInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
  }

  export type CustomerUpsertWithoutUserInput = {
    update: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutUserInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserCreateWithoutCustomerInput = {
    id?: string
    email: string
    hashedPassword: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutCustomerInput = {
    id?: string
    email: string
    hashedPassword: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutCustomerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
  }

  export type CaseCreateWithoutCustomerInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutCustomerInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutCustomerInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput>
  }

  export type CaseCreateManyCustomerInputEnvelope = {
    data: CaseCreateManyCustomerInput | CaseCreateManyCustomerInput[]
  }

  export type UserUpsertWithoutCustomerInput = {
    update: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type UserUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseUpsertWithWhereUniqueWithoutCustomerInput = {
    where: CaseWhereUniqueInput
    update: XOR<CaseUpdateWithoutCustomerInput, CaseUncheckedUpdateWithoutCustomerInput>
    create: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput>
  }

  export type CaseUpdateWithWhereUniqueWithoutCustomerInput = {
    where: CaseWhereUniqueInput
    data: XOR<CaseUpdateWithoutCustomerInput, CaseUncheckedUpdateWithoutCustomerInput>
  }

  export type CaseUpdateManyWithWhereWithoutCustomerInput = {
    where: CaseScalarWhereInput
    data: XOR<CaseUpdateManyMutationInput, CaseUncheckedUpdateManyWithoutCustomerInput>
  }

  export type CaseScalarWhereInput = {
    AND?: CaseScalarWhereInput | CaseScalarWhereInput[]
    OR?: CaseScalarWhereInput[]
    NOT?: CaseScalarWhereInput | CaseScalarWhereInput[]
    id?: StringFilter<"Case"> | string
    caseNumber?: StringFilter<"Case"> | string
    firstName?: StringFilter<"Case"> | string
    middleName?: StringNullableFilter<"Case"> | string | null
    lastName?: StringFilter<"Case"> | string
    dateOfBirth?: DateTimeFilter<"Case"> | Date | string
    email?: StringFilter<"Case"> | string
    phone?: StringNullableFilter<"Case"> | string | null
    ethnicity?: StringNullableFilter<"Case"> | string | null
    gender?: StringNullableFilter<"Case"> | string | null
    diseaseType?: StringNullableFilter<"Case"> | string | null
    isFirstOccurrence?: BoolNullableFilter<"Case"> | boolean | null
    geneticFamilyHistory?: StringNullableFilter<"Case"> | string | null
    paymentId?: StringNullableFilter<"Case"> | string | null
    consentAccepted?: BoolFilter<"Case"> | boolean
    customerId?: StringFilter<"Case"> | string
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
  }

  export type CustomerCreateWithoutCasesInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    preferredChannel?: $Enums.CommunicationChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutCasesInput = {
    id?: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    preferredChannel?: $Enums.CommunicationChannel
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutCasesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
  }

  export type UploadedFileCreateWithoutCaseInput = {
    id?: string
    filename: string
    s3Key: string
    mimetype: string
    size: number
    category: string
    createdAt?: Date | string
  }

  export type UploadedFileUncheckedCreateWithoutCaseInput = {
    id?: string
    filename: string
    s3Key: string
    mimetype: string
    size: number
    category: string
    createdAt?: Date | string
  }

  export type UploadedFileCreateOrConnectWithoutCaseInput = {
    where: UploadedFileWhereUniqueInput
    create: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput>
  }

  export type UploadedFileCreateManyCaseInputEnvelope = {
    data: UploadedFileCreateManyCaseInput | UploadedFileCreateManyCaseInput[]
  }

  export type CaseAssignmentCreateWithoutCaseInput = {
    id?: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
    professional: MedicalProfessionalCreateNestedOneWithoutCaseAssignmentsInput
  }

  export type CaseAssignmentUncheckedCreateWithoutCaseInput = {
    id?: string
    professionalId: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CaseAssignmentCreateOrConnectWithoutCaseInput = {
    where: CaseAssignmentWhereUniqueInput
    create: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput>
  }

  export type CaseAssignmentCreateManyCaseInputEnvelope = {
    data: CaseAssignmentCreateManyCaseInput | CaseAssignmentCreateManyCaseInput[]
  }

  export type AIAnalysisCreateWithoutCaseInput = {
    id?: string
    analysisType: string
    results: string
    createdAt?: Date | string
  }

  export type AIAnalysisUncheckedCreateWithoutCaseInput = {
    id?: string
    analysisType: string
    results: string
    createdAt?: Date | string
  }

  export type AIAnalysisCreateOrConnectWithoutCaseInput = {
    where: AIAnalysisWhereUniqueInput
    create: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
  }

  export type AIAnalysisCreateManyCaseInputEnvelope = {
    data: AIAnalysisCreateManyCaseInput | AIAnalysisCreateManyCaseInput[]
  }

  export type MedicalOpinionCreateWithoutCaseInput = {
    id?: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: MedicalProfessionalCreateNestedOneWithoutMedicalOpinionsInput
  }

  export type MedicalOpinionUncheckedCreateWithoutCaseInput = {
    id?: string
    professionalId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalOpinionCreateOrConnectWithoutCaseInput = {
    where: MedicalOpinionWhereUniqueInput
    create: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput>
  }

  export type MedicalOpinionCreateManyCaseInputEnvelope = {
    data: MedicalOpinionCreateManyCaseInput | MedicalOpinionCreateManyCaseInput[]
  }

  export type ProfessionalPaymentCreateWithoutCaseInput = {
    id?: string
    amount: number
    status?: string
    createdAt?: Date | string
    professional: MedicalProfessionalCreateNestedOneWithoutProfessionalPaymentsInput
  }

  export type ProfessionalPaymentUncheckedCreateWithoutCaseInput = {
    id?: string
    professionalId: string
    amount: number
    status?: string
    createdAt?: Date | string
  }

  export type ProfessionalPaymentCreateOrConnectWithoutCaseInput = {
    where: ProfessionalPaymentWhereUniqueInput
    create: XOR<ProfessionalPaymentCreateWithoutCaseInput, ProfessionalPaymentUncheckedCreateWithoutCaseInput>
  }

  export type ProfessionalPaymentCreateManyCaseInputEnvelope = {
    data: ProfessionalPaymentCreateManyCaseInput | ProfessionalPaymentCreateManyCaseInput[]
  }

  export type CustomerUpsertWithoutCasesInput = {
    update: XOR<CustomerUpdateWithoutCasesInput, CustomerUncheckedUpdateWithoutCasesInput>
    create: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutCasesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutCasesInput, CustomerUncheckedUpdateWithoutCasesInput>
  }

  export type CustomerUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredChannel?: EnumCommunicationChannelFieldUpdateOperationsInput | $Enums.CommunicationChannel
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUpsertWithWhereUniqueWithoutCaseInput = {
    where: UploadedFileWhereUniqueInput
    update: XOR<UploadedFileUpdateWithoutCaseInput, UploadedFileUncheckedUpdateWithoutCaseInput>
    create: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput>
  }

  export type UploadedFileUpdateWithWhereUniqueWithoutCaseInput = {
    where: UploadedFileWhereUniqueInput
    data: XOR<UploadedFileUpdateWithoutCaseInput, UploadedFileUncheckedUpdateWithoutCaseInput>
  }

  export type UploadedFileUpdateManyWithWhereWithoutCaseInput = {
    where: UploadedFileScalarWhereInput
    data: XOR<UploadedFileUpdateManyMutationInput, UploadedFileUncheckedUpdateManyWithoutCaseInput>
  }

  export type UploadedFileScalarWhereInput = {
    AND?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
    OR?: UploadedFileScalarWhereInput[]
    NOT?: UploadedFileScalarWhereInput | UploadedFileScalarWhereInput[]
    id?: StringFilter<"UploadedFile"> | string
    caseId?: StringFilter<"UploadedFile"> | string
    filename?: StringFilter<"UploadedFile"> | string
    s3Key?: StringFilter<"UploadedFile"> | string
    mimetype?: StringFilter<"UploadedFile"> | string
    size?: IntFilter<"UploadedFile"> | number
    category?: StringFilter<"UploadedFile"> | string
    createdAt?: DateTimeFilter<"UploadedFile"> | Date | string
  }

  export type CaseAssignmentUpsertWithWhereUniqueWithoutCaseInput = {
    where: CaseAssignmentWhereUniqueInput
    update: XOR<CaseAssignmentUpdateWithoutCaseInput, CaseAssignmentUncheckedUpdateWithoutCaseInput>
    create: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput>
  }

  export type CaseAssignmentUpdateWithWhereUniqueWithoutCaseInput = {
    where: CaseAssignmentWhereUniqueInput
    data: XOR<CaseAssignmentUpdateWithoutCaseInput, CaseAssignmentUncheckedUpdateWithoutCaseInput>
  }

  export type CaseAssignmentUpdateManyWithWhereWithoutCaseInput = {
    where: CaseAssignmentScalarWhereInput
    data: XOR<CaseAssignmentUpdateManyMutationInput, CaseAssignmentUncheckedUpdateManyWithoutCaseInput>
  }

  export type CaseAssignmentScalarWhereInput = {
    AND?: CaseAssignmentScalarWhereInput | CaseAssignmentScalarWhereInput[]
    OR?: CaseAssignmentScalarWhereInput[]
    NOT?: CaseAssignmentScalarWhereInput | CaseAssignmentScalarWhereInput[]
    id?: StringFilter<"CaseAssignment"> | string
    caseId?: StringFilter<"CaseAssignment"> | string
    professionalId?: StringFilter<"CaseAssignment"> | string
    status?: StringFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
  }

  export type AIAnalysisUpsertWithWhereUniqueWithoutCaseInput = {
    where: AIAnalysisWhereUniqueInput
    update: XOR<AIAnalysisUpdateWithoutCaseInput, AIAnalysisUncheckedUpdateWithoutCaseInput>
    create: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
  }

  export type AIAnalysisUpdateWithWhereUniqueWithoutCaseInput = {
    where: AIAnalysisWhereUniqueInput
    data: XOR<AIAnalysisUpdateWithoutCaseInput, AIAnalysisUncheckedUpdateWithoutCaseInput>
  }

  export type AIAnalysisUpdateManyWithWhereWithoutCaseInput = {
    where: AIAnalysisScalarWhereInput
    data: XOR<AIAnalysisUpdateManyMutationInput, AIAnalysisUncheckedUpdateManyWithoutCaseInput>
  }

  export type AIAnalysisScalarWhereInput = {
    AND?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
    OR?: AIAnalysisScalarWhereInput[]
    NOT?: AIAnalysisScalarWhereInput | AIAnalysisScalarWhereInput[]
    id?: StringFilter<"AIAnalysis"> | string
    caseId?: StringFilter<"AIAnalysis"> | string
    analysisType?: StringFilter<"AIAnalysis"> | string
    results?: StringFilter<"AIAnalysis"> | string
    createdAt?: DateTimeFilter<"AIAnalysis"> | Date | string
  }

  export type MedicalOpinionUpsertWithWhereUniqueWithoutCaseInput = {
    where: MedicalOpinionWhereUniqueInput
    update: XOR<MedicalOpinionUpdateWithoutCaseInput, MedicalOpinionUncheckedUpdateWithoutCaseInput>
    create: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput>
  }

  export type MedicalOpinionUpdateWithWhereUniqueWithoutCaseInput = {
    where: MedicalOpinionWhereUniqueInput
    data: XOR<MedicalOpinionUpdateWithoutCaseInput, MedicalOpinionUncheckedUpdateWithoutCaseInput>
  }

  export type MedicalOpinionUpdateManyWithWhereWithoutCaseInput = {
    where: MedicalOpinionScalarWhereInput
    data: XOR<MedicalOpinionUpdateManyMutationInput, MedicalOpinionUncheckedUpdateManyWithoutCaseInput>
  }

  export type MedicalOpinionScalarWhereInput = {
    AND?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
    OR?: MedicalOpinionScalarWhereInput[]
    NOT?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
    id?: StringFilter<"MedicalOpinion"> | string
    caseId?: StringFilter<"MedicalOpinion"> | string
    professionalId?: StringFilter<"MedicalOpinion"> | string
    content?: StringFilter<"MedicalOpinion"> | string
    status?: StringFilter<"MedicalOpinion"> | string
    createdAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
  }

  export type ProfessionalPaymentUpsertWithWhereUniqueWithoutCaseInput = {
    where: ProfessionalPaymentWhereUniqueInput
    update: XOR<ProfessionalPaymentUpdateWithoutCaseInput, ProfessionalPaymentUncheckedUpdateWithoutCaseInput>
    create: XOR<ProfessionalPaymentCreateWithoutCaseInput, ProfessionalPaymentUncheckedCreateWithoutCaseInput>
  }

  export type ProfessionalPaymentUpdateWithWhereUniqueWithoutCaseInput = {
    where: ProfessionalPaymentWhereUniqueInput
    data: XOR<ProfessionalPaymentUpdateWithoutCaseInput, ProfessionalPaymentUncheckedUpdateWithoutCaseInput>
  }

  export type ProfessionalPaymentUpdateManyWithWhereWithoutCaseInput = {
    where: ProfessionalPaymentScalarWhereInput
    data: XOR<ProfessionalPaymentUpdateManyMutationInput, ProfessionalPaymentUncheckedUpdateManyWithoutCaseInput>
  }

  export type ProfessionalPaymentScalarWhereInput = {
    AND?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
    OR?: ProfessionalPaymentScalarWhereInput[]
    NOT?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
    id?: StringFilter<"ProfessionalPayment"> | string
    caseId?: StringFilter<"ProfessionalPayment"> | string
    professionalId?: StringFilter<"ProfessionalPayment"> | string
    amount?: FloatFilter<"ProfessionalPayment"> | number
    status?: StringFilter<"ProfessionalPayment"> | string
    createdAt?: DateTimeFilter<"ProfessionalPayment"> | Date | string
  }

  export type CaseCreateWithoutUploadedFilesInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutUploadedFilesInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutUploadedFilesInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutUploadedFilesInput, CaseUncheckedCreateWithoutUploadedFilesInput>
  }

  export type CaseUpsertWithoutUploadedFilesInput = {
    update: XOR<CaseUpdateWithoutUploadedFilesInput, CaseUncheckedUpdateWithoutUploadedFilesInput>
    create: XOR<CaseCreateWithoutUploadedFilesInput, CaseUncheckedCreateWithoutUploadedFilesInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutUploadedFilesInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutUploadedFilesInput, CaseUncheckedUpdateWithoutUploadedFilesInput>
  }

  export type CaseUpdateWithoutUploadedFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutUploadedFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseAssignmentCreateWithoutProfessionalInput = {
    id?: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
    case: CaseCreateNestedOneWithoutCaseAssignmentsInput
  }

  export type CaseAssignmentUncheckedCreateWithoutProfessionalInput = {
    id?: string
    caseId: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type CaseAssignmentCreateOrConnectWithoutProfessionalInput = {
    where: CaseAssignmentWhereUniqueInput
    create: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput>
  }

  export type CaseAssignmentCreateManyProfessionalInputEnvelope = {
    data: CaseAssignmentCreateManyProfessionalInput | CaseAssignmentCreateManyProfessionalInput[]
  }

  export type MedicalOpinionCreateWithoutProfessionalInput = {
    id?: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    case: CaseCreateNestedOneWithoutMedicalOpinionsInput
  }

  export type MedicalOpinionUncheckedCreateWithoutProfessionalInput = {
    id?: string
    caseId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalOpinionCreateOrConnectWithoutProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    create: XOR<MedicalOpinionCreateWithoutProfessionalInput, MedicalOpinionUncheckedCreateWithoutProfessionalInput>
  }

  export type MedicalOpinionCreateManyProfessionalInputEnvelope = {
    data: MedicalOpinionCreateManyProfessionalInput | MedicalOpinionCreateManyProfessionalInput[]
  }

  export type ProfessionalPaymentCreateWithoutProfessionalInput = {
    id?: string
    amount: number
    status?: string
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutProfessionalPaymentsInput
  }

  export type ProfessionalPaymentUncheckedCreateWithoutProfessionalInput = {
    id?: string
    caseId: string
    amount: number
    status?: string
    createdAt?: Date | string
  }

  export type ProfessionalPaymentCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalPaymentWhereUniqueInput
    create: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalPaymentCreateManyProfessionalInputEnvelope = {
    data: ProfessionalPaymentCreateManyProfessionalInput | ProfessionalPaymentCreateManyProfessionalInput[]
  }

  export type ProfessionalSessionCreateWithoutProfessionalInput = {
    id?: string
    sessionToken: string
    twoFactorVerified?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ProfessionalSessionUncheckedCreateWithoutProfessionalInput = {
    id?: string
    sessionToken: string
    twoFactorVerified?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ProfessionalSessionCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalSessionWhereUniqueInput
    create: XOR<ProfessionalSessionCreateWithoutProfessionalInput, ProfessionalSessionUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalSessionCreateManyProfessionalInputEnvelope = {
    data: ProfessionalSessionCreateManyProfessionalInput | ProfessionalSessionCreateManyProfessionalInput[]
  }

  export type CaseAssignmentUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: CaseAssignmentWhereUniqueInput
    update: XOR<CaseAssignmentUpdateWithoutProfessionalInput, CaseAssignmentUncheckedUpdateWithoutProfessionalInput>
    create: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput>
  }

  export type CaseAssignmentUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: CaseAssignmentWhereUniqueInput
    data: XOR<CaseAssignmentUpdateWithoutProfessionalInput, CaseAssignmentUncheckedUpdateWithoutProfessionalInput>
  }

  export type CaseAssignmentUpdateManyWithWhereWithoutProfessionalInput = {
    where: CaseAssignmentScalarWhereInput
    data: XOR<CaseAssignmentUpdateManyMutationInput, CaseAssignmentUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type MedicalOpinionUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    update: XOR<MedicalOpinionUpdateWithoutProfessionalInput, MedicalOpinionUncheckedUpdateWithoutProfessionalInput>
    create: XOR<MedicalOpinionCreateWithoutProfessionalInput, MedicalOpinionUncheckedCreateWithoutProfessionalInput>
  }

  export type MedicalOpinionUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    data: XOR<MedicalOpinionUpdateWithoutProfessionalInput, MedicalOpinionUncheckedUpdateWithoutProfessionalInput>
  }

  export type MedicalOpinionUpdateManyWithWhereWithoutProfessionalInput = {
    where: MedicalOpinionScalarWhereInput
    data: XOR<MedicalOpinionUpdateManyMutationInput, MedicalOpinionUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalPaymentUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalPaymentWhereUniqueInput
    update: XOR<ProfessionalPaymentUpdateWithoutProfessionalInput, ProfessionalPaymentUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalPaymentUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalPaymentWhereUniqueInput
    data: XOR<ProfessionalPaymentUpdateWithoutProfessionalInput, ProfessionalPaymentUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalPaymentUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalPaymentScalarWhereInput
    data: XOR<ProfessionalPaymentUpdateManyMutationInput, ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalSessionUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalSessionWhereUniqueInput
    update: XOR<ProfessionalSessionUpdateWithoutProfessionalInput, ProfessionalSessionUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalSessionCreateWithoutProfessionalInput, ProfessionalSessionUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalSessionUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalSessionWhereUniqueInput
    data: XOR<ProfessionalSessionUpdateWithoutProfessionalInput, ProfessionalSessionUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalSessionUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalSessionScalarWhereInput
    data: XOR<ProfessionalSessionUpdateManyMutationInput, ProfessionalSessionUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalSessionScalarWhereInput = {
    AND?: ProfessionalSessionScalarWhereInput | ProfessionalSessionScalarWhereInput[]
    OR?: ProfessionalSessionScalarWhereInput[]
    NOT?: ProfessionalSessionScalarWhereInput | ProfessionalSessionScalarWhereInput[]
    id?: StringFilter<"ProfessionalSession"> | string
    professionalId?: StringFilter<"ProfessionalSession"> | string
    sessionToken?: StringFilter<"ProfessionalSession"> | string
    twoFactorVerified?: BoolFilter<"ProfessionalSession"> | boolean
    expiresAt?: DateTimeFilter<"ProfessionalSession"> | Date | string
    createdAt?: DateTimeFilter<"ProfessionalSession"> | Date | string
  }

  export type MedicalProfessionalCreateWithoutProfessionalSessionsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutProfessionalSessionsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalCreateOrConnectWithoutProfessionalSessionsInput = {
    where: MedicalProfessionalWhereUniqueInput
    create: XOR<MedicalProfessionalCreateWithoutProfessionalSessionsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalSessionsInput>
  }

  export type MedicalProfessionalUpsertWithoutProfessionalSessionsInput = {
    update: XOR<MedicalProfessionalUpdateWithoutProfessionalSessionsInput, MedicalProfessionalUncheckedUpdateWithoutProfessionalSessionsInput>
    create: XOR<MedicalProfessionalCreateWithoutProfessionalSessionsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalSessionsInput>
    where?: MedicalProfessionalWhereInput
  }

  export type MedicalProfessionalUpdateToOneWithWhereWithoutProfessionalSessionsInput = {
    where?: MedicalProfessionalWhereInput
    data: XOR<MedicalProfessionalUpdateWithoutProfessionalSessionsInput, MedicalProfessionalUncheckedUpdateWithoutProfessionalSessionsInput>
  }

  export type MedicalProfessionalUpdateWithoutProfessionalSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutProfessionalSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CaseCreateWithoutCaseAssignmentsInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutCaseAssignmentsInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutCaseAssignmentsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutCaseAssignmentsInput, CaseUncheckedCreateWithoutCaseAssignmentsInput>
  }

  export type MedicalProfessionalCreateWithoutCaseAssignmentsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutCaseAssignmentsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalCreateOrConnectWithoutCaseAssignmentsInput = {
    where: MedicalProfessionalWhereUniqueInput
    create: XOR<MedicalProfessionalCreateWithoutCaseAssignmentsInput, MedicalProfessionalUncheckedCreateWithoutCaseAssignmentsInput>
  }

  export type CaseUpsertWithoutCaseAssignmentsInput = {
    update: XOR<CaseUpdateWithoutCaseAssignmentsInput, CaseUncheckedUpdateWithoutCaseAssignmentsInput>
    create: XOR<CaseCreateWithoutCaseAssignmentsInput, CaseUncheckedCreateWithoutCaseAssignmentsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutCaseAssignmentsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutCaseAssignmentsInput, CaseUncheckedUpdateWithoutCaseAssignmentsInput>
  }

  export type CaseUpdateWithoutCaseAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutCaseAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type MedicalProfessionalUpsertWithoutCaseAssignmentsInput = {
    update: XOR<MedicalProfessionalUpdateWithoutCaseAssignmentsInput, MedicalProfessionalUncheckedUpdateWithoutCaseAssignmentsInput>
    create: XOR<MedicalProfessionalCreateWithoutCaseAssignmentsInput, MedicalProfessionalUncheckedCreateWithoutCaseAssignmentsInput>
    where?: MedicalProfessionalWhereInput
  }

  export type MedicalProfessionalUpdateToOneWithWhereWithoutCaseAssignmentsInput = {
    where?: MedicalProfessionalWhereInput
    data: XOR<MedicalProfessionalUpdateWithoutCaseAssignmentsInput, MedicalProfessionalUncheckedUpdateWithoutCaseAssignmentsInput>
  }

  export type MedicalProfessionalUpdateWithoutCaseAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalOpinions?: MedicalOpinionUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutCaseAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CaseCreateWithoutAiAnalysesInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutAiAnalysesInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutAiAnalysesInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutAiAnalysesInput, CaseUncheckedCreateWithoutAiAnalysesInput>
  }

  export type CaseUpsertWithoutAiAnalysesInput = {
    update: XOR<CaseUpdateWithoutAiAnalysesInput, CaseUncheckedUpdateWithoutAiAnalysesInput>
    create: XOR<CaseCreateWithoutAiAnalysesInput, CaseUncheckedCreateWithoutAiAnalysesInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutAiAnalysesInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutAiAnalysesInput, CaseUncheckedUpdateWithoutAiAnalysesInput>
  }

  export type CaseUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutAiAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateWithoutMedicalOpinionsInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutMedicalOpinionsInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutCaseInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutMedicalOpinionsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutMedicalOpinionsInput, CaseUncheckedCreateWithoutMedicalOpinionsInput>
  }

  export type MedicalProfessionalCreateWithoutMedicalOpinionsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutMedicalOpinionsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    professionalPayments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalCreateOrConnectWithoutMedicalOpinionsInput = {
    where: MedicalProfessionalWhereUniqueInput
    create: XOR<MedicalProfessionalCreateWithoutMedicalOpinionsInput, MedicalProfessionalUncheckedCreateWithoutMedicalOpinionsInput>
  }

  export type CaseUpsertWithoutMedicalOpinionsInput = {
    update: XOR<CaseUpdateWithoutMedicalOpinionsInput, CaseUncheckedUpdateWithoutMedicalOpinionsInput>
    create: XOR<CaseCreateWithoutMedicalOpinionsInput, CaseUncheckedCreateWithoutMedicalOpinionsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutMedicalOpinionsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutMedicalOpinionsInput, CaseUncheckedUpdateWithoutMedicalOpinionsInput>
  }

  export type CaseUpdateWithoutMedicalOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutMedicalOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type MedicalProfessionalUpsertWithoutMedicalOpinionsInput = {
    update: XOR<MedicalProfessionalUpdateWithoutMedicalOpinionsInput, MedicalProfessionalUncheckedUpdateWithoutMedicalOpinionsInput>
    create: XOR<MedicalProfessionalCreateWithoutMedicalOpinionsInput, MedicalProfessionalUncheckedCreateWithoutMedicalOpinionsInput>
    where?: MedicalProfessionalWhereInput
  }

  export type MedicalProfessionalUpdateToOneWithWhereWithoutMedicalOpinionsInput = {
    where?: MedicalProfessionalWhereInput
    data: XOR<MedicalProfessionalUpdateWithoutMedicalOpinionsInput, MedicalProfessionalUncheckedUpdateWithoutMedicalOpinionsInput>
  }

  export type MedicalProfessionalUpdateWithoutMedicalOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutMedicalOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CaseCreateWithoutProfessionalPaymentsInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutProfessionalPaymentsInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    customerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    aiAnalyses?: AIAnalysisUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutProfessionalPaymentsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutProfessionalPaymentsInput, CaseUncheckedCreateWithoutProfessionalPaymentsInput>
  }

  export type MedicalProfessionalCreateWithoutProfessionalPaymentsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutProfessionalPaymentsInput = {
    id?: string
    proNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dob: Date | string
    email: string
    phone?: string | null
    nationality?: string | null
    licenseNumber: string
    licenseCountry: string
    licenseExpiry: Date | string
    vetted?: boolean
    level?: $Enums.ProLevel
    cvUrl?: string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: string | null
    yearsPractice: number
    publications: number
    trialInvolved: boolean
    leadership?: string | null
    societyMemberships?: string | null
    score?: number | null
    hashedPassword?: string | null
    twoFactorMethod?: $Enums.TwoFactorMethod
    twoFactorSecret?: string | null
    profileLastUpdated?: Date | string | null
    codeOfConductAcknowledged?: Date | string | null
    address?: string | null
    billingAddress?: string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: string | null
    billingRate?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutProfessionalInput
    professionalSessions?: ProfessionalSessionUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalCreateOrConnectWithoutProfessionalPaymentsInput = {
    where: MedicalProfessionalWhereUniqueInput
    create: XOR<MedicalProfessionalCreateWithoutProfessionalPaymentsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalPaymentsInput>
  }

  export type CaseUpsertWithoutProfessionalPaymentsInput = {
    update: XOR<CaseUpdateWithoutProfessionalPaymentsInput, CaseUncheckedUpdateWithoutProfessionalPaymentsInput>
    create: XOR<CaseCreateWithoutProfessionalPaymentsInput, CaseUncheckedCreateWithoutProfessionalPaymentsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutProfessionalPaymentsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutProfessionalPaymentsInput, CaseUncheckedUpdateWithoutProfessionalPaymentsInput>
  }

  export type CaseUpdateWithoutProfessionalPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutProfessionalPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    customerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type MedicalProfessionalUpsertWithoutProfessionalPaymentsInput = {
    update: XOR<MedicalProfessionalUpdateWithoutProfessionalPaymentsInput, MedicalProfessionalUncheckedUpdateWithoutProfessionalPaymentsInput>
    create: XOR<MedicalProfessionalCreateWithoutProfessionalPaymentsInput, MedicalProfessionalUncheckedCreateWithoutProfessionalPaymentsInput>
    where?: MedicalProfessionalWhereInput
  }

  export type MedicalProfessionalUpdateToOneWithWhereWithoutProfessionalPaymentsInput = {
    where?: MedicalProfessionalWhereInput
    data: XOR<MedicalProfessionalUpdateWithoutProfessionalPaymentsInput, MedicalProfessionalUncheckedUpdateWithoutProfessionalPaymentsInput>
  }

  export type MedicalProfessionalUpdateWithoutProfessionalPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutProfessionalPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    proNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dob?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    licenseCountry?: StringFieldUpdateOperationsInput | string
    licenseExpiry?: DateTimeFieldUpdateOperationsInput | Date | string
    vetted?: BoolFieldUpdateOperationsInput | boolean
    level?: EnumProLevelFieldUpdateOperationsInput | $Enums.ProLevel
    cvUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableJsonNullValueInput | InputJsonValue
    subspecialties?: NullableStringFieldUpdateOperationsInput | string | null
    yearsPractice?: IntFieldUpdateOperationsInput | number
    publications?: IntFieldUpdateOperationsInput | number
    trialInvolved?: BoolFieldUpdateOperationsInput | boolean
    leadership?: NullableStringFieldUpdateOperationsInput | string | null
    societyMemberships?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableIntFieldUpdateOperationsInput | number | null
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorMethod?: EnumTwoFactorMethodFieldUpdateOperationsInput | $Enums.TwoFactorMethod
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    profileLastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    codeOfConductAcknowledged?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    bankDetails?: NullableJsonNullValueInput | InputJsonValue
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    billingRate?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutProfessionalNestedInput
    professionalSessions?: ProfessionalSessionUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CaseCreateManyCustomerInput = {
    id?: string
    caseNumber: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    ethnicity?: string | null
    gender?: string | null
    diseaseType?: string | null
    isFirstOccurrence?: boolean | null
    geneticFamilyHistory?: string | null
    paymentId?: string | null
    consentAccepted: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalyses?: AIAnalysisUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
    professionalPayments?: ProfessionalPaymentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileCreateManyCaseInput = {
    id?: string
    filename: string
    s3Key: string
    mimetype: string
    size: number
    category: string
    createdAt?: Date | string
  }

  export type CaseAssignmentCreateManyCaseInput = {
    id?: string
    professionalId: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIAnalysisCreateManyCaseInput = {
    id?: string
    analysisType: string
    results: string
    createdAt?: Date | string
  }

  export type MedicalOpinionCreateManyCaseInput = {
    id?: string
    professionalId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalPaymentCreateManyCaseInput = {
    id?: string
    professionalId: string
    amount: number
    status?: string
    createdAt?: Date | string
  }

  export type UploadedFileUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    professional?: MedicalProfessionalUpdateOneRequiredWithoutCaseAssignmentsNestedInput
  }

  export type CaseAssignmentUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIAnalysisUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIAnalysisUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    results?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalOpinionUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: MedicalProfessionalUpdateOneRequiredWithoutMedicalOpinionsNestedInput
  }

  export type MedicalOpinionUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalPaymentUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: MedicalProfessionalUpdateOneRequiredWithoutProfessionalPaymentsNestedInput
  }

  export type ProfessionalPaymentUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalPaymentUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentCreateManyProfessionalInput = {
    id?: string
    caseId: string
    status?: string
    assignedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type MedicalOpinionCreateManyProfessionalInput = {
    id?: string
    caseId: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalPaymentCreateManyProfessionalInput = {
    id?: string
    caseId: string
    amount: number
    status?: string
    createdAt?: Date | string
  }

  export type ProfessionalSessionCreateManyProfessionalInput = {
    id?: string
    sessionToken: string
    twoFactorVerified?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type CaseAssignmentUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutCaseAssignmentsNestedInput
  }

  export type CaseAssignmentUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutMedicalOpinionsNestedInput
  }

  export type MedicalOpinionUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalPaymentUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutProfessionalPaymentsNestedInput
  }

  export type ProfessionalPaymentUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSessionUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    twoFactorVerified?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSessionUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    twoFactorVerified?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalSessionUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    twoFactorVerified?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
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