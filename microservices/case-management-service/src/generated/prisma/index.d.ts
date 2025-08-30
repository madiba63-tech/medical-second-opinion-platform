
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
 * Model Case
 * 
 */
export type Case = $Result.DefaultSelection<Prisma.$CasePayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentExtraction
 * 
 */
export type DocumentExtraction = $Result.DefaultSelection<Prisma.$DocumentExtractionPayload>
/**
 * Model CaseStatusHistory
 * 
 */
export type CaseStatusHistory = $Result.DefaultSelection<Prisma.$CaseStatusHistoryPayload>
/**
 * Model CaseAssignment
 * 
 */
export type CaseAssignment = $Result.DefaultSelection<Prisma.$CaseAssignmentPayload>
/**
 * Model CaseReview
 * 
 */
export type CaseReview = $Result.DefaultSelection<Prisma.$CaseReviewPayload>
/**
 * Model TempCaseSubmission
 * 
 */
export type TempCaseSubmission = $Result.DefaultSelection<Prisma.$TempCaseSubmissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CaseStatus: {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  ASSIGNED: 'ASSIGNED',
  IN_ANALYSIS: 'IN_ANALYSIS',
  AWAITING_PROFESSIONAL: 'AWAITING_PROFESSIONAL',
  PROFESSIONAL_REVIEWING: 'PROFESSIONAL_REVIEWING',
  COMPLETED: 'COMPLETED',
  ON_HOLD: 'ON_HOLD',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type CaseStatus = (typeof CaseStatus)[keyof typeof CaseStatus]


export const CasePriority: {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type CasePriority = (typeof CasePriority)[keyof typeof CasePriority]


export const CaseCategory: {
  ONCOLOGY: 'ONCOLOGY',
  CARDIOLOGY: 'CARDIOLOGY',
  NEUROLOGY: 'NEUROLOGY',
  ORTHOPEDICS: 'ORTHOPEDICS',
  DERMATOLOGY: 'DERMATOLOGY',
  RADIOLOGY: 'RADIOLOGY',
  PATHOLOGY: 'PATHOLOGY',
  GENERAL_MEDICINE: 'GENERAL_MEDICINE',
  PEDIATRICS: 'PEDIATRICS',
  SURGERY: 'SURGERY',
  OTHER: 'OTHER'
};

export type CaseCategory = (typeof CaseCategory)[keyof typeof CaseCategory]


export const DocumentType: {
  MEDICAL_RECORD: 'MEDICAL_RECORD',
  LAB_RESULT: 'LAB_RESULT',
  IMAGING_STUDY: 'IMAGING_STUDY',
  PATHOLOGY_REPORT: 'PATHOLOGY_REPORT',
  PRESCRIPTION: 'PRESCRIPTION',
  DISCHARGE_SUMMARY: 'DISCHARGE_SUMMARY',
  CONSULTATION_REPORT: 'CONSULTATION_REPORT',
  OTHER: 'OTHER'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]


export const DocumentStatus: {
  UPLOADED: 'UPLOADED',
  PROCESSING: 'PROCESSING',
  PROCESSED: 'PROCESSED',
  FAILED: 'FAILED',
  ARCHIVED: 'ARCHIVED'
};

export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus]

}

export type CaseStatus = $Enums.CaseStatus

export const CaseStatus: typeof $Enums.CaseStatus

export type CasePriority = $Enums.CasePriority

export const CasePriority: typeof $Enums.CasePriority

export type CaseCategory = $Enums.CaseCategory

export const CaseCategory: typeof $Enums.CaseCategory

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

export type DocumentStatus = $Enums.DocumentStatus

export const DocumentStatus: typeof $Enums.DocumentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cases
 * const cases = await prisma.case.findMany()
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
   * // Fetch zero or more Cases
   * const cases = await prisma.case.findMany()
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
   * `prisma.case`: Exposes CRUD operations for the **Case** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cases
    * const cases = await prisma.case.findMany()
    * ```
    */
  get case(): Prisma.CaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentExtraction`: Exposes CRUD operations for the **DocumentExtraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentExtractions
    * const documentExtractions = await prisma.documentExtraction.findMany()
    * ```
    */
  get documentExtraction(): Prisma.DocumentExtractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseStatusHistory`: Exposes CRUD operations for the **CaseStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseStatusHistories
    * const caseStatusHistories = await prisma.caseStatusHistory.findMany()
    * ```
    */
  get caseStatusHistory(): Prisma.CaseStatusHistoryDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.caseReview`: Exposes CRUD operations for the **CaseReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseReviews
    * const caseReviews = await prisma.caseReview.findMany()
    * ```
    */
  get caseReview(): Prisma.CaseReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tempCaseSubmission`: Exposes CRUD operations for the **TempCaseSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TempCaseSubmissions
    * const tempCaseSubmissions = await prisma.tempCaseSubmission.findMany()
    * ```
    */
  get tempCaseSubmission(): Prisma.TempCaseSubmissionDelegate<ExtArgs, ClientOptions>;
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
    Case: 'Case',
    Document: 'Document',
    DocumentExtraction: 'DocumentExtraction',
    CaseStatusHistory: 'CaseStatusHistory',
    CaseAssignment: 'CaseAssignment',
    CaseReview: 'CaseReview',
    TempCaseSubmission: 'TempCaseSubmission'
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
      modelProps: "case" | "document" | "documentExtraction" | "caseStatusHistory" | "caseAssignment" | "caseReview" | "tempCaseSubmission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentExtraction: {
        payload: Prisma.$DocumentExtractionPayload<ExtArgs>
        fields: Prisma.DocumentExtractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentExtractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentExtractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>
          }
          findFirst: {
            args: Prisma.DocumentExtractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentExtractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>
          }
          findMany: {
            args: Prisma.DocumentExtractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>[]
          }
          create: {
            args: Prisma.DocumentExtractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>
          }
          createMany: {
            args: Prisma.DocumentExtractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentExtractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>[]
          }
          delete: {
            args: Prisma.DocumentExtractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>
          }
          update: {
            args: Prisma.DocumentExtractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>
          }
          deleteMany: {
            args: Prisma.DocumentExtractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentExtractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentExtractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>[]
          }
          upsert: {
            args: Prisma.DocumentExtractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentExtractionPayload>
          }
          aggregate: {
            args: Prisma.DocumentExtractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentExtraction>
          }
          groupBy: {
            args: Prisma.DocumentExtractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentExtractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentExtractionCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentExtractionCountAggregateOutputType> | number
          }
        }
      }
      CaseStatusHistory: {
        payload: Prisma.$CaseStatusHistoryPayload<ExtArgs>
        fields: Prisma.CaseStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.CaseStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.CaseStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.CaseStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.CaseStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseStatusHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>[]
          }
          delete: {
            args: Prisma.CaseStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>
          }
          update: {
            args: Prisma.CaseStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.CaseStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseStatusHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>[]
          }
          upsert: {
            args: Prisma.CaseStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.CaseStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseStatusHistory>
          }
          groupBy: {
            args: Prisma.CaseStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<CaseStatusHistoryCountAggregateOutputType> | number
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
      CaseReview: {
        payload: Prisma.$CaseReviewPayload<ExtArgs>
        fields: Prisma.CaseReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>
          }
          findFirst: {
            args: Prisma.CaseReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>
          }
          findMany: {
            args: Prisma.CaseReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>[]
          }
          create: {
            args: Prisma.CaseReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>
          }
          createMany: {
            args: Prisma.CaseReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>[]
          }
          delete: {
            args: Prisma.CaseReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>
          }
          update: {
            args: Prisma.CaseReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>
          }
          deleteMany: {
            args: Prisma.CaseReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>[]
          }
          upsert: {
            args: Prisma.CaseReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseReviewPayload>
          }
          aggregate: {
            args: Prisma.CaseReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseReview>
          }
          groupBy: {
            args: Prisma.CaseReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseReviewCountArgs<ExtArgs>
            result: $Utils.Optional<CaseReviewCountAggregateOutputType> | number
          }
        }
      }
      TempCaseSubmission: {
        payload: Prisma.$TempCaseSubmissionPayload<ExtArgs>
        fields: Prisma.TempCaseSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TempCaseSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TempCaseSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>
          }
          findFirst: {
            args: Prisma.TempCaseSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TempCaseSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>
          }
          findMany: {
            args: Prisma.TempCaseSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>[]
          }
          create: {
            args: Prisma.TempCaseSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>
          }
          createMany: {
            args: Prisma.TempCaseSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TempCaseSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>[]
          }
          delete: {
            args: Prisma.TempCaseSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>
          }
          update: {
            args: Prisma.TempCaseSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.TempCaseSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TempCaseSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TempCaseSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.TempCaseSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TempCaseSubmissionPayload>
          }
          aggregate: {
            args: Prisma.TempCaseSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTempCaseSubmission>
          }
          groupBy: {
            args: Prisma.TempCaseSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TempCaseSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TempCaseSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<TempCaseSubmissionCountAggregateOutputType> | number
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
    case?: CaseOmit
    document?: DocumentOmit
    documentExtraction?: DocumentExtractionOmit
    caseStatusHistory?: CaseStatusHistoryOmit
    caseAssignment?: CaseAssignmentOmit
    caseReview?: CaseReviewOmit
    tempCaseSubmission?: TempCaseSubmissionOmit
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
   * Count Type CaseCountOutputType
   */

  export type CaseCountOutputType = {
    documents: number
    statusHistory: number
    assignments: number
    reviews: number
  }

  export type CaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | CaseCountOutputTypeCountDocumentsArgs
    statusHistory?: boolean | CaseCountOutputTypeCountStatusHistoryArgs
    assignments?: boolean | CaseCountOutputTypeCountAssignmentsArgs
    reviews?: boolean | CaseCountOutputTypeCountReviewsArgs
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
  export type CaseCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseStatusHistoryWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseAssignmentWhereInput
  }

  /**
   * CaseCountOutputType without action
   */
  export type CaseCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseReviewWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    extractions: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    extractions?: boolean | DocumentCountOutputTypeCountExtractionsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountExtractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentExtractionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Case
   */

  export type AggregateCase = {
    _count: CaseCountAggregateOutputType | null
    _avg: CaseAvgAggregateOutputType | null
    _sum: CaseSumAggregateOutputType | null
    _min: CaseMinAggregateOutputType | null
    _max: CaseMaxAggregateOutputType | null
  }

  export type CaseAvgAggregateOutputType = {
    qualityScore: number | null
    completenessScore: number | null
    version: number | null
  }

  export type CaseSumAggregateOutputType = {
    qualityScore: number | null
    completenessScore: number | null
    version: number | null
  }

  export type CaseMinAggregateOutputType = {
    id: string | null
    caseNumber: string | null
    customerId: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    email: string | null
    phone: string | null
    title: string | null
    description: string | null
    chiefComplaint: string | null
    category: $Enums.CaseCategory | null
    status: $Enums.CaseStatus | null
    priority: $Enums.CasePriority | null
    urgencyReason: string | null
    submittedAt: Date | null
    reviewStartedAt: Date | null
    completedAt: Date | null
    expiresAt: Date | null
    assignedProfessionalId: string | null
    assignedAt: Date | null
    qualityScore: number | null
    completenessScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
    version: number | null
  }

  export type CaseMaxAggregateOutputType = {
    id: string | null
    caseNumber: string | null
    customerId: string | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    email: string | null
    phone: string | null
    title: string | null
    description: string | null
    chiefComplaint: string | null
    category: $Enums.CaseCategory | null
    status: $Enums.CaseStatus | null
    priority: $Enums.CasePriority | null
    urgencyReason: string | null
    submittedAt: Date | null
    reviewStartedAt: Date | null
    completedAt: Date | null
    expiresAt: Date | null
    assignedProfessionalId: string | null
    assignedAt: Date | null
    qualityScore: number | null
    completenessScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
    version: number | null
  }

  export type CaseCountAggregateOutputType = {
    id: number
    caseNumber: number
    customerId: number
    firstName: number
    middleName: number
    lastName: number
    dateOfBirth: number
    email: number
    phone: number
    title: number
    description: number
    chiefComplaint: number
    category: number
    medicalHistory: number
    currentMedications: number
    allergies: number
    familyHistory: number
    status: number
    priority: number
    urgencyReason: number
    submittedAt: number
    reviewStartedAt: number
    completedAt: number
    expiresAt: number
    assignedProfessionalId: number
    assignedAt: number
    qualityScore: number
    completenessScore: number
    metadata: number
    tags: number
    createdAt: number
    updatedAt: number
    version: number
    _all: number
  }


  export type CaseAvgAggregateInputType = {
    qualityScore?: true
    completenessScore?: true
    version?: true
  }

  export type CaseSumAggregateInputType = {
    qualityScore?: true
    completenessScore?: true
    version?: true
  }

  export type CaseMinAggregateInputType = {
    id?: true
    caseNumber?: true
    customerId?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    title?: true
    description?: true
    chiefComplaint?: true
    category?: true
    status?: true
    priority?: true
    urgencyReason?: true
    submittedAt?: true
    reviewStartedAt?: true
    completedAt?: true
    expiresAt?: true
    assignedProfessionalId?: true
    assignedAt?: true
    qualityScore?: true
    completenessScore?: true
    createdAt?: true
    updatedAt?: true
    version?: true
  }

  export type CaseMaxAggregateInputType = {
    id?: true
    caseNumber?: true
    customerId?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    title?: true
    description?: true
    chiefComplaint?: true
    category?: true
    status?: true
    priority?: true
    urgencyReason?: true
    submittedAt?: true
    reviewStartedAt?: true
    completedAt?: true
    expiresAt?: true
    assignedProfessionalId?: true
    assignedAt?: true
    qualityScore?: true
    completenessScore?: true
    createdAt?: true
    updatedAt?: true
    version?: true
  }

  export type CaseCountAggregateInputType = {
    id?: true
    caseNumber?: true
    customerId?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    email?: true
    phone?: true
    title?: true
    description?: true
    chiefComplaint?: true
    category?: true
    medicalHistory?: true
    currentMedications?: true
    allergies?: true
    familyHistory?: true
    status?: true
    priority?: true
    urgencyReason?: true
    submittedAt?: true
    reviewStartedAt?: true
    completedAt?: true
    expiresAt?: true
    assignedProfessionalId?: true
    assignedAt?: true
    qualityScore?: true
    completenessScore?: true
    metadata?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    version?: true
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
     * Select which fields to average
    **/
    _avg?: CaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CaseSumAggregateInputType
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
    _avg?: CaseAvgAggregateInputType
    _sum?: CaseSumAggregateInputType
    _min?: CaseMinAggregateInputType
    _max?: CaseMaxAggregateInputType
  }

  export type CaseGroupByOutputType = {
    id: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName: string | null
    lastName: string
    dateOfBirth: Date
    email: string
    phone: string | null
    title: string | null
    description: string | null
    chiefComplaint: string | null
    category: $Enums.CaseCategory
    medicalHistory: JsonValue | null
    currentMedications: JsonValue | null
    allergies: JsonValue | null
    familyHistory: JsonValue | null
    status: $Enums.CaseStatus
    priority: $Enums.CasePriority
    urgencyReason: string | null
    submittedAt: Date | null
    reviewStartedAt: Date | null
    completedAt: Date | null
    expiresAt: Date | null
    assignedProfessionalId: string | null
    assignedAt: Date | null
    qualityScore: number | null
    completenessScore: number | null
    metadata: JsonValue | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
    version: number
    _count: CaseCountAggregateOutputType | null
    _avg: CaseAvgAggregateOutputType | null
    _sum: CaseSumAggregateOutputType | null
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
    customerId?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
    description?: boolean
    chiefComplaint?: boolean
    category?: boolean
    medicalHistory?: boolean
    currentMedications?: boolean
    allergies?: boolean
    familyHistory?: boolean
    status?: boolean
    priority?: boolean
    urgencyReason?: boolean
    submittedAt?: boolean
    reviewStartedAt?: boolean
    completedAt?: boolean
    expiresAt?: boolean
    assignedProfessionalId?: boolean
    assignedAt?: boolean
    qualityScore?: boolean
    completenessScore?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    documents?: boolean | Case$documentsArgs<ExtArgs>
    statusHistory?: boolean | Case$statusHistoryArgs<ExtArgs>
    assignments?: boolean | Case$assignmentsArgs<ExtArgs>
    reviews?: boolean | Case$reviewsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["case"]>

  export type CaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseNumber?: boolean
    customerId?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
    description?: boolean
    chiefComplaint?: boolean
    category?: boolean
    medicalHistory?: boolean
    currentMedications?: boolean
    allergies?: boolean
    familyHistory?: boolean
    status?: boolean
    priority?: boolean
    urgencyReason?: boolean
    submittedAt?: boolean
    reviewStartedAt?: boolean
    completedAt?: boolean
    expiresAt?: boolean
    assignedProfessionalId?: boolean
    assignedAt?: boolean
    qualityScore?: boolean
    completenessScore?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
  }, ExtArgs["result"]["case"]>

  export type CaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseNumber?: boolean
    customerId?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
    description?: boolean
    chiefComplaint?: boolean
    category?: boolean
    medicalHistory?: boolean
    currentMedications?: boolean
    allergies?: boolean
    familyHistory?: boolean
    status?: boolean
    priority?: boolean
    urgencyReason?: boolean
    submittedAt?: boolean
    reviewStartedAt?: boolean
    completedAt?: boolean
    expiresAt?: boolean
    assignedProfessionalId?: boolean
    assignedAt?: boolean
    qualityScore?: boolean
    completenessScore?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
  }, ExtArgs["result"]["case"]>

  export type CaseSelectScalar = {
    id?: boolean
    caseNumber?: boolean
    customerId?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    email?: boolean
    phone?: boolean
    title?: boolean
    description?: boolean
    chiefComplaint?: boolean
    category?: boolean
    medicalHistory?: boolean
    currentMedications?: boolean
    allergies?: boolean
    familyHistory?: boolean
    status?: boolean
    priority?: boolean
    urgencyReason?: boolean
    submittedAt?: boolean
    reviewStartedAt?: boolean
    completedAt?: boolean
    expiresAt?: boolean
    assignedProfessionalId?: boolean
    assignedAt?: boolean
    qualityScore?: boolean
    completenessScore?: boolean
    metadata?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
  }

  export type CaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseNumber" | "customerId" | "firstName" | "middleName" | "lastName" | "dateOfBirth" | "email" | "phone" | "title" | "description" | "chiefComplaint" | "category" | "medicalHistory" | "currentMedications" | "allergies" | "familyHistory" | "status" | "priority" | "urgencyReason" | "submittedAt" | "reviewStartedAt" | "completedAt" | "expiresAt" | "assignedProfessionalId" | "assignedAt" | "qualityScore" | "completenessScore" | "metadata" | "tags" | "createdAt" | "updatedAt" | "version", ExtArgs["result"]["case"]>
  export type CaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | Case$documentsArgs<ExtArgs>
    statusHistory?: boolean | Case$statusHistoryArgs<ExtArgs>
    assignments?: boolean | Case$assignmentsArgs<ExtArgs>
    reviews?: boolean | Case$reviewsArgs<ExtArgs>
    _count?: boolean | CaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Case"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      statusHistory: Prisma.$CaseStatusHistoryPayload<ExtArgs>[]
      assignments: Prisma.$CaseAssignmentPayload<ExtArgs>[]
      reviews: Prisma.$CaseReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseNumber: string
      customerId: string
      firstName: string
      middleName: string | null
      lastName: string
      dateOfBirth: Date
      email: string
      phone: string | null
      title: string | null
      description: string | null
      chiefComplaint: string | null
      category: $Enums.CaseCategory
      medicalHistory: Prisma.JsonValue | null
      currentMedications: Prisma.JsonValue | null
      allergies: Prisma.JsonValue | null
      familyHistory: Prisma.JsonValue | null
      status: $Enums.CaseStatus
      priority: $Enums.CasePriority
      urgencyReason: string | null
      submittedAt: Date | null
      reviewStartedAt: Date | null
      completedAt: Date | null
      expiresAt: Date | null
      assignedProfessionalId: string | null
      assignedAt: Date | null
      qualityScore: number | null
      completenessScore: number | null
      metadata: Prisma.JsonValue | null
      tags: string[]
      createdAt: Date
      updatedAt: Date
      version: number
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
    documents<T extends Case$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Case$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusHistory<T extends Case$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Case$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Case$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Case$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Case$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Case$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly customerId: FieldRef<"Case", 'String'>
    readonly firstName: FieldRef<"Case", 'String'>
    readonly middleName: FieldRef<"Case", 'String'>
    readonly lastName: FieldRef<"Case", 'String'>
    readonly dateOfBirth: FieldRef<"Case", 'DateTime'>
    readonly email: FieldRef<"Case", 'String'>
    readonly phone: FieldRef<"Case", 'String'>
    readonly title: FieldRef<"Case", 'String'>
    readonly description: FieldRef<"Case", 'String'>
    readonly chiefComplaint: FieldRef<"Case", 'String'>
    readonly category: FieldRef<"Case", 'CaseCategory'>
    readonly medicalHistory: FieldRef<"Case", 'Json'>
    readonly currentMedications: FieldRef<"Case", 'Json'>
    readonly allergies: FieldRef<"Case", 'Json'>
    readonly familyHistory: FieldRef<"Case", 'Json'>
    readonly status: FieldRef<"Case", 'CaseStatus'>
    readonly priority: FieldRef<"Case", 'CasePriority'>
    readonly urgencyReason: FieldRef<"Case", 'String'>
    readonly submittedAt: FieldRef<"Case", 'DateTime'>
    readonly reviewStartedAt: FieldRef<"Case", 'DateTime'>
    readonly completedAt: FieldRef<"Case", 'DateTime'>
    readonly expiresAt: FieldRef<"Case", 'DateTime'>
    readonly assignedProfessionalId: FieldRef<"Case", 'String'>
    readonly assignedAt: FieldRef<"Case", 'DateTime'>
    readonly qualityScore: FieldRef<"Case", 'Float'>
    readonly completenessScore: FieldRef<"Case", 'Float'>
    readonly metadata: FieldRef<"Case", 'Json'>
    readonly tags: FieldRef<"Case", 'String[]'>
    readonly createdAt: FieldRef<"Case", 'DateTime'>
    readonly updatedAt: FieldRef<"Case", 'DateTime'>
    readonly version: FieldRef<"Case", 'Int'>
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
    skipDuplicates?: boolean
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
    skipDuplicates?: boolean
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
   * Case.documents
   */
  export type Case$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Case.statusHistory
   */
  export type Case$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    where?: CaseStatusHistoryWhereInput
    orderBy?: CaseStatusHistoryOrderByWithRelationInput | CaseStatusHistoryOrderByWithRelationInput[]
    cursor?: CaseStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseStatusHistoryScalarFieldEnum | CaseStatusHistoryScalarFieldEnum[]
  }

  /**
   * Case.assignments
   */
  export type Case$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Case.reviews
   */
  export type Case$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    where?: CaseReviewWhereInput
    orderBy?: CaseReviewOrderByWithRelationInput | CaseReviewOrderByWithRelationInput[]
    cursor?: CaseReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseReviewScalarFieldEnum | CaseReviewScalarFieldEnum[]
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
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    fileSize: number | null
    ocrConfidence: number | null
    pageCount: number | null
  }

  export type DocumentSumAggregateOutputType = {
    fileSize: bigint | null
    ocrConfidence: number | null
    pageCount: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    originalFilename: string | null
    filename: string | null
    fileSize: bigint | null
    mimeType: string | null
    fileExtension: string | null
    documentType: $Enums.DocumentType | null
    category: string | null
    description: string | null
    cloudProvider: string | null
    bucketName: string | null
    objectKey: string | null
    storageRegion: string | null
    status: $Enums.DocumentStatus | null
    processingStartedAt: Date | null
    processingCompletedAt: Date | null
    processingError: string | null
    textContent: string | null
    ocrConfidence: number | null
    pageCount: number | null
    encryptionStatus: boolean | null
    checksumSHA256: string | null
    virusScanStatus: string | null
    virusScanAt: Date | null
    isPublic: boolean | null
    uploadedByType: string | null
    uploadedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    originalFilename: string | null
    filename: string | null
    fileSize: bigint | null
    mimeType: string | null
    fileExtension: string | null
    documentType: $Enums.DocumentType | null
    category: string | null
    description: string | null
    cloudProvider: string | null
    bucketName: string | null
    objectKey: string | null
    storageRegion: string | null
    status: $Enums.DocumentStatus | null
    processingStartedAt: Date | null
    processingCompletedAt: Date | null
    processingError: string | null
    textContent: string | null
    ocrConfidence: number | null
    pageCount: number | null
    encryptionStatus: boolean | null
    checksumSHA256: string | null
    virusScanStatus: string | null
    virusScanAt: Date | null
    isPublic: boolean | null
    uploadedByType: string | null
    uploadedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    caseId: number
    originalFilename: number
    filename: number
    fileSize: number
    mimeType: number
    fileExtension: number
    documentType: number
    category: number
    description: number
    cloudProvider: number
    bucketName: number
    objectKey: number
    storageRegion: number
    status: number
    processingStartedAt: number
    processingCompletedAt: number
    processingError: number
    textContent: number
    ocrConfidence: number
    pageCount: number
    encryptionStatus: number
    checksumSHA256: number
    virusScanStatus: number
    virusScanAt: number
    isPublic: number
    accessPermissions: number
    metadata: number
    uploadedByType: number
    uploadedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    fileSize?: true
    ocrConfidence?: true
    pageCount?: true
  }

  export type DocumentSumAggregateInputType = {
    fileSize?: true
    ocrConfidence?: true
    pageCount?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    caseId?: true
    originalFilename?: true
    filename?: true
    fileSize?: true
    mimeType?: true
    fileExtension?: true
    documentType?: true
    category?: true
    description?: true
    cloudProvider?: true
    bucketName?: true
    objectKey?: true
    storageRegion?: true
    status?: true
    processingStartedAt?: true
    processingCompletedAt?: true
    processingError?: true
    textContent?: true
    ocrConfidence?: true
    pageCount?: true
    encryptionStatus?: true
    checksumSHA256?: true
    virusScanStatus?: true
    virusScanAt?: true
    isPublic?: true
    uploadedByType?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    caseId?: true
    originalFilename?: true
    filename?: true
    fileSize?: true
    mimeType?: true
    fileExtension?: true
    documentType?: true
    category?: true
    description?: true
    cloudProvider?: true
    bucketName?: true
    objectKey?: true
    storageRegion?: true
    status?: true
    processingStartedAt?: true
    processingCompletedAt?: true
    processingError?: true
    textContent?: true
    ocrConfidence?: true
    pageCount?: true
    encryptionStatus?: true
    checksumSHA256?: true
    virusScanStatus?: true
    virusScanAt?: true
    isPublic?: true
    uploadedByType?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    caseId?: true
    originalFilename?: true
    filename?: true
    fileSize?: true
    mimeType?: true
    fileExtension?: true
    documentType?: true
    category?: true
    description?: true
    cloudProvider?: true
    bucketName?: true
    objectKey?: true
    storageRegion?: true
    status?: true
    processingStartedAt?: true
    processingCompletedAt?: true
    processingError?: true
    textContent?: true
    ocrConfidence?: true
    pageCount?: true
    encryptionStatus?: true
    checksumSHA256?: true
    virusScanStatus?: true
    virusScanAt?: true
    isPublic?: true
    accessPermissions?: true
    metadata?: true
    uploadedByType?: true
    uploadedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    caseId: string
    originalFilename: string
    filename: string
    fileSize: bigint
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category: string | null
    description: string | null
    cloudProvider: string
    bucketName: string | null
    objectKey: string
    storageRegion: string | null
    status: $Enums.DocumentStatus
    processingStartedAt: Date | null
    processingCompletedAt: Date | null
    processingError: string | null
    textContent: string | null
    ocrConfidence: number | null
    pageCount: number | null
    encryptionStatus: boolean
    checksumSHA256: string | null
    virusScanStatus: string | null
    virusScanAt: Date | null
    isPublic: boolean
    accessPermissions: JsonValue | null
    metadata: JsonValue | null
    uploadedByType: string
    uploadedById: string
    createdAt: Date
    updatedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    originalFilename?: boolean
    filename?: boolean
    fileSize?: boolean
    mimeType?: boolean
    fileExtension?: boolean
    documentType?: boolean
    category?: boolean
    description?: boolean
    cloudProvider?: boolean
    bucketName?: boolean
    objectKey?: boolean
    storageRegion?: boolean
    status?: boolean
    processingStartedAt?: boolean
    processingCompletedAt?: boolean
    processingError?: boolean
    textContent?: boolean
    ocrConfidence?: boolean
    pageCount?: boolean
    encryptionStatus?: boolean
    checksumSHA256?: boolean
    virusScanStatus?: boolean
    virusScanAt?: boolean
    isPublic?: boolean
    accessPermissions?: boolean
    metadata?: boolean
    uploadedByType?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    extractions?: boolean | Document$extractionsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    originalFilename?: boolean
    filename?: boolean
    fileSize?: boolean
    mimeType?: boolean
    fileExtension?: boolean
    documentType?: boolean
    category?: boolean
    description?: boolean
    cloudProvider?: boolean
    bucketName?: boolean
    objectKey?: boolean
    storageRegion?: boolean
    status?: boolean
    processingStartedAt?: boolean
    processingCompletedAt?: boolean
    processingError?: boolean
    textContent?: boolean
    ocrConfidence?: boolean
    pageCount?: boolean
    encryptionStatus?: boolean
    checksumSHA256?: boolean
    virusScanStatus?: boolean
    virusScanAt?: boolean
    isPublic?: boolean
    accessPermissions?: boolean
    metadata?: boolean
    uploadedByType?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    originalFilename?: boolean
    filename?: boolean
    fileSize?: boolean
    mimeType?: boolean
    fileExtension?: boolean
    documentType?: boolean
    category?: boolean
    description?: boolean
    cloudProvider?: boolean
    bucketName?: boolean
    objectKey?: boolean
    storageRegion?: boolean
    status?: boolean
    processingStartedAt?: boolean
    processingCompletedAt?: boolean
    processingError?: boolean
    textContent?: boolean
    ocrConfidence?: boolean
    pageCount?: boolean
    encryptionStatus?: boolean
    checksumSHA256?: boolean
    virusScanStatus?: boolean
    virusScanAt?: boolean
    isPublic?: boolean
    accessPermissions?: boolean
    metadata?: boolean
    uploadedByType?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    caseId?: boolean
    originalFilename?: boolean
    filename?: boolean
    fileSize?: boolean
    mimeType?: boolean
    fileExtension?: boolean
    documentType?: boolean
    category?: boolean
    description?: boolean
    cloudProvider?: boolean
    bucketName?: boolean
    objectKey?: boolean
    storageRegion?: boolean
    status?: boolean
    processingStartedAt?: boolean
    processingCompletedAt?: boolean
    processingError?: boolean
    textContent?: boolean
    ocrConfidence?: boolean
    pageCount?: boolean
    encryptionStatus?: boolean
    checksumSHA256?: boolean
    virusScanStatus?: boolean
    virusScanAt?: boolean
    isPublic?: boolean
    accessPermissions?: boolean
    metadata?: boolean
    uploadedByType?: boolean
    uploadedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "originalFilename" | "filename" | "fileSize" | "mimeType" | "fileExtension" | "documentType" | "category" | "description" | "cloudProvider" | "bucketName" | "objectKey" | "storageRegion" | "status" | "processingStartedAt" | "processingCompletedAt" | "processingError" | "textContent" | "ocrConfidence" | "pageCount" | "encryptionStatus" | "checksumSHA256" | "virusScanStatus" | "virusScanAt" | "isPublic" | "accessPermissions" | "metadata" | "uploadedByType" | "uploadedById" | "createdAt" | "updatedAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    extractions?: boolean | Document$extractionsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
      extractions: Prisma.$DocumentExtractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      originalFilename: string
      filename: string
      fileSize: bigint
      mimeType: string
      fileExtension: string
      documentType: $Enums.DocumentType
      category: string | null
      description: string | null
      cloudProvider: string
      bucketName: string | null
      objectKey: string
      storageRegion: string | null
      status: $Enums.DocumentStatus
      processingStartedAt: Date | null
      processingCompletedAt: Date | null
      processingError: string | null
      textContent: string | null
      ocrConfidence: number | null
      pageCount: number | null
      encryptionStatus: boolean
      checksumSHA256: string | null
      virusScanStatus: string | null
      virusScanAt: Date | null
      isPublic: boolean
      accessPermissions: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      uploadedByType: string
      uploadedById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
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
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
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
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    case<T extends CaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CaseDefaultArgs<ExtArgs>>): Prisma__CaseClient<$Result.GetResult<Prisma.$CasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    extractions<T extends Document$extractionsArgs<ExtArgs> = {}>(args?: Subset<T, Document$extractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly caseId: FieldRef<"Document", 'String'>
    readonly originalFilename: FieldRef<"Document", 'String'>
    readonly filename: FieldRef<"Document", 'String'>
    readonly fileSize: FieldRef<"Document", 'BigInt'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly fileExtension: FieldRef<"Document", 'String'>
    readonly documentType: FieldRef<"Document", 'DocumentType'>
    readonly category: FieldRef<"Document", 'String'>
    readonly description: FieldRef<"Document", 'String'>
    readonly cloudProvider: FieldRef<"Document", 'String'>
    readonly bucketName: FieldRef<"Document", 'String'>
    readonly objectKey: FieldRef<"Document", 'String'>
    readonly storageRegion: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'DocumentStatus'>
    readonly processingStartedAt: FieldRef<"Document", 'DateTime'>
    readonly processingCompletedAt: FieldRef<"Document", 'DateTime'>
    readonly processingError: FieldRef<"Document", 'String'>
    readonly textContent: FieldRef<"Document", 'String'>
    readonly ocrConfidence: FieldRef<"Document", 'Float'>
    readonly pageCount: FieldRef<"Document", 'Int'>
    readonly encryptionStatus: FieldRef<"Document", 'Boolean'>
    readonly checksumSHA256: FieldRef<"Document", 'String'>
    readonly virusScanStatus: FieldRef<"Document", 'String'>
    readonly virusScanAt: FieldRef<"Document", 'DateTime'>
    readonly isPublic: FieldRef<"Document", 'Boolean'>
    readonly accessPermissions: FieldRef<"Document", 'Json'>
    readonly metadata: FieldRef<"Document", 'Json'>
    readonly uploadedByType: FieldRef<"Document", 'String'>
    readonly uploadedById: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.extractions
   */
  export type Document$extractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    where?: DocumentExtractionWhereInput
    orderBy?: DocumentExtractionOrderByWithRelationInput | DocumentExtractionOrderByWithRelationInput[]
    cursor?: DocumentExtractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentExtractionScalarFieldEnum | DocumentExtractionScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentExtraction
   */

  export type AggregateDocumentExtraction = {
    _count: DocumentExtractionCountAggregateOutputType | null
    _avg: DocumentExtractionAvgAggregateOutputType | null
    _sum: DocumentExtractionSumAggregateOutputType | null
    _min: DocumentExtractionMinAggregateOutputType | null
    _max: DocumentExtractionMaxAggregateOutputType | null
  }

  export type DocumentExtractionAvgAggregateOutputType = {
    confidence: number | null
    processingTime: number | null
  }

  export type DocumentExtractionSumAggregateOutputType = {
    confidence: number | null
    processingTime: number | null
  }

  export type DocumentExtractionMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    extractionType: string | null
    confidence: number | null
    extractorName: string | null
    extractorVersion: string | null
    processingTime: number | null
    createdAt: Date | null
  }

  export type DocumentExtractionMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    extractionType: string | null
    confidence: number | null
    extractorName: string | null
    extractorVersion: string | null
    processingTime: number | null
    createdAt: Date | null
  }

  export type DocumentExtractionCountAggregateOutputType = {
    id: number
    documentId: number
    extractionType: number
    extractedData: number
    confidence: number
    extractorName: number
    extractorVersion: number
    processingTime: number
    createdAt: number
    _all: number
  }


  export type DocumentExtractionAvgAggregateInputType = {
    confidence?: true
    processingTime?: true
  }

  export type DocumentExtractionSumAggregateInputType = {
    confidence?: true
    processingTime?: true
  }

  export type DocumentExtractionMinAggregateInputType = {
    id?: true
    documentId?: true
    extractionType?: true
    confidence?: true
    extractorName?: true
    extractorVersion?: true
    processingTime?: true
    createdAt?: true
  }

  export type DocumentExtractionMaxAggregateInputType = {
    id?: true
    documentId?: true
    extractionType?: true
    confidence?: true
    extractorName?: true
    extractorVersion?: true
    processingTime?: true
    createdAt?: true
  }

  export type DocumentExtractionCountAggregateInputType = {
    id?: true
    documentId?: true
    extractionType?: true
    extractedData?: true
    confidence?: true
    extractorName?: true
    extractorVersion?: true
    processingTime?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentExtractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentExtraction to aggregate.
     */
    where?: DocumentExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentExtractions to fetch.
     */
    orderBy?: DocumentExtractionOrderByWithRelationInput | DocumentExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentExtractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentExtractions
    **/
    _count?: true | DocumentExtractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentExtractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentExtractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentExtractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentExtractionMaxAggregateInputType
  }

  export type GetDocumentExtractionAggregateType<T extends DocumentExtractionAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentExtraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentExtraction[P]>
      : GetScalarType<T[P], AggregateDocumentExtraction[P]>
  }




  export type DocumentExtractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentExtractionWhereInput
    orderBy?: DocumentExtractionOrderByWithAggregationInput | DocumentExtractionOrderByWithAggregationInput[]
    by: DocumentExtractionScalarFieldEnum[] | DocumentExtractionScalarFieldEnum
    having?: DocumentExtractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentExtractionCountAggregateInputType | true
    _avg?: DocumentExtractionAvgAggregateInputType
    _sum?: DocumentExtractionSumAggregateInputType
    _min?: DocumentExtractionMinAggregateInputType
    _max?: DocumentExtractionMaxAggregateInputType
  }

  export type DocumentExtractionGroupByOutputType = {
    id: string
    documentId: string
    extractionType: string
    extractedData: JsonValue
    confidence: number | null
    extractorName: string
    extractorVersion: string | null
    processingTime: number | null
    createdAt: Date
    _count: DocumentExtractionCountAggregateOutputType | null
    _avg: DocumentExtractionAvgAggregateOutputType | null
    _sum: DocumentExtractionSumAggregateOutputType | null
    _min: DocumentExtractionMinAggregateOutputType | null
    _max: DocumentExtractionMaxAggregateOutputType | null
  }

  type GetDocumentExtractionGroupByPayload<T extends DocumentExtractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentExtractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentExtractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentExtractionGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentExtractionGroupByOutputType[P]>
        }
      >
    >


  export type DocumentExtractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    extractionType?: boolean
    extractedData?: boolean
    confidence?: boolean
    extractorName?: boolean
    extractorVersion?: boolean
    processingTime?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentExtraction"]>

  export type DocumentExtractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    extractionType?: boolean
    extractedData?: boolean
    confidence?: boolean
    extractorName?: boolean
    extractorVersion?: boolean
    processingTime?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentExtraction"]>

  export type DocumentExtractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    extractionType?: boolean
    extractedData?: boolean
    confidence?: boolean
    extractorName?: boolean
    extractorVersion?: boolean
    processingTime?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentExtraction"]>

  export type DocumentExtractionSelectScalar = {
    id?: boolean
    documentId?: boolean
    extractionType?: boolean
    extractedData?: boolean
    confidence?: boolean
    extractorName?: boolean
    extractorVersion?: boolean
    processingTime?: boolean
    createdAt?: boolean
  }

  export type DocumentExtractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "extractionType" | "extractedData" | "confidence" | "extractorName" | "extractorVersion" | "processingTime" | "createdAt", ExtArgs["result"]["documentExtraction"]>
  export type DocumentExtractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentExtractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentExtractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $DocumentExtractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentExtraction"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      extractionType: string
      extractedData: Prisma.JsonValue
      confidence: number | null
      extractorName: string
      extractorVersion: string | null
      processingTime: number | null
      createdAt: Date
    }, ExtArgs["result"]["documentExtraction"]>
    composites: {}
  }

  type DocumentExtractionGetPayload<S extends boolean | null | undefined | DocumentExtractionDefaultArgs> = $Result.GetResult<Prisma.$DocumentExtractionPayload, S>

  type DocumentExtractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentExtractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentExtractionCountAggregateInputType | true
    }

  export interface DocumentExtractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentExtraction'], meta: { name: 'DocumentExtraction' } }
    /**
     * Find zero or one DocumentExtraction that matches the filter.
     * @param {DocumentExtractionFindUniqueArgs} args - Arguments to find a DocumentExtraction
     * @example
     * // Get one DocumentExtraction
     * const documentExtraction = await prisma.documentExtraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentExtractionFindUniqueArgs>(args: SelectSubset<T, DocumentExtractionFindUniqueArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentExtraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentExtractionFindUniqueOrThrowArgs} args - Arguments to find a DocumentExtraction
     * @example
     * // Get one DocumentExtraction
     * const documentExtraction = await prisma.documentExtraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentExtractionFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentExtractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentExtraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentExtractionFindFirstArgs} args - Arguments to find a DocumentExtraction
     * @example
     * // Get one DocumentExtraction
     * const documentExtraction = await prisma.documentExtraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentExtractionFindFirstArgs>(args?: SelectSubset<T, DocumentExtractionFindFirstArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentExtraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentExtractionFindFirstOrThrowArgs} args - Arguments to find a DocumentExtraction
     * @example
     * // Get one DocumentExtraction
     * const documentExtraction = await prisma.documentExtraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentExtractionFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentExtractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentExtractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentExtractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentExtractions
     * const documentExtractions = await prisma.documentExtraction.findMany()
     * 
     * // Get first 10 DocumentExtractions
     * const documentExtractions = await prisma.documentExtraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentExtractionWithIdOnly = await prisma.documentExtraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentExtractionFindManyArgs>(args?: SelectSubset<T, DocumentExtractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentExtraction.
     * @param {DocumentExtractionCreateArgs} args - Arguments to create a DocumentExtraction.
     * @example
     * // Create one DocumentExtraction
     * const DocumentExtraction = await prisma.documentExtraction.create({
     *   data: {
     *     // ... data to create a DocumentExtraction
     *   }
     * })
     * 
     */
    create<T extends DocumentExtractionCreateArgs>(args: SelectSubset<T, DocumentExtractionCreateArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentExtractions.
     * @param {DocumentExtractionCreateManyArgs} args - Arguments to create many DocumentExtractions.
     * @example
     * // Create many DocumentExtractions
     * const documentExtraction = await prisma.documentExtraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentExtractionCreateManyArgs>(args?: SelectSubset<T, DocumentExtractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentExtractions and returns the data saved in the database.
     * @param {DocumentExtractionCreateManyAndReturnArgs} args - Arguments to create many DocumentExtractions.
     * @example
     * // Create many DocumentExtractions
     * const documentExtraction = await prisma.documentExtraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentExtractions and only return the `id`
     * const documentExtractionWithIdOnly = await prisma.documentExtraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentExtractionCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentExtractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentExtraction.
     * @param {DocumentExtractionDeleteArgs} args - Arguments to delete one DocumentExtraction.
     * @example
     * // Delete one DocumentExtraction
     * const DocumentExtraction = await prisma.documentExtraction.delete({
     *   where: {
     *     // ... filter to delete one DocumentExtraction
     *   }
     * })
     * 
     */
    delete<T extends DocumentExtractionDeleteArgs>(args: SelectSubset<T, DocumentExtractionDeleteArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentExtraction.
     * @param {DocumentExtractionUpdateArgs} args - Arguments to update one DocumentExtraction.
     * @example
     * // Update one DocumentExtraction
     * const documentExtraction = await prisma.documentExtraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentExtractionUpdateArgs>(args: SelectSubset<T, DocumentExtractionUpdateArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentExtractions.
     * @param {DocumentExtractionDeleteManyArgs} args - Arguments to filter DocumentExtractions to delete.
     * @example
     * // Delete a few DocumentExtractions
     * const { count } = await prisma.documentExtraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentExtractionDeleteManyArgs>(args?: SelectSubset<T, DocumentExtractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentExtractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentExtractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentExtractions
     * const documentExtraction = await prisma.documentExtraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentExtractionUpdateManyArgs>(args: SelectSubset<T, DocumentExtractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentExtractions and returns the data updated in the database.
     * @param {DocumentExtractionUpdateManyAndReturnArgs} args - Arguments to update many DocumentExtractions.
     * @example
     * // Update many DocumentExtractions
     * const documentExtraction = await prisma.documentExtraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentExtractions and only return the `id`
     * const documentExtractionWithIdOnly = await prisma.documentExtraction.updateManyAndReturn({
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
    updateManyAndReturn<T extends DocumentExtractionUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentExtractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentExtraction.
     * @param {DocumentExtractionUpsertArgs} args - Arguments to update or create a DocumentExtraction.
     * @example
     * // Update or create a DocumentExtraction
     * const documentExtraction = await prisma.documentExtraction.upsert({
     *   create: {
     *     // ... data to create a DocumentExtraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentExtraction we want to update
     *   }
     * })
     */
    upsert<T extends DocumentExtractionUpsertArgs>(args: SelectSubset<T, DocumentExtractionUpsertArgs<ExtArgs>>): Prisma__DocumentExtractionClient<$Result.GetResult<Prisma.$DocumentExtractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentExtractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentExtractionCountArgs} args - Arguments to filter DocumentExtractions to count.
     * @example
     * // Count the number of DocumentExtractions
     * const count = await prisma.documentExtraction.count({
     *   where: {
     *     // ... the filter for the DocumentExtractions we want to count
     *   }
     * })
    **/
    count<T extends DocumentExtractionCountArgs>(
      args?: Subset<T, DocumentExtractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentExtractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentExtraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentExtractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentExtractionAggregateArgs>(args: Subset<T, DocumentExtractionAggregateArgs>): Prisma.PrismaPromise<GetDocumentExtractionAggregateType<T>>

    /**
     * Group by DocumentExtraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentExtractionGroupByArgs} args - Group by arguments.
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
      T extends DocumentExtractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentExtractionGroupByArgs['orderBy'] }
        : { orderBy?: DocumentExtractionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentExtractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentExtractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentExtraction model
   */
  readonly fields: DocumentExtractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentExtraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentExtractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DocumentExtraction model
   */
  interface DocumentExtractionFieldRefs {
    readonly id: FieldRef<"DocumentExtraction", 'String'>
    readonly documentId: FieldRef<"DocumentExtraction", 'String'>
    readonly extractionType: FieldRef<"DocumentExtraction", 'String'>
    readonly extractedData: FieldRef<"DocumentExtraction", 'Json'>
    readonly confidence: FieldRef<"DocumentExtraction", 'Float'>
    readonly extractorName: FieldRef<"DocumentExtraction", 'String'>
    readonly extractorVersion: FieldRef<"DocumentExtraction", 'String'>
    readonly processingTime: FieldRef<"DocumentExtraction", 'Int'>
    readonly createdAt: FieldRef<"DocumentExtraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentExtraction findUnique
   */
  export type DocumentExtractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentExtraction to fetch.
     */
    where: DocumentExtractionWhereUniqueInput
  }

  /**
   * DocumentExtraction findUniqueOrThrow
   */
  export type DocumentExtractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentExtraction to fetch.
     */
    where: DocumentExtractionWhereUniqueInput
  }

  /**
   * DocumentExtraction findFirst
   */
  export type DocumentExtractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentExtraction to fetch.
     */
    where?: DocumentExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentExtractions to fetch.
     */
    orderBy?: DocumentExtractionOrderByWithRelationInput | DocumentExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentExtractions.
     */
    cursor?: DocumentExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentExtractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentExtractions.
     */
    distinct?: DocumentExtractionScalarFieldEnum | DocumentExtractionScalarFieldEnum[]
  }

  /**
   * DocumentExtraction findFirstOrThrow
   */
  export type DocumentExtractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentExtraction to fetch.
     */
    where?: DocumentExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentExtractions to fetch.
     */
    orderBy?: DocumentExtractionOrderByWithRelationInput | DocumentExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentExtractions.
     */
    cursor?: DocumentExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentExtractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentExtractions.
     */
    distinct?: DocumentExtractionScalarFieldEnum | DocumentExtractionScalarFieldEnum[]
  }

  /**
   * DocumentExtraction findMany
   */
  export type DocumentExtractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * Filter, which DocumentExtractions to fetch.
     */
    where?: DocumentExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentExtractions to fetch.
     */
    orderBy?: DocumentExtractionOrderByWithRelationInput | DocumentExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentExtractions.
     */
    cursor?: DocumentExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentExtractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentExtractions.
     */
    skip?: number
    distinct?: DocumentExtractionScalarFieldEnum | DocumentExtractionScalarFieldEnum[]
  }

  /**
   * DocumentExtraction create
   */
  export type DocumentExtractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentExtraction.
     */
    data: XOR<DocumentExtractionCreateInput, DocumentExtractionUncheckedCreateInput>
  }

  /**
   * DocumentExtraction createMany
   */
  export type DocumentExtractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentExtractions.
     */
    data: DocumentExtractionCreateManyInput | DocumentExtractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentExtraction createManyAndReturn
   */
  export type DocumentExtractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentExtractions.
     */
    data: DocumentExtractionCreateManyInput | DocumentExtractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentExtraction update
   */
  export type DocumentExtractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentExtraction.
     */
    data: XOR<DocumentExtractionUpdateInput, DocumentExtractionUncheckedUpdateInput>
    /**
     * Choose, which DocumentExtraction to update.
     */
    where: DocumentExtractionWhereUniqueInput
  }

  /**
   * DocumentExtraction updateMany
   */
  export type DocumentExtractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentExtractions.
     */
    data: XOR<DocumentExtractionUpdateManyMutationInput, DocumentExtractionUncheckedUpdateManyInput>
    /**
     * Filter which DocumentExtractions to update
     */
    where?: DocumentExtractionWhereInput
    /**
     * Limit how many DocumentExtractions to update.
     */
    limit?: number
  }

  /**
   * DocumentExtraction updateManyAndReturn
   */
  export type DocumentExtractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * The data used to update DocumentExtractions.
     */
    data: XOR<DocumentExtractionUpdateManyMutationInput, DocumentExtractionUncheckedUpdateManyInput>
    /**
     * Filter which DocumentExtractions to update
     */
    where?: DocumentExtractionWhereInput
    /**
     * Limit how many DocumentExtractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentExtraction upsert
   */
  export type DocumentExtractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentExtraction to update in case it exists.
     */
    where: DocumentExtractionWhereUniqueInput
    /**
     * In case the DocumentExtraction found by the `where` argument doesn't exist, create a new DocumentExtraction with this data.
     */
    create: XOR<DocumentExtractionCreateInput, DocumentExtractionUncheckedCreateInput>
    /**
     * In case the DocumentExtraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentExtractionUpdateInput, DocumentExtractionUncheckedUpdateInput>
  }

  /**
   * DocumentExtraction delete
   */
  export type DocumentExtractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
    /**
     * Filter which DocumentExtraction to delete.
     */
    where: DocumentExtractionWhereUniqueInput
  }

  /**
   * DocumentExtraction deleteMany
   */
  export type DocumentExtractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentExtractions to delete
     */
    where?: DocumentExtractionWhereInput
    /**
     * Limit how many DocumentExtractions to delete.
     */
    limit?: number
  }

  /**
   * DocumentExtraction without action
   */
  export type DocumentExtractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentExtraction
     */
    select?: DocumentExtractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentExtraction
     */
    omit?: DocumentExtractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentExtractionInclude<ExtArgs> | null
  }


  /**
   * Model CaseStatusHistory
   */

  export type AggregateCaseStatusHistory = {
    _count: CaseStatusHistoryCountAggregateOutputType | null
    _min: CaseStatusHistoryMinAggregateOutputType | null
    _max: CaseStatusHistoryMaxAggregateOutputType | null
  }

  export type CaseStatusHistoryMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    fromStatus: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus | null
    reason: string | null
    notes: string | null
    changedByType: string | null
    changedById: string | null
    createdAt: Date | null
  }

  export type CaseStatusHistoryMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    fromStatus: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus | null
    reason: string | null
    notes: string | null
    changedByType: string | null
    changedById: string | null
    createdAt: Date | null
  }

  export type CaseStatusHistoryCountAggregateOutputType = {
    id: number
    caseId: number
    fromStatus: number
    toStatus: number
    reason: number
    notes: number
    changedByType: number
    changedById: number
    createdAt: number
    _all: number
  }


  export type CaseStatusHistoryMinAggregateInputType = {
    id?: true
    caseId?: true
    fromStatus?: true
    toStatus?: true
    reason?: true
    notes?: true
    changedByType?: true
    changedById?: true
    createdAt?: true
  }

  export type CaseStatusHistoryMaxAggregateInputType = {
    id?: true
    caseId?: true
    fromStatus?: true
    toStatus?: true
    reason?: true
    notes?: true
    changedByType?: true
    changedById?: true
    createdAt?: true
  }

  export type CaseStatusHistoryCountAggregateInputType = {
    id?: true
    caseId?: true
    fromStatus?: true
    toStatus?: true
    reason?: true
    notes?: true
    changedByType?: true
    changedById?: true
    createdAt?: true
    _all?: true
  }

  export type CaseStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseStatusHistory to aggregate.
     */
    where?: CaseStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStatusHistories to fetch.
     */
    orderBy?: CaseStatusHistoryOrderByWithRelationInput | CaseStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseStatusHistories
    **/
    _count?: true | CaseStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseStatusHistoryMaxAggregateInputType
  }

  export type GetCaseStatusHistoryAggregateType<T extends CaseStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseStatusHistory[P]>
      : GetScalarType<T[P], AggregateCaseStatusHistory[P]>
  }




  export type CaseStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseStatusHistoryWhereInput
    orderBy?: CaseStatusHistoryOrderByWithAggregationInput | CaseStatusHistoryOrderByWithAggregationInput[]
    by: CaseStatusHistoryScalarFieldEnum[] | CaseStatusHistoryScalarFieldEnum
    having?: CaseStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseStatusHistoryCountAggregateInputType | true
    _min?: CaseStatusHistoryMinAggregateInputType
    _max?: CaseStatusHistoryMaxAggregateInputType
  }

  export type CaseStatusHistoryGroupByOutputType = {
    id: string
    caseId: string
    fromStatus: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus
    reason: string | null
    notes: string | null
    changedByType: string
    changedById: string
    createdAt: Date
    _count: CaseStatusHistoryCountAggregateOutputType | null
    _min: CaseStatusHistoryMinAggregateOutputType | null
    _max: CaseStatusHistoryMaxAggregateOutputType | null
  }

  type GetCaseStatusHistoryGroupByPayload<T extends CaseStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], CaseStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type CaseStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    reason?: boolean
    notes?: boolean
    changedByType?: boolean
    changedById?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseStatusHistory"]>

  export type CaseStatusHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    reason?: boolean
    notes?: boolean
    changedByType?: boolean
    changedById?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseStatusHistory"]>

  export type CaseStatusHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    reason?: boolean
    notes?: boolean
    changedByType?: boolean
    changedById?: boolean
    createdAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseStatusHistory"]>

  export type CaseStatusHistorySelectScalar = {
    id?: boolean
    caseId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    reason?: boolean
    notes?: boolean
    changedByType?: boolean
    changedById?: boolean
    createdAt?: boolean
  }

  export type CaseStatusHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "fromStatus" | "toStatus" | "reason" | "notes" | "changedByType" | "changedById" | "createdAt", ExtArgs["result"]["caseStatusHistory"]>
  export type CaseStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type CaseStatusHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type CaseStatusHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $CaseStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseStatusHistory"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      fromStatus: $Enums.CaseStatus | null
      toStatus: $Enums.CaseStatus
      reason: string | null
      notes: string | null
      changedByType: string
      changedById: string
      createdAt: Date
    }, ExtArgs["result"]["caseStatusHistory"]>
    composites: {}
  }

  type CaseStatusHistoryGetPayload<S extends boolean | null | undefined | CaseStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$CaseStatusHistoryPayload, S>

  type CaseStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseStatusHistoryCountAggregateInputType | true
    }

  export interface CaseStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseStatusHistory'], meta: { name: 'CaseStatusHistory' } }
    /**
     * Find zero or one CaseStatusHistory that matches the filter.
     * @param {CaseStatusHistoryFindUniqueArgs} args - Arguments to find a CaseStatusHistory
     * @example
     * // Get one CaseStatusHistory
     * const caseStatusHistory = await prisma.caseStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseStatusHistoryFindUniqueArgs>(args: SelectSubset<T, CaseStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseStatusHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a CaseStatusHistory
     * @example
     * // Get one CaseStatusHistory
     * const caseStatusHistory = await prisma.caseStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStatusHistoryFindFirstArgs} args - Arguments to find a CaseStatusHistory
     * @example
     * // Get one CaseStatusHistory
     * const caseStatusHistory = await prisma.caseStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseStatusHistoryFindFirstArgs>(args?: SelectSubset<T, CaseStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a CaseStatusHistory
     * @example
     * // Get one CaseStatusHistory
     * const caseStatusHistory = await prisma.caseStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseStatusHistories
     * const caseStatusHistories = await prisma.caseStatusHistory.findMany()
     * 
     * // Get first 10 CaseStatusHistories
     * const caseStatusHistories = await prisma.caseStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseStatusHistoryWithIdOnly = await prisma.caseStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseStatusHistoryFindManyArgs>(args?: SelectSubset<T, CaseStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseStatusHistory.
     * @param {CaseStatusHistoryCreateArgs} args - Arguments to create a CaseStatusHistory.
     * @example
     * // Create one CaseStatusHistory
     * const CaseStatusHistory = await prisma.caseStatusHistory.create({
     *   data: {
     *     // ... data to create a CaseStatusHistory
     *   }
     * })
     * 
     */
    create<T extends CaseStatusHistoryCreateArgs>(args: SelectSubset<T, CaseStatusHistoryCreateArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseStatusHistories.
     * @param {CaseStatusHistoryCreateManyArgs} args - Arguments to create many CaseStatusHistories.
     * @example
     * // Create many CaseStatusHistories
     * const caseStatusHistory = await prisma.caseStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseStatusHistoryCreateManyArgs>(args?: SelectSubset<T, CaseStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseStatusHistories and returns the data saved in the database.
     * @param {CaseStatusHistoryCreateManyAndReturnArgs} args - Arguments to create many CaseStatusHistories.
     * @example
     * // Create many CaseStatusHistories
     * const caseStatusHistory = await prisma.caseStatusHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseStatusHistories and only return the `id`
     * const caseStatusHistoryWithIdOnly = await prisma.caseStatusHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseStatusHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseStatusHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseStatusHistory.
     * @param {CaseStatusHistoryDeleteArgs} args - Arguments to delete one CaseStatusHistory.
     * @example
     * // Delete one CaseStatusHistory
     * const CaseStatusHistory = await prisma.caseStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one CaseStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends CaseStatusHistoryDeleteArgs>(args: SelectSubset<T, CaseStatusHistoryDeleteArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseStatusHistory.
     * @param {CaseStatusHistoryUpdateArgs} args - Arguments to update one CaseStatusHistory.
     * @example
     * // Update one CaseStatusHistory
     * const caseStatusHistory = await prisma.caseStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseStatusHistoryUpdateArgs>(args: SelectSubset<T, CaseStatusHistoryUpdateArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseStatusHistories.
     * @param {CaseStatusHistoryDeleteManyArgs} args - Arguments to filter CaseStatusHistories to delete.
     * @example
     * // Delete a few CaseStatusHistories
     * const { count } = await prisma.caseStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, CaseStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseStatusHistories
     * const caseStatusHistory = await prisma.caseStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseStatusHistoryUpdateManyArgs>(args: SelectSubset<T, CaseStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseStatusHistories and returns the data updated in the database.
     * @param {CaseStatusHistoryUpdateManyAndReturnArgs} args - Arguments to update many CaseStatusHistories.
     * @example
     * // Update many CaseStatusHistories
     * const caseStatusHistory = await prisma.caseStatusHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseStatusHistories and only return the `id`
     * const caseStatusHistoryWithIdOnly = await prisma.caseStatusHistory.updateManyAndReturn({
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
    updateManyAndReturn<T extends CaseStatusHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseStatusHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseStatusHistory.
     * @param {CaseStatusHistoryUpsertArgs} args - Arguments to update or create a CaseStatusHistory.
     * @example
     * // Update or create a CaseStatusHistory
     * const caseStatusHistory = await prisma.caseStatusHistory.upsert({
     *   create: {
     *     // ... data to create a CaseStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends CaseStatusHistoryUpsertArgs>(args: SelectSubset<T, CaseStatusHistoryUpsertArgs<ExtArgs>>): Prisma__CaseStatusHistoryClient<$Result.GetResult<Prisma.$CaseStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStatusHistoryCountArgs} args - Arguments to filter CaseStatusHistories to count.
     * @example
     * // Count the number of CaseStatusHistories
     * const count = await prisma.caseStatusHistory.count({
     *   where: {
     *     // ... the filter for the CaseStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends CaseStatusHistoryCountArgs>(
      args?: Subset<T, CaseStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CaseStatusHistoryAggregateArgs>(args: Subset<T, CaseStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetCaseStatusHistoryAggregateType<T>>

    /**
     * Group by CaseStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseStatusHistoryGroupByArgs} args - Group by arguments.
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
      T extends CaseStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: CaseStatusHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CaseStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseStatusHistory model
   */
  readonly fields: CaseStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CaseStatusHistory model
   */
  interface CaseStatusHistoryFieldRefs {
    readonly id: FieldRef<"CaseStatusHistory", 'String'>
    readonly caseId: FieldRef<"CaseStatusHistory", 'String'>
    readonly fromStatus: FieldRef<"CaseStatusHistory", 'CaseStatus'>
    readonly toStatus: FieldRef<"CaseStatusHistory", 'CaseStatus'>
    readonly reason: FieldRef<"CaseStatusHistory", 'String'>
    readonly notes: FieldRef<"CaseStatusHistory", 'String'>
    readonly changedByType: FieldRef<"CaseStatusHistory", 'String'>
    readonly changedById: FieldRef<"CaseStatusHistory", 'String'>
    readonly createdAt: FieldRef<"CaseStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseStatusHistory findUnique
   */
  export type CaseStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseStatusHistory to fetch.
     */
    where: CaseStatusHistoryWhereUniqueInput
  }

  /**
   * CaseStatusHistory findUniqueOrThrow
   */
  export type CaseStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseStatusHistory to fetch.
     */
    where: CaseStatusHistoryWhereUniqueInput
  }

  /**
   * CaseStatusHistory findFirst
   */
  export type CaseStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseStatusHistory to fetch.
     */
    where?: CaseStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStatusHistories to fetch.
     */
    orderBy?: CaseStatusHistoryOrderByWithRelationInput | CaseStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseStatusHistories.
     */
    cursor?: CaseStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseStatusHistories.
     */
    distinct?: CaseStatusHistoryScalarFieldEnum | CaseStatusHistoryScalarFieldEnum[]
  }

  /**
   * CaseStatusHistory findFirstOrThrow
   */
  export type CaseStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseStatusHistory to fetch.
     */
    where?: CaseStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStatusHistories to fetch.
     */
    orderBy?: CaseStatusHistoryOrderByWithRelationInput | CaseStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseStatusHistories.
     */
    cursor?: CaseStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseStatusHistories.
     */
    distinct?: CaseStatusHistoryScalarFieldEnum | CaseStatusHistoryScalarFieldEnum[]
  }

  /**
   * CaseStatusHistory findMany
   */
  export type CaseStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which CaseStatusHistories to fetch.
     */
    where?: CaseStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseStatusHistories to fetch.
     */
    orderBy?: CaseStatusHistoryOrderByWithRelationInput | CaseStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseStatusHistories.
     */
    cursor?: CaseStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseStatusHistories.
     */
    skip?: number
    distinct?: CaseStatusHistoryScalarFieldEnum | CaseStatusHistoryScalarFieldEnum[]
  }

  /**
   * CaseStatusHistory create
   */
  export type CaseStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseStatusHistory.
     */
    data: XOR<CaseStatusHistoryCreateInput, CaseStatusHistoryUncheckedCreateInput>
  }

  /**
   * CaseStatusHistory createMany
   */
  export type CaseStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseStatusHistories.
     */
    data: CaseStatusHistoryCreateManyInput | CaseStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseStatusHistory createManyAndReturn
   */
  export type CaseStatusHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many CaseStatusHistories.
     */
    data: CaseStatusHistoryCreateManyInput | CaseStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseStatusHistory update
   */
  export type CaseStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseStatusHistory.
     */
    data: XOR<CaseStatusHistoryUpdateInput, CaseStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which CaseStatusHistory to update.
     */
    where: CaseStatusHistoryWhereUniqueInput
  }

  /**
   * CaseStatusHistory updateMany
   */
  export type CaseStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseStatusHistories.
     */
    data: XOR<CaseStatusHistoryUpdateManyMutationInput, CaseStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which CaseStatusHistories to update
     */
    where?: CaseStatusHistoryWhereInput
    /**
     * Limit how many CaseStatusHistories to update.
     */
    limit?: number
  }

  /**
   * CaseStatusHistory updateManyAndReturn
   */
  export type CaseStatusHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * The data used to update CaseStatusHistories.
     */
    data: XOR<CaseStatusHistoryUpdateManyMutationInput, CaseStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which CaseStatusHistories to update
     */
    where?: CaseStatusHistoryWhereInput
    /**
     * Limit how many CaseStatusHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseStatusHistory upsert
   */
  export type CaseStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseStatusHistory to update in case it exists.
     */
    where: CaseStatusHistoryWhereUniqueInput
    /**
     * In case the CaseStatusHistory found by the `where` argument doesn't exist, create a new CaseStatusHistory with this data.
     */
    create: XOR<CaseStatusHistoryCreateInput, CaseStatusHistoryUncheckedCreateInput>
    /**
     * In case the CaseStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseStatusHistoryUpdateInput, CaseStatusHistoryUncheckedUpdateInput>
  }

  /**
   * CaseStatusHistory delete
   */
  export type CaseStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which CaseStatusHistory to delete.
     */
    where: CaseStatusHistoryWhereUniqueInput
  }

  /**
   * CaseStatusHistory deleteMany
   */
  export type CaseStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseStatusHistories to delete
     */
    where?: CaseStatusHistoryWhereInput
    /**
     * Limit how many CaseStatusHistories to delete.
     */
    limit?: number
  }

  /**
   * CaseStatusHistory without action
   */
  export type CaseStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseStatusHistory
     */
    select?: CaseStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseStatusHistory
     */
    omit?: CaseStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseStatusHistoryInclude<ExtArgs> | null
  }


  /**
   * Model CaseAssignment
   */

  export type AggregateCaseAssignment = {
    _count: CaseAssignmentCountAggregateOutputType | null
    _avg: CaseAssignmentAvgAggregateOutputType | null
    _sum: CaseAssignmentSumAggregateOutputType | null
    _min: CaseAssignmentMinAggregateOutputType | null
    _max: CaseAssignmentMaxAggregateOutputType | null
  }

  export type CaseAssignmentAvgAggregateOutputType = {
    estimatedHours: number | null
  }

  export type CaseAssignmentSumAggregateOutputType = {
    estimatedHours: number | null
  }

  export type CaseAssignmentMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    assignmentType: string | null
    specialization: string | null
    isActive: boolean | null
    assignedAt: Date | null
    acceptedAt: Date | null
    completedAt: Date | null
    declinedAt: Date | null
    priority: $Enums.CasePriority | null
    estimatedHours: number | null
    deadlineAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseAssignmentMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    assignmentType: string | null
    specialization: string | null
    isActive: boolean | null
    assignedAt: Date | null
    acceptedAt: Date | null
    completedAt: Date | null
    declinedAt: Date | null
    priority: $Enums.CasePriority | null
    estimatedHours: number | null
    deadlineAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseAssignmentCountAggregateOutputType = {
    id: number
    caseId: number
    professionalId: number
    assignmentType: number
    specialization: number
    isActive: number
    assignedAt: number
    acceptedAt: number
    completedAt: number
    declinedAt: number
    priority: number
    estimatedHours: number
    deadlineAt: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseAssignmentAvgAggregateInputType = {
    estimatedHours?: true
  }

  export type CaseAssignmentSumAggregateInputType = {
    estimatedHours?: true
  }

  export type CaseAssignmentMinAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    assignmentType?: true
    specialization?: true
    isActive?: true
    assignedAt?: true
    acceptedAt?: true
    completedAt?: true
    declinedAt?: true
    priority?: true
    estimatedHours?: true
    deadlineAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseAssignmentMaxAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    assignmentType?: true
    specialization?: true
    isActive?: true
    assignedAt?: true
    acceptedAt?: true
    completedAt?: true
    declinedAt?: true
    priority?: true
    estimatedHours?: true
    deadlineAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseAssignmentCountAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    assignmentType?: true
    specialization?: true
    isActive?: true
    assignedAt?: true
    acceptedAt?: true
    completedAt?: true
    declinedAt?: true
    priority?: true
    estimatedHours?: true
    deadlineAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
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
     * Select which fields to average
    **/
    _avg?: CaseAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CaseAssignmentSumAggregateInputType
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
    _avg?: CaseAssignmentAvgAggregateInputType
    _sum?: CaseAssignmentSumAggregateInputType
    _min?: CaseAssignmentMinAggregateInputType
    _max?: CaseAssignmentMaxAggregateInputType
  }

  export type CaseAssignmentGroupByOutputType = {
    id: string
    caseId: string
    professionalId: string
    assignmentType: string
    specialization: string | null
    isActive: boolean
    assignedAt: Date
    acceptedAt: Date | null
    completedAt: Date | null
    declinedAt: Date | null
    priority: $Enums.CasePriority
    estimatedHours: number | null
    deadlineAt: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: CaseAssignmentCountAggregateOutputType | null
    _avg: CaseAssignmentAvgAggregateOutputType | null
    _sum: CaseAssignmentSumAggregateOutputType | null
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
    assignmentType?: boolean
    specialization?: boolean
    isActive?: boolean
    assignedAt?: boolean
    acceptedAt?: boolean
    completedAt?: boolean
    declinedAt?: boolean
    priority?: boolean
    estimatedHours?: boolean
    deadlineAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    assignmentType?: boolean
    specialization?: boolean
    isActive?: boolean
    assignedAt?: boolean
    acceptedAt?: boolean
    completedAt?: boolean
    declinedAt?: boolean
    priority?: boolean
    estimatedHours?: boolean
    deadlineAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    assignmentType?: boolean
    specialization?: boolean
    isActive?: boolean
    assignedAt?: boolean
    acceptedAt?: boolean
    completedAt?: boolean
    declinedAt?: boolean
    priority?: boolean
    estimatedHours?: boolean
    deadlineAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectScalar = {
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    assignmentType?: boolean
    specialization?: boolean
    isActive?: boolean
    assignedAt?: boolean
    acceptedAt?: boolean
    completedAt?: boolean
    declinedAt?: boolean
    priority?: boolean
    estimatedHours?: boolean
    deadlineAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "professionalId" | "assignmentType" | "specialization" | "isActive" | "assignedAt" | "acceptedAt" | "completedAt" | "declinedAt" | "priority" | "estimatedHours" | "deadlineAt" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["caseAssignment"]>
  export type CaseAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type CaseAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type CaseAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $CaseAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseAssignment"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      professionalId: string
      assignmentType: string
      specialization: string | null
      isActive: boolean
      assignedAt: Date
      acceptedAt: Date | null
      completedAt: Date | null
      declinedAt: Date | null
      priority: $Enums.CasePriority
      estimatedHours: number | null
      deadlineAt: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
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
    readonly assignmentType: FieldRef<"CaseAssignment", 'String'>
    readonly specialization: FieldRef<"CaseAssignment", 'String'>
    readonly isActive: FieldRef<"CaseAssignment", 'Boolean'>
    readonly assignedAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly acceptedAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly completedAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly declinedAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly priority: FieldRef<"CaseAssignment", 'CasePriority'>
    readonly estimatedHours: FieldRef<"CaseAssignment", 'Int'>
    readonly deadlineAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly notes: FieldRef<"CaseAssignment", 'String'>
    readonly createdAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly updatedAt: FieldRef<"CaseAssignment", 'DateTime'>
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
    skipDuplicates?: boolean
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
    skipDuplicates?: boolean
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
   * Model CaseReview
   */

  export type AggregateCaseReview = {
    _count: CaseReviewCountAggregateOutputType | null
    _avg: CaseReviewAvgAggregateOutputType | null
    _sum: CaseReviewSumAggregateOutputType | null
    _min: CaseReviewMinAggregateOutputType | null
    _max: CaseReviewMaxAggregateOutputType | null
  }

  export type CaseReviewAvgAggregateOutputType = {
    confidenceScore: number | null
    reviewDuration: number | null
  }

  export type CaseReviewSumAggregateOutputType = {
    confidenceScore: number | null
    reviewDuration: number | null
  }

  export type CaseReviewMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    reviewerId: string | null
    reviewerType: string | null
    reviewType: string | null
    findings: string | null
    diagnosis: string | null
    recommendations: string | null
    confidenceScore: number | null
    reviewDuration: number | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseReviewMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    reviewerId: string | null
    reviewerType: string | null
    reviewType: string | null
    findings: string | null
    diagnosis: string | null
    recommendations: string | null
    confidenceScore: number | null
    reviewDuration: number | null
    status: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CaseReviewCountAggregateOutputType = {
    id: number
    caseId: number
    reviewerId: number
    reviewerType: number
    reviewType: number
    findings: number
    diagnosis: number
    recommendations: number
    confidenceScore: number
    reviewDuration: number
    status: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CaseReviewAvgAggregateInputType = {
    confidenceScore?: true
    reviewDuration?: true
  }

  export type CaseReviewSumAggregateInputType = {
    confidenceScore?: true
    reviewDuration?: true
  }

  export type CaseReviewMinAggregateInputType = {
    id?: true
    caseId?: true
    reviewerId?: true
    reviewerType?: true
    reviewType?: true
    findings?: true
    diagnosis?: true
    recommendations?: true
    confidenceScore?: true
    reviewDuration?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseReviewMaxAggregateInputType = {
    id?: true
    caseId?: true
    reviewerId?: true
    reviewerType?: true
    reviewType?: true
    findings?: true
    diagnosis?: true
    recommendations?: true
    confidenceScore?: true
    reviewDuration?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CaseReviewCountAggregateInputType = {
    id?: true
    caseId?: true
    reviewerId?: true
    reviewerType?: true
    reviewType?: true
    findings?: true
    diagnosis?: true
    recommendations?: true
    confidenceScore?: true
    reviewDuration?: true
    status?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CaseReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseReview to aggregate.
     */
    where?: CaseReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseReviews to fetch.
     */
    orderBy?: CaseReviewOrderByWithRelationInput | CaseReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseReviews
    **/
    _count?: true | CaseReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CaseReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CaseReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseReviewMaxAggregateInputType
  }

  export type GetCaseReviewAggregateType<T extends CaseReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseReview[P]>
      : GetScalarType<T[P], AggregateCaseReview[P]>
  }




  export type CaseReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseReviewWhereInput
    orderBy?: CaseReviewOrderByWithAggregationInput | CaseReviewOrderByWithAggregationInput[]
    by: CaseReviewScalarFieldEnum[] | CaseReviewScalarFieldEnum
    having?: CaseReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseReviewCountAggregateInputType | true
    _avg?: CaseReviewAvgAggregateInputType
    _sum?: CaseReviewSumAggregateInputType
    _min?: CaseReviewMinAggregateInputType
    _max?: CaseReviewMaxAggregateInputType
  }

  export type CaseReviewGroupByOutputType = {
    id: string
    caseId: string
    reviewerId: string
    reviewerType: string
    reviewType: string
    findings: string | null
    diagnosis: string | null
    recommendations: string | null
    confidenceScore: number | null
    reviewDuration: number | null
    status: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CaseReviewCountAggregateOutputType | null
    _avg: CaseReviewAvgAggregateOutputType | null
    _sum: CaseReviewSumAggregateOutputType | null
    _min: CaseReviewMinAggregateOutputType | null
    _max: CaseReviewMaxAggregateOutputType | null
  }

  type GetCaseReviewGroupByPayload<T extends CaseReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseReviewGroupByOutputType[P]>
            : GetScalarType<T[P], CaseReviewGroupByOutputType[P]>
        }
      >
    >


  export type CaseReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    reviewType?: boolean
    findings?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    confidenceScore?: boolean
    reviewDuration?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseReview"]>

  export type CaseReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    reviewType?: boolean
    findings?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    confidenceScore?: boolean
    reviewDuration?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseReview"]>

  export type CaseReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    reviewType?: boolean
    findings?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    confidenceScore?: boolean
    reviewDuration?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseReview"]>

  export type CaseReviewSelectScalar = {
    id?: boolean
    caseId?: boolean
    reviewerId?: boolean
    reviewerType?: boolean
    reviewType?: boolean
    findings?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    confidenceScore?: boolean
    reviewDuration?: boolean
    status?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "reviewerId" | "reviewerType" | "reviewType" | "findings" | "diagnosis" | "recommendations" | "confidenceScore" | "reviewDuration" | "status" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["caseReview"]>
  export type CaseReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type CaseReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }
  export type CaseReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }

  export type $CaseReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseReview"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      reviewerId: string
      reviewerType: string
      reviewType: string
      findings: string | null
      diagnosis: string | null
      recommendations: string | null
      confidenceScore: number | null
      reviewDuration: number | null
      status: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["caseReview"]>
    composites: {}
  }

  type CaseReviewGetPayload<S extends boolean | null | undefined | CaseReviewDefaultArgs> = $Result.GetResult<Prisma.$CaseReviewPayload, S>

  type CaseReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseReviewCountAggregateInputType | true
    }

  export interface CaseReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseReview'], meta: { name: 'CaseReview' } }
    /**
     * Find zero or one CaseReview that matches the filter.
     * @param {CaseReviewFindUniqueArgs} args - Arguments to find a CaseReview
     * @example
     * // Get one CaseReview
     * const caseReview = await prisma.caseReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseReviewFindUniqueArgs>(args: SelectSubset<T, CaseReviewFindUniqueArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseReviewFindUniqueOrThrowArgs} args - Arguments to find a CaseReview
     * @example
     * // Get one CaseReview
     * const caseReview = await prisma.caseReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseReviewFindFirstArgs} args - Arguments to find a CaseReview
     * @example
     * // Get one CaseReview
     * const caseReview = await prisma.caseReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseReviewFindFirstArgs>(args?: SelectSubset<T, CaseReviewFindFirstArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseReviewFindFirstOrThrowArgs} args - Arguments to find a CaseReview
     * @example
     * // Get one CaseReview
     * const caseReview = await prisma.caseReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseReviews
     * const caseReviews = await prisma.caseReview.findMany()
     * 
     * // Get first 10 CaseReviews
     * const caseReviews = await prisma.caseReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseReviewWithIdOnly = await prisma.caseReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseReviewFindManyArgs>(args?: SelectSubset<T, CaseReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseReview.
     * @param {CaseReviewCreateArgs} args - Arguments to create a CaseReview.
     * @example
     * // Create one CaseReview
     * const CaseReview = await prisma.caseReview.create({
     *   data: {
     *     // ... data to create a CaseReview
     *   }
     * })
     * 
     */
    create<T extends CaseReviewCreateArgs>(args: SelectSubset<T, CaseReviewCreateArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseReviews.
     * @param {CaseReviewCreateManyArgs} args - Arguments to create many CaseReviews.
     * @example
     * // Create many CaseReviews
     * const caseReview = await prisma.caseReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseReviewCreateManyArgs>(args?: SelectSubset<T, CaseReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseReviews and returns the data saved in the database.
     * @param {CaseReviewCreateManyAndReturnArgs} args - Arguments to create many CaseReviews.
     * @example
     * // Create many CaseReviews
     * const caseReview = await prisma.caseReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseReviews and only return the `id`
     * const caseReviewWithIdOnly = await prisma.caseReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseReview.
     * @param {CaseReviewDeleteArgs} args - Arguments to delete one CaseReview.
     * @example
     * // Delete one CaseReview
     * const CaseReview = await prisma.caseReview.delete({
     *   where: {
     *     // ... filter to delete one CaseReview
     *   }
     * })
     * 
     */
    delete<T extends CaseReviewDeleteArgs>(args: SelectSubset<T, CaseReviewDeleteArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseReview.
     * @param {CaseReviewUpdateArgs} args - Arguments to update one CaseReview.
     * @example
     * // Update one CaseReview
     * const caseReview = await prisma.caseReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseReviewUpdateArgs>(args: SelectSubset<T, CaseReviewUpdateArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseReviews.
     * @param {CaseReviewDeleteManyArgs} args - Arguments to filter CaseReviews to delete.
     * @example
     * // Delete a few CaseReviews
     * const { count } = await prisma.caseReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseReviewDeleteManyArgs>(args?: SelectSubset<T, CaseReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseReviews
     * const caseReview = await prisma.caseReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseReviewUpdateManyArgs>(args: SelectSubset<T, CaseReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseReviews and returns the data updated in the database.
     * @param {CaseReviewUpdateManyAndReturnArgs} args - Arguments to update many CaseReviews.
     * @example
     * // Update many CaseReviews
     * const caseReview = await prisma.caseReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseReviews and only return the `id`
     * const caseReviewWithIdOnly = await prisma.caseReview.updateManyAndReturn({
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
    updateManyAndReturn<T extends CaseReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseReview.
     * @param {CaseReviewUpsertArgs} args - Arguments to update or create a CaseReview.
     * @example
     * // Update or create a CaseReview
     * const caseReview = await prisma.caseReview.upsert({
     *   create: {
     *     // ... data to create a CaseReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseReview we want to update
     *   }
     * })
     */
    upsert<T extends CaseReviewUpsertArgs>(args: SelectSubset<T, CaseReviewUpsertArgs<ExtArgs>>): Prisma__CaseReviewClient<$Result.GetResult<Prisma.$CaseReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseReviewCountArgs} args - Arguments to filter CaseReviews to count.
     * @example
     * // Count the number of CaseReviews
     * const count = await prisma.caseReview.count({
     *   where: {
     *     // ... the filter for the CaseReviews we want to count
     *   }
     * })
    **/
    count<T extends CaseReviewCountArgs>(
      args?: Subset<T, CaseReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CaseReviewAggregateArgs>(args: Subset<T, CaseReviewAggregateArgs>): Prisma.PrismaPromise<GetCaseReviewAggregateType<T>>

    /**
     * Group by CaseReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseReviewGroupByArgs} args - Group by arguments.
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
      T extends CaseReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseReviewGroupByArgs['orderBy'] }
        : { orderBy?: CaseReviewGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CaseReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseReview model
   */
  readonly fields: CaseReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CaseReview model
   */
  interface CaseReviewFieldRefs {
    readonly id: FieldRef<"CaseReview", 'String'>
    readonly caseId: FieldRef<"CaseReview", 'String'>
    readonly reviewerId: FieldRef<"CaseReview", 'String'>
    readonly reviewerType: FieldRef<"CaseReview", 'String'>
    readonly reviewType: FieldRef<"CaseReview", 'String'>
    readonly findings: FieldRef<"CaseReview", 'String'>
    readonly diagnosis: FieldRef<"CaseReview", 'String'>
    readonly recommendations: FieldRef<"CaseReview", 'String'>
    readonly confidenceScore: FieldRef<"CaseReview", 'Float'>
    readonly reviewDuration: FieldRef<"CaseReview", 'Int'>
    readonly status: FieldRef<"CaseReview", 'String'>
    readonly isActive: FieldRef<"CaseReview", 'Boolean'>
    readonly createdAt: FieldRef<"CaseReview", 'DateTime'>
    readonly updatedAt: FieldRef<"CaseReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseReview findUnique
   */
  export type CaseReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * Filter, which CaseReview to fetch.
     */
    where: CaseReviewWhereUniqueInput
  }

  /**
   * CaseReview findUniqueOrThrow
   */
  export type CaseReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * Filter, which CaseReview to fetch.
     */
    where: CaseReviewWhereUniqueInput
  }

  /**
   * CaseReview findFirst
   */
  export type CaseReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * Filter, which CaseReview to fetch.
     */
    where?: CaseReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseReviews to fetch.
     */
    orderBy?: CaseReviewOrderByWithRelationInput | CaseReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseReviews.
     */
    cursor?: CaseReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseReviews.
     */
    distinct?: CaseReviewScalarFieldEnum | CaseReviewScalarFieldEnum[]
  }

  /**
   * CaseReview findFirstOrThrow
   */
  export type CaseReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * Filter, which CaseReview to fetch.
     */
    where?: CaseReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseReviews to fetch.
     */
    orderBy?: CaseReviewOrderByWithRelationInput | CaseReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseReviews.
     */
    cursor?: CaseReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseReviews.
     */
    distinct?: CaseReviewScalarFieldEnum | CaseReviewScalarFieldEnum[]
  }

  /**
   * CaseReview findMany
   */
  export type CaseReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * Filter, which CaseReviews to fetch.
     */
    where?: CaseReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseReviews to fetch.
     */
    orderBy?: CaseReviewOrderByWithRelationInput | CaseReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseReviews.
     */
    cursor?: CaseReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseReviews.
     */
    skip?: number
    distinct?: CaseReviewScalarFieldEnum | CaseReviewScalarFieldEnum[]
  }

  /**
   * CaseReview create
   */
  export type CaseReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseReview.
     */
    data: XOR<CaseReviewCreateInput, CaseReviewUncheckedCreateInput>
  }

  /**
   * CaseReview createMany
   */
  export type CaseReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseReviews.
     */
    data: CaseReviewCreateManyInput | CaseReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseReview createManyAndReturn
   */
  export type CaseReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * The data used to create many CaseReviews.
     */
    data: CaseReviewCreateManyInput | CaseReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseReview update
   */
  export type CaseReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseReview.
     */
    data: XOR<CaseReviewUpdateInput, CaseReviewUncheckedUpdateInput>
    /**
     * Choose, which CaseReview to update.
     */
    where: CaseReviewWhereUniqueInput
  }

  /**
   * CaseReview updateMany
   */
  export type CaseReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseReviews.
     */
    data: XOR<CaseReviewUpdateManyMutationInput, CaseReviewUncheckedUpdateManyInput>
    /**
     * Filter which CaseReviews to update
     */
    where?: CaseReviewWhereInput
    /**
     * Limit how many CaseReviews to update.
     */
    limit?: number
  }

  /**
   * CaseReview updateManyAndReturn
   */
  export type CaseReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * The data used to update CaseReviews.
     */
    data: XOR<CaseReviewUpdateManyMutationInput, CaseReviewUncheckedUpdateManyInput>
    /**
     * Filter which CaseReviews to update
     */
    where?: CaseReviewWhereInput
    /**
     * Limit how many CaseReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseReview upsert
   */
  export type CaseReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseReview to update in case it exists.
     */
    where: CaseReviewWhereUniqueInput
    /**
     * In case the CaseReview found by the `where` argument doesn't exist, create a new CaseReview with this data.
     */
    create: XOR<CaseReviewCreateInput, CaseReviewUncheckedCreateInput>
    /**
     * In case the CaseReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseReviewUpdateInput, CaseReviewUncheckedUpdateInput>
  }

  /**
   * CaseReview delete
   */
  export type CaseReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
    /**
     * Filter which CaseReview to delete.
     */
    where: CaseReviewWhereUniqueInput
  }

  /**
   * CaseReview deleteMany
   */
  export type CaseReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseReviews to delete
     */
    where?: CaseReviewWhereInput
    /**
     * Limit how many CaseReviews to delete.
     */
    limit?: number
  }

  /**
   * CaseReview without action
   */
  export type CaseReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseReview
     */
    select?: CaseReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseReview
     */
    omit?: CaseReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseReviewInclude<ExtArgs> | null
  }


  /**
   * Model TempCaseSubmission
   */

  export type AggregateTempCaseSubmission = {
    _count: TempCaseSubmissionCountAggregateOutputType | null
    _min: TempCaseSubmissionMinAggregateOutputType | null
    _max: TempCaseSubmissionMaxAggregateOutputType | null
  }

  export type TempCaseSubmissionMinAggregateOutputType = {
    id: string | null
    submissionToken: string | null
    expiresAt: Date | null
    convertedToCaseId: string | null
    convertedAt: Date | null
    clientIP: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type TempCaseSubmissionMaxAggregateOutputType = {
    id: string | null
    submissionToken: string | null
    expiresAt: Date | null
    convertedToCaseId: string | null
    convertedAt: Date | null
    clientIP: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type TempCaseSubmissionCountAggregateOutputType = {
    id: number
    patientData: number
    caseData: number
    documentReferences: number
    submissionToken: number
    expiresAt: number
    convertedToCaseId: number
    convertedAt: number
    clientIP: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type TempCaseSubmissionMinAggregateInputType = {
    id?: true
    submissionToken?: true
    expiresAt?: true
    convertedToCaseId?: true
    convertedAt?: true
    clientIP?: true
    userAgent?: true
    createdAt?: true
  }

  export type TempCaseSubmissionMaxAggregateInputType = {
    id?: true
    submissionToken?: true
    expiresAt?: true
    convertedToCaseId?: true
    convertedAt?: true
    clientIP?: true
    userAgent?: true
    createdAt?: true
  }

  export type TempCaseSubmissionCountAggregateInputType = {
    id?: true
    patientData?: true
    caseData?: true
    documentReferences?: true
    submissionToken?: true
    expiresAt?: true
    convertedToCaseId?: true
    convertedAt?: true
    clientIP?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type TempCaseSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TempCaseSubmission to aggregate.
     */
    where?: TempCaseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempCaseSubmissions to fetch.
     */
    orderBy?: TempCaseSubmissionOrderByWithRelationInput | TempCaseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TempCaseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempCaseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempCaseSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TempCaseSubmissions
    **/
    _count?: true | TempCaseSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TempCaseSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TempCaseSubmissionMaxAggregateInputType
  }

  export type GetTempCaseSubmissionAggregateType<T extends TempCaseSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateTempCaseSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTempCaseSubmission[P]>
      : GetScalarType<T[P], AggregateTempCaseSubmission[P]>
  }




  export type TempCaseSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TempCaseSubmissionWhereInput
    orderBy?: TempCaseSubmissionOrderByWithAggregationInput | TempCaseSubmissionOrderByWithAggregationInput[]
    by: TempCaseSubmissionScalarFieldEnum[] | TempCaseSubmissionScalarFieldEnum
    having?: TempCaseSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TempCaseSubmissionCountAggregateInputType | true
    _min?: TempCaseSubmissionMinAggregateInputType
    _max?: TempCaseSubmissionMaxAggregateInputType
  }

  export type TempCaseSubmissionGroupByOutputType = {
    id: string
    patientData: JsonValue
    caseData: JsonValue
    documentReferences: JsonValue | null
    submissionToken: string
    expiresAt: Date
    convertedToCaseId: string | null
    convertedAt: Date | null
    clientIP: string | null
    userAgent: string | null
    createdAt: Date
    _count: TempCaseSubmissionCountAggregateOutputType | null
    _min: TempCaseSubmissionMinAggregateOutputType | null
    _max: TempCaseSubmissionMaxAggregateOutputType | null
  }

  type GetTempCaseSubmissionGroupByPayload<T extends TempCaseSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TempCaseSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TempCaseSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TempCaseSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], TempCaseSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type TempCaseSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientData?: boolean
    caseData?: boolean
    documentReferences?: boolean
    submissionToken?: boolean
    expiresAt?: boolean
    convertedToCaseId?: boolean
    convertedAt?: boolean
    clientIP?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tempCaseSubmission"]>

  export type TempCaseSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientData?: boolean
    caseData?: boolean
    documentReferences?: boolean
    submissionToken?: boolean
    expiresAt?: boolean
    convertedToCaseId?: boolean
    convertedAt?: boolean
    clientIP?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tempCaseSubmission"]>

  export type TempCaseSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientData?: boolean
    caseData?: boolean
    documentReferences?: boolean
    submissionToken?: boolean
    expiresAt?: boolean
    convertedToCaseId?: boolean
    convertedAt?: boolean
    clientIP?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tempCaseSubmission"]>

  export type TempCaseSubmissionSelectScalar = {
    id?: boolean
    patientData?: boolean
    caseData?: boolean
    documentReferences?: boolean
    submissionToken?: boolean
    expiresAt?: boolean
    convertedToCaseId?: boolean
    convertedAt?: boolean
    clientIP?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type TempCaseSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientData" | "caseData" | "documentReferences" | "submissionToken" | "expiresAt" | "convertedToCaseId" | "convertedAt" | "clientIP" | "userAgent" | "createdAt", ExtArgs["result"]["tempCaseSubmission"]>

  export type $TempCaseSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TempCaseSubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientData: Prisma.JsonValue
      caseData: Prisma.JsonValue
      documentReferences: Prisma.JsonValue | null
      submissionToken: string
      expiresAt: Date
      convertedToCaseId: string | null
      convertedAt: Date | null
      clientIP: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["tempCaseSubmission"]>
    composites: {}
  }

  type TempCaseSubmissionGetPayload<S extends boolean | null | undefined | TempCaseSubmissionDefaultArgs> = $Result.GetResult<Prisma.$TempCaseSubmissionPayload, S>

  type TempCaseSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TempCaseSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TempCaseSubmissionCountAggregateInputType | true
    }

  export interface TempCaseSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TempCaseSubmission'], meta: { name: 'TempCaseSubmission' } }
    /**
     * Find zero or one TempCaseSubmission that matches the filter.
     * @param {TempCaseSubmissionFindUniqueArgs} args - Arguments to find a TempCaseSubmission
     * @example
     * // Get one TempCaseSubmission
     * const tempCaseSubmission = await prisma.tempCaseSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TempCaseSubmissionFindUniqueArgs>(args: SelectSubset<T, TempCaseSubmissionFindUniqueArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TempCaseSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TempCaseSubmissionFindUniqueOrThrowArgs} args - Arguments to find a TempCaseSubmission
     * @example
     * // Get one TempCaseSubmission
     * const tempCaseSubmission = await prisma.tempCaseSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TempCaseSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, TempCaseSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TempCaseSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempCaseSubmissionFindFirstArgs} args - Arguments to find a TempCaseSubmission
     * @example
     * // Get one TempCaseSubmission
     * const tempCaseSubmission = await prisma.tempCaseSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TempCaseSubmissionFindFirstArgs>(args?: SelectSubset<T, TempCaseSubmissionFindFirstArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TempCaseSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempCaseSubmissionFindFirstOrThrowArgs} args - Arguments to find a TempCaseSubmission
     * @example
     * // Get one TempCaseSubmission
     * const tempCaseSubmission = await prisma.tempCaseSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TempCaseSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, TempCaseSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TempCaseSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempCaseSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TempCaseSubmissions
     * const tempCaseSubmissions = await prisma.tempCaseSubmission.findMany()
     * 
     * // Get first 10 TempCaseSubmissions
     * const tempCaseSubmissions = await prisma.tempCaseSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tempCaseSubmissionWithIdOnly = await prisma.tempCaseSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TempCaseSubmissionFindManyArgs>(args?: SelectSubset<T, TempCaseSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TempCaseSubmission.
     * @param {TempCaseSubmissionCreateArgs} args - Arguments to create a TempCaseSubmission.
     * @example
     * // Create one TempCaseSubmission
     * const TempCaseSubmission = await prisma.tempCaseSubmission.create({
     *   data: {
     *     // ... data to create a TempCaseSubmission
     *   }
     * })
     * 
     */
    create<T extends TempCaseSubmissionCreateArgs>(args: SelectSubset<T, TempCaseSubmissionCreateArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TempCaseSubmissions.
     * @param {TempCaseSubmissionCreateManyArgs} args - Arguments to create many TempCaseSubmissions.
     * @example
     * // Create many TempCaseSubmissions
     * const tempCaseSubmission = await prisma.tempCaseSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TempCaseSubmissionCreateManyArgs>(args?: SelectSubset<T, TempCaseSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TempCaseSubmissions and returns the data saved in the database.
     * @param {TempCaseSubmissionCreateManyAndReturnArgs} args - Arguments to create many TempCaseSubmissions.
     * @example
     * // Create many TempCaseSubmissions
     * const tempCaseSubmission = await prisma.tempCaseSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TempCaseSubmissions and only return the `id`
     * const tempCaseSubmissionWithIdOnly = await prisma.tempCaseSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TempCaseSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, TempCaseSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TempCaseSubmission.
     * @param {TempCaseSubmissionDeleteArgs} args - Arguments to delete one TempCaseSubmission.
     * @example
     * // Delete one TempCaseSubmission
     * const TempCaseSubmission = await prisma.tempCaseSubmission.delete({
     *   where: {
     *     // ... filter to delete one TempCaseSubmission
     *   }
     * })
     * 
     */
    delete<T extends TempCaseSubmissionDeleteArgs>(args: SelectSubset<T, TempCaseSubmissionDeleteArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TempCaseSubmission.
     * @param {TempCaseSubmissionUpdateArgs} args - Arguments to update one TempCaseSubmission.
     * @example
     * // Update one TempCaseSubmission
     * const tempCaseSubmission = await prisma.tempCaseSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TempCaseSubmissionUpdateArgs>(args: SelectSubset<T, TempCaseSubmissionUpdateArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TempCaseSubmissions.
     * @param {TempCaseSubmissionDeleteManyArgs} args - Arguments to filter TempCaseSubmissions to delete.
     * @example
     * // Delete a few TempCaseSubmissions
     * const { count } = await prisma.tempCaseSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TempCaseSubmissionDeleteManyArgs>(args?: SelectSubset<T, TempCaseSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TempCaseSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempCaseSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TempCaseSubmissions
     * const tempCaseSubmission = await prisma.tempCaseSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TempCaseSubmissionUpdateManyArgs>(args: SelectSubset<T, TempCaseSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TempCaseSubmissions and returns the data updated in the database.
     * @param {TempCaseSubmissionUpdateManyAndReturnArgs} args - Arguments to update many TempCaseSubmissions.
     * @example
     * // Update many TempCaseSubmissions
     * const tempCaseSubmission = await prisma.tempCaseSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TempCaseSubmissions and only return the `id`
     * const tempCaseSubmissionWithIdOnly = await prisma.tempCaseSubmission.updateManyAndReturn({
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
    updateManyAndReturn<T extends TempCaseSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, TempCaseSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TempCaseSubmission.
     * @param {TempCaseSubmissionUpsertArgs} args - Arguments to update or create a TempCaseSubmission.
     * @example
     * // Update or create a TempCaseSubmission
     * const tempCaseSubmission = await prisma.tempCaseSubmission.upsert({
     *   create: {
     *     // ... data to create a TempCaseSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TempCaseSubmission we want to update
     *   }
     * })
     */
    upsert<T extends TempCaseSubmissionUpsertArgs>(args: SelectSubset<T, TempCaseSubmissionUpsertArgs<ExtArgs>>): Prisma__TempCaseSubmissionClient<$Result.GetResult<Prisma.$TempCaseSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TempCaseSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempCaseSubmissionCountArgs} args - Arguments to filter TempCaseSubmissions to count.
     * @example
     * // Count the number of TempCaseSubmissions
     * const count = await prisma.tempCaseSubmission.count({
     *   where: {
     *     // ... the filter for the TempCaseSubmissions we want to count
     *   }
     * })
    **/
    count<T extends TempCaseSubmissionCountArgs>(
      args?: Subset<T, TempCaseSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TempCaseSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TempCaseSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempCaseSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TempCaseSubmissionAggregateArgs>(args: Subset<T, TempCaseSubmissionAggregateArgs>): Prisma.PrismaPromise<GetTempCaseSubmissionAggregateType<T>>

    /**
     * Group by TempCaseSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TempCaseSubmissionGroupByArgs} args - Group by arguments.
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
      T extends TempCaseSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TempCaseSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: TempCaseSubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TempCaseSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTempCaseSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TempCaseSubmission model
   */
  readonly fields: TempCaseSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TempCaseSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TempCaseSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TempCaseSubmission model
   */
  interface TempCaseSubmissionFieldRefs {
    readonly id: FieldRef<"TempCaseSubmission", 'String'>
    readonly patientData: FieldRef<"TempCaseSubmission", 'Json'>
    readonly caseData: FieldRef<"TempCaseSubmission", 'Json'>
    readonly documentReferences: FieldRef<"TempCaseSubmission", 'Json'>
    readonly submissionToken: FieldRef<"TempCaseSubmission", 'String'>
    readonly expiresAt: FieldRef<"TempCaseSubmission", 'DateTime'>
    readonly convertedToCaseId: FieldRef<"TempCaseSubmission", 'String'>
    readonly convertedAt: FieldRef<"TempCaseSubmission", 'DateTime'>
    readonly clientIP: FieldRef<"TempCaseSubmission", 'String'>
    readonly userAgent: FieldRef<"TempCaseSubmission", 'String'>
    readonly createdAt: FieldRef<"TempCaseSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TempCaseSubmission findUnique
   */
  export type TempCaseSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempCaseSubmission to fetch.
     */
    where: TempCaseSubmissionWhereUniqueInput
  }

  /**
   * TempCaseSubmission findUniqueOrThrow
   */
  export type TempCaseSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempCaseSubmission to fetch.
     */
    where: TempCaseSubmissionWhereUniqueInput
  }

  /**
   * TempCaseSubmission findFirst
   */
  export type TempCaseSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempCaseSubmission to fetch.
     */
    where?: TempCaseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempCaseSubmissions to fetch.
     */
    orderBy?: TempCaseSubmissionOrderByWithRelationInput | TempCaseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TempCaseSubmissions.
     */
    cursor?: TempCaseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempCaseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempCaseSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TempCaseSubmissions.
     */
    distinct?: TempCaseSubmissionScalarFieldEnum | TempCaseSubmissionScalarFieldEnum[]
  }

  /**
   * TempCaseSubmission findFirstOrThrow
   */
  export type TempCaseSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempCaseSubmission to fetch.
     */
    where?: TempCaseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempCaseSubmissions to fetch.
     */
    orderBy?: TempCaseSubmissionOrderByWithRelationInput | TempCaseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TempCaseSubmissions.
     */
    cursor?: TempCaseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempCaseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempCaseSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TempCaseSubmissions.
     */
    distinct?: TempCaseSubmissionScalarFieldEnum | TempCaseSubmissionScalarFieldEnum[]
  }

  /**
   * TempCaseSubmission findMany
   */
  export type TempCaseSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which TempCaseSubmissions to fetch.
     */
    where?: TempCaseSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TempCaseSubmissions to fetch.
     */
    orderBy?: TempCaseSubmissionOrderByWithRelationInput | TempCaseSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TempCaseSubmissions.
     */
    cursor?: TempCaseSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TempCaseSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TempCaseSubmissions.
     */
    skip?: number
    distinct?: TempCaseSubmissionScalarFieldEnum | TempCaseSubmissionScalarFieldEnum[]
  }

  /**
   * TempCaseSubmission create
   */
  export type TempCaseSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to create a TempCaseSubmission.
     */
    data: XOR<TempCaseSubmissionCreateInput, TempCaseSubmissionUncheckedCreateInput>
  }

  /**
   * TempCaseSubmission createMany
   */
  export type TempCaseSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TempCaseSubmissions.
     */
    data: TempCaseSubmissionCreateManyInput | TempCaseSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TempCaseSubmission createManyAndReturn
   */
  export type TempCaseSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many TempCaseSubmissions.
     */
    data: TempCaseSubmissionCreateManyInput | TempCaseSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TempCaseSubmission update
   */
  export type TempCaseSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to update a TempCaseSubmission.
     */
    data: XOR<TempCaseSubmissionUpdateInput, TempCaseSubmissionUncheckedUpdateInput>
    /**
     * Choose, which TempCaseSubmission to update.
     */
    where: TempCaseSubmissionWhereUniqueInput
  }

  /**
   * TempCaseSubmission updateMany
   */
  export type TempCaseSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TempCaseSubmissions.
     */
    data: XOR<TempCaseSubmissionUpdateManyMutationInput, TempCaseSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which TempCaseSubmissions to update
     */
    where?: TempCaseSubmissionWhereInput
    /**
     * Limit how many TempCaseSubmissions to update.
     */
    limit?: number
  }

  /**
   * TempCaseSubmission updateManyAndReturn
   */
  export type TempCaseSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update TempCaseSubmissions.
     */
    data: XOR<TempCaseSubmissionUpdateManyMutationInput, TempCaseSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which TempCaseSubmissions to update
     */
    where?: TempCaseSubmissionWhereInput
    /**
     * Limit how many TempCaseSubmissions to update.
     */
    limit?: number
  }

  /**
   * TempCaseSubmission upsert
   */
  export type TempCaseSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * The filter to search for the TempCaseSubmission to update in case it exists.
     */
    where: TempCaseSubmissionWhereUniqueInput
    /**
     * In case the TempCaseSubmission found by the `where` argument doesn't exist, create a new TempCaseSubmission with this data.
     */
    create: XOR<TempCaseSubmissionCreateInput, TempCaseSubmissionUncheckedCreateInput>
    /**
     * In case the TempCaseSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TempCaseSubmissionUpdateInput, TempCaseSubmissionUncheckedUpdateInput>
  }

  /**
   * TempCaseSubmission delete
   */
  export type TempCaseSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
    /**
     * Filter which TempCaseSubmission to delete.
     */
    where: TempCaseSubmissionWhereUniqueInput
  }

  /**
   * TempCaseSubmission deleteMany
   */
  export type TempCaseSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TempCaseSubmissions to delete
     */
    where?: TempCaseSubmissionWhereInput
    /**
     * Limit how many TempCaseSubmissions to delete.
     */
    limit?: number
  }

  /**
   * TempCaseSubmission without action
   */
  export type TempCaseSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TempCaseSubmission
     */
    select?: TempCaseSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TempCaseSubmission
     */
    omit?: TempCaseSubmissionOmit<ExtArgs> | null
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


  export const CaseScalarFieldEnum: {
    id: 'id',
    caseNumber: 'caseNumber',
    customerId: 'customerId',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dateOfBirth: 'dateOfBirth',
    email: 'email',
    phone: 'phone',
    title: 'title',
    description: 'description',
    chiefComplaint: 'chiefComplaint',
    category: 'category',
    medicalHistory: 'medicalHistory',
    currentMedications: 'currentMedications',
    allergies: 'allergies',
    familyHistory: 'familyHistory',
    status: 'status',
    priority: 'priority',
    urgencyReason: 'urgencyReason',
    submittedAt: 'submittedAt',
    reviewStartedAt: 'reviewStartedAt',
    completedAt: 'completedAt',
    expiresAt: 'expiresAt',
    assignedProfessionalId: 'assignedProfessionalId',
    assignedAt: 'assignedAt',
    qualityScore: 'qualityScore',
    completenessScore: 'completenessScore',
    metadata: 'metadata',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    version: 'version'
  };

  export type CaseScalarFieldEnum = (typeof CaseScalarFieldEnum)[keyof typeof CaseScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    originalFilename: 'originalFilename',
    filename: 'filename',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    fileExtension: 'fileExtension',
    documentType: 'documentType',
    category: 'category',
    description: 'description',
    cloudProvider: 'cloudProvider',
    bucketName: 'bucketName',
    objectKey: 'objectKey',
    storageRegion: 'storageRegion',
    status: 'status',
    processingStartedAt: 'processingStartedAt',
    processingCompletedAt: 'processingCompletedAt',
    processingError: 'processingError',
    textContent: 'textContent',
    ocrConfidence: 'ocrConfidence',
    pageCount: 'pageCount',
    encryptionStatus: 'encryptionStatus',
    checksumSHA256: 'checksumSHA256',
    virusScanStatus: 'virusScanStatus',
    virusScanAt: 'virusScanAt',
    isPublic: 'isPublic',
    accessPermissions: 'accessPermissions',
    metadata: 'metadata',
    uploadedByType: 'uploadedByType',
    uploadedById: 'uploadedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentExtractionScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    extractionType: 'extractionType',
    extractedData: 'extractedData',
    confidence: 'confidence',
    extractorName: 'extractorName',
    extractorVersion: 'extractorVersion',
    processingTime: 'processingTime',
    createdAt: 'createdAt'
  };

  export type DocumentExtractionScalarFieldEnum = (typeof DocumentExtractionScalarFieldEnum)[keyof typeof DocumentExtractionScalarFieldEnum]


  export const CaseStatusHistoryScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    fromStatus: 'fromStatus',
    toStatus: 'toStatus',
    reason: 'reason',
    notes: 'notes',
    changedByType: 'changedByType',
    changedById: 'changedById',
    createdAt: 'createdAt'
  };

  export type CaseStatusHistoryScalarFieldEnum = (typeof CaseStatusHistoryScalarFieldEnum)[keyof typeof CaseStatusHistoryScalarFieldEnum]


  export const CaseAssignmentScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    professionalId: 'professionalId',
    assignmentType: 'assignmentType',
    specialization: 'specialization',
    isActive: 'isActive',
    assignedAt: 'assignedAt',
    acceptedAt: 'acceptedAt',
    completedAt: 'completedAt',
    declinedAt: 'declinedAt',
    priority: 'priority',
    estimatedHours: 'estimatedHours',
    deadlineAt: 'deadlineAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseAssignmentScalarFieldEnum = (typeof CaseAssignmentScalarFieldEnum)[keyof typeof CaseAssignmentScalarFieldEnum]


  export const CaseReviewScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    reviewerId: 'reviewerId',
    reviewerType: 'reviewerType',
    reviewType: 'reviewType',
    findings: 'findings',
    diagnosis: 'diagnosis',
    recommendations: 'recommendations',
    confidenceScore: 'confidenceScore',
    reviewDuration: 'reviewDuration',
    status: 'status',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseReviewScalarFieldEnum = (typeof CaseReviewScalarFieldEnum)[keyof typeof CaseReviewScalarFieldEnum]


  export const TempCaseSubmissionScalarFieldEnum: {
    id: 'id',
    patientData: 'patientData',
    caseData: 'caseData',
    documentReferences: 'documentReferences',
    submissionToken: 'submissionToken',
    expiresAt: 'expiresAt',
    convertedToCaseId: 'convertedToCaseId',
    convertedAt: 'convertedAt',
    clientIP: 'clientIP',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type TempCaseSubmissionScalarFieldEnum = (typeof TempCaseSubmissionScalarFieldEnum)[keyof typeof TempCaseSubmissionScalarFieldEnum]


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


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CaseCategory'
   */
  export type EnumCaseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseCategory'>
    


  /**
   * Reference to a field of type 'CaseCategory[]'
   */
  export type ListEnumCaseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseCategory[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'CaseStatus'
   */
  export type EnumCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStatus'>
    


  /**
   * Reference to a field of type 'CaseStatus[]'
   */
  export type ListEnumCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStatus[]'>
    


  /**
   * Reference to a field of type 'CasePriority'
   */
  export type EnumCasePriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CasePriority'>
    


  /**
   * Reference to a field of type 'CasePriority[]'
   */
  export type ListEnumCasePriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CasePriority[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    


  /**
   * Reference to a field of type 'DocumentStatus'
   */
  export type EnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus'>
    


  /**
   * Reference to a field of type 'DocumentStatus[]'
   */
  export type ListEnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type CaseWhereInput = {
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    id?: StringFilter<"Case"> | string
    caseNumber?: StringFilter<"Case"> | string
    customerId?: StringFilter<"Case"> | string
    firstName?: StringFilter<"Case"> | string
    middleName?: StringNullableFilter<"Case"> | string | null
    lastName?: StringFilter<"Case"> | string
    dateOfBirth?: DateTimeFilter<"Case"> | Date | string
    email?: StringFilter<"Case"> | string
    phone?: StringNullableFilter<"Case"> | string | null
    title?: StringNullableFilter<"Case"> | string | null
    description?: StringNullableFilter<"Case"> | string | null
    chiefComplaint?: StringNullableFilter<"Case"> | string | null
    category?: EnumCaseCategoryFilter<"Case"> | $Enums.CaseCategory
    medicalHistory?: JsonNullableFilter<"Case">
    currentMedications?: JsonNullableFilter<"Case">
    allergies?: JsonNullableFilter<"Case">
    familyHistory?: JsonNullableFilter<"Case">
    status?: EnumCaseStatusFilter<"Case"> | $Enums.CaseStatus
    priority?: EnumCasePriorityFilter<"Case"> | $Enums.CasePriority
    urgencyReason?: StringNullableFilter<"Case"> | string | null
    submittedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    reviewStartedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    assignedProfessionalId?: StringNullableFilter<"Case"> | string | null
    assignedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    qualityScore?: FloatNullableFilter<"Case"> | number | null
    completenessScore?: FloatNullableFilter<"Case"> | number | null
    metadata?: JsonNullableFilter<"Case">
    tags?: StringNullableListFilter<"Case">
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    version?: IntFilter<"Case"> | number
    documents?: DocumentListRelationFilter
    statusHistory?: CaseStatusHistoryListRelationFilter
    assignments?: CaseAssignmentListRelationFilter
    reviews?: CaseReviewListRelationFilter
  }

  export type CaseOrderByWithRelationInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    customerId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    chiefComplaint?: SortOrderInput | SortOrder
    category?: SortOrder
    medicalHistory?: SortOrderInput | SortOrder
    currentMedications?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    familyHistory?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    urgencyReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrderInput | SortOrder
    reviewStartedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    assignedProfessionalId?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    completenessScore?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
    statusHistory?: CaseStatusHistoryOrderByRelationAggregateInput
    assignments?: CaseAssignmentOrderByRelationAggregateInput
    reviews?: CaseReviewOrderByRelationAggregateInput
  }

  export type CaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    caseNumber?: string
    AND?: CaseWhereInput | CaseWhereInput[]
    OR?: CaseWhereInput[]
    NOT?: CaseWhereInput | CaseWhereInput[]
    customerId?: StringFilter<"Case"> | string
    firstName?: StringFilter<"Case"> | string
    middleName?: StringNullableFilter<"Case"> | string | null
    lastName?: StringFilter<"Case"> | string
    dateOfBirth?: DateTimeFilter<"Case"> | Date | string
    email?: StringFilter<"Case"> | string
    phone?: StringNullableFilter<"Case"> | string | null
    title?: StringNullableFilter<"Case"> | string | null
    description?: StringNullableFilter<"Case"> | string | null
    chiefComplaint?: StringNullableFilter<"Case"> | string | null
    category?: EnumCaseCategoryFilter<"Case"> | $Enums.CaseCategory
    medicalHistory?: JsonNullableFilter<"Case">
    currentMedications?: JsonNullableFilter<"Case">
    allergies?: JsonNullableFilter<"Case">
    familyHistory?: JsonNullableFilter<"Case">
    status?: EnumCaseStatusFilter<"Case"> | $Enums.CaseStatus
    priority?: EnumCasePriorityFilter<"Case"> | $Enums.CasePriority
    urgencyReason?: StringNullableFilter<"Case"> | string | null
    submittedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    reviewStartedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    assignedProfessionalId?: StringNullableFilter<"Case"> | string | null
    assignedAt?: DateTimeNullableFilter<"Case"> | Date | string | null
    qualityScore?: FloatNullableFilter<"Case"> | number | null
    completenessScore?: FloatNullableFilter<"Case"> | number | null
    metadata?: JsonNullableFilter<"Case">
    tags?: StringNullableListFilter<"Case">
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    version?: IntFilter<"Case"> | number
    documents?: DocumentListRelationFilter
    statusHistory?: CaseStatusHistoryListRelationFilter
    assignments?: CaseAssignmentListRelationFilter
    reviews?: CaseReviewListRelationFilter
  }, "id" | "caseNumber">

  export type CaseOrderByWithAggregationInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    customerId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    chiefComplaint?: SortOrderInput | SortOrder
    category?: SortOrder
    medicalHistory?: SortOrderInput | SortOrder
    currentMedications?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    familyHistory?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    urgencyReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrderInput | SortOrder
    reviewStartedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    assignedProfessionalId?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    completenessScore?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    _count?: CaseCountOrderByAggregateInput
    _avg?: CaseAvgOrderByAggregateInput
    _max?: CaseMaxOrderByAggregateInput
    _min?: CaseMinOrderByAggregateInput
    _sum?: CaseSumOrderByAggregateInput
  }

  export type CaseScalarWhereWithAggregatesInput = {
    AND?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    OR?: CaseScalarWhereWithAggregatesInput[]
    NOT?: CaseScalarWhereWithAggregatesInput | CaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Case"> | string
    caseNumber?: StringWithAggregatesFilter<"Case"> | string
    customerId?: StringWithAggregatesFilter<"Case"> | string
    firstName?: StringWithAggregatesFilter<"Case"> | string
    middleName?: StringNullableWithAggregatesFilter<"Case"> | string | null
    lastName?: StringWithAggregatesFilter<"Case"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    email?: StringWithAggregatesFilter<"Case"> | string
    phone?: StringNullableWithAggregatesFilter<"Case"> | string | null
    title?: StringNullableWithAggregatesFilter<"Case"> | string | null
    description?: StringNullableWithAggregatesFilter<"Case"> | string | null
    chiefComplaint?: StringNullableWithAggregatesFilter<"Case"> | string | null
    category?: EnumCaseCategoryWithAggregatesFilter<"Case"> | $Enums.CaseCategory
    medicalHistory?: JsonNullableWithAggregatesFilter<"Case">
    currentMedications?: JsonNullableWithAggregatesFilter<"Case">
    allergies?: JsonNullableWithAggregatesFilter<"Case">
    familyHistory?: JsonNullableWithAggregatesFilter<"Case">
    status?: EnumCaseStatusWithAggregatesFilter<"Case"> | $Enums.CaseStatus
    priority?: EnumCasePriorityWithAggregatesFilter<"Case"> | $Enums.CasePriority
    urgencyReason?: StringNullableWithAggregatesFilter<"Case"> | string | null
    submittedAt?: DateTimeNullableWithAggregatesFilter<"Case"> | Date | string | null
    reviewStartedAt?: DateTimeNullableWithAggregatesFilter<"Case"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Case"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Case"> | Date | string | null
    assignedProfessionalId?: StringNullableWithAggregatesFilter<"Case"> | string | null
    assignedAt?: DateTimeNullableWithAggregatesFilter<"Case"> | Date | string | null
    qualityScore?: FloatNullableWithAggregatesFilter<"Case"> | number | null
    completenessScore?: FloatNullableWithAggregatesFilter<"Case"> | number | null
    metadata?: JsonNullableWithAggregatesFilter<"Case">
    tags?: StringNullableListFilter<"Case">
    createdAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    version?: IntWithAggregatesFilter<"Case"> | number
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    caseId?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    filename?: StringFilter<"Document"> | string
    fileSize?: BigIntFilter<"Document"> | bigint | number
    mimeType?: StringFilter<"Document"> | string
    fileExtension?: StringFilter<"Document"> | string
    documentType?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    category?: StringNullableFilter<"Document"> | string | null
    description?: StringNullableFilter<"Document"> | string | null
    cloudProvider?: StringFilter<"Document"> | string
    bucketName?: StringNullableFilter<"Document"> | string | null
    objectKey?: StringFilter<"Document"> | string
    storageRegion?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    processingStartedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    processingCompletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    processingError?: StringNullableFilter<"Document"> | string | null
    textContent?: StringNullableFilter<"Document"> | string | null
    ocrConfidence?: FloatNullableFilter<"Document"> | number | null
    pageCount?: IntNullableFilter<"Document"> | number | null
    encryptionStatus?: BoolFilter<"Document"> | boolean
    checksumSHA256?: StringNullableFilter<"Document"> | string | null
    virusScanStatus?: StringNullableFilter<"Document"> | string | null
    virusScanAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    isPublic?: BoolFilter<"Document"> | boolean
    accessPermissions?: JsonNullableFilter<"Document">
    metadata?: JsonNullableFilter<"Document">
    uploadedByType?: StringFilter<"Document"> | string
    uploadedById?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    extractions?: DocumentExtractionListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    originalFilename?: SortOrder
    filename?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    fileExtension?: SortOrder
    documentType?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    cloudProvider?: SortOrder
    bucketName?: SortOrderInput | SortOrder
    objectKey?: SortOrder
    storageRegion?: SortOrderInput | SortOrder
    status?: SortOrder
    processingStartedAt?: SortOrderInput | SortOrder
    processingCompletedAt?: SortOrderInput | SortOrder
    processingError?: SortOrderInput | SortOrder
    textContent?: SortOrderInput | SortOrder
    ocrConfidence?: SortOrderInput | SortOrder
    pageCount?: SortOrderInput | SortOrder
    encryptionStatus?: SortOrder
    checksumSHA256?: SortOrderInput | SortOrder
    virusScanStatus?: SortOrderInput | SortOrder
    virusScanAt?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    accessPermissions?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    uploadedByType?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    case?: CaseOrderByWithRelationInput
    extractions?: DocumentExtractionOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    caseId?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    filename?: StringFilter<"Document"> | string
    fileSize?: BigIntFilter<"Document"> | bigint | number
    mimeType?: StringFilter<"Document"> | string
    fileExtension?: StringFilter<"Document"> | string
    documentType?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    category?: StringNullableFilter<"Document"> | string | null
    description?: StringNullableFilter<"Document"> | string | null
    cloudProvider?: StringFilter<"Document"> | string
    bucketName?: StringNullableFilter<"Document"> | string | null
    objectKey?: StringFilter<"Document"> | string
    storageRegion?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    processingStartedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    processingCompletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    processingError?: StringNullableFilter<"Document"> | string | null
    textContent?: StringNullableFilter<"Document"> | string | null
    ocrConfidence?: FloatNullableFilter<"Document"> | number | null
    pageCount?: IntNullableFilter<"Document"> | number | null
    encryptionStatus?: BoolFilter<"Document"> | boolean
    checksumSHA256?: StringNullableFilter<"Document"> | string | null
    virusScanStatus?: StringNullableFilter<"Document"> | string | null
    virusScanAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    isPublic?: BoolFilter<"Document"> | boolean
    accessPermissions?: JsonNullableFilter<"Document">
    metadata?: JsonNullableFilter<"Document">
    uploadedByType?: StringFilter<"Document"> | string
    uploadedById?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    extractions?: DocumentExtractionListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    originalFilename?: SortOrder
    filename?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    fileExtension?: SortOrder
    documentType?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    cloudProvider?: SortOrder
    bucketName?: SortOrderInput | SortOrder
    objectKey?: SortOrder
    storageRegion?: SortOrderInput | SortOrder
    status?: SortOrder
    processingStartedAt?: SortOrderInput | SortOrder
    processingCompletedAt?: SortOrderInput | SortOrder
    processingError?: SortOrderInput | SortOrder
    textContent?: SortOrderInput | SortOrder
    ocrConfidence?: SortOrderInput | SortOrder
    pageCount?: SortOrderInput | SortOrder
    encryptionStatus?: SortOrder
    checksumSHA256?: SortOrderInput | SortOrder
    virusScanStatus?: SortOrderInput | SortOrder
    virusScanAt?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    accessPermissions?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    uploadedByType?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    caseId?: StringWithAggregatesFilter<"Document"> | string
    originalFilename?: StringWithAggregatesFilter<"Document"> | string
    filename?: StringWithAggregatesFilter<"Document"> | string
    fileSize?: BigIntWithAggregatesFilter<"Document"> | bigint | number
    mimeType?: StringWithAggregatesFilter<"Document"> | string
    fileExtension?: StringWithAggregatesFilter<"Document"> | string
    documentType?: EnumDocumentTypeWithAggregatesFilter<"Document"> | $Enums.DocumentType
    category?: StringNullableWithAggregatesFilter<"Document"> | string | null
    description?: StringNullableWithAggregatesFilter<"Document"> | string | null
    cloudProvider?: StringWithAggregatesFilter<"Document"> | string
    bucketName?: StringNullableWithAggregatesFilter<"Document"> | string | null
    objectKey?: StringWithAggregatesFilter<"Document"> | string
    storageRegion?: StringNullableWithAggregatesFilter<"Document"> | string | null
    status?: EnumDocumentStatusWithAggregatesFilter<"Document"> | $Enums.DocumentStatus
    processingStartedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    processingCompletedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    processingError?: StringNullableWithAggregatesFilter<"Document"> | string | null
    textContent?: StringNullableWithAggregatesFilter<"Document"> | string | null
    ocrConfidence?: FloatNullableWithAggregatesFilter<"Document"> | number | null
    pageCount?: IntNullableWithAggregatesFilter<"Document"> | number | null
    encryptionStatus?: BoolWithAggregatesFilter<"Document"> | boolean
    checksumSHA256?: StringNullableWithAggregatesFilter<"Document"> | string | null
    virusScanStatus?: StringNullableWithAggregatesFilter<"Document"> | string | null
    virusScanAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    isPublic?: BoolWithAggregatesFilter<"Document"> | boolean
    accessPermissions?: JsonNullableWithAggregatesFilter<"Document">
    metadata?: JsonNullableWithAggregatesFilter<"Document">
    uploadedByType?: StringWithAggregatesFilter<"Document"> | string
    uploadedById?: StringWithAggregatesFilter<"Document"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type DocumentExtractionWhereInput = {
    AND?: DocumentExtractionWhereInput | DocumentExtractionWhereInput[]
    OR?: DocumentExtractionWhereInput[]
    NOT?: DocumentExtractionWhereInput | DocumentExtractionWhereInput[]
    id?: StringFilter<"DocumentExtraction"> | string
    documentId?: StringFilter<"DocumentExtraction"> | string
    extractionType?: StringFilter<"DocumentExtraction"> | string
    extractedData?: JsonFilter<"DocumentExtraction">
    confidence?: FloatNullableFilter<"DocumentExtraction"> | number | null
    extractorName?: StringFilter<"DocumentExtraction"> | string
    extractorVersion?: StringNullableFilter<"DocumentExtraction"> | string | null
    processingTime?: IntNullableFilter<"DocumentExtraction"> | number | null
    createdAt?: DateTimeFilter<"DocumentExtraction"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type DocumentExtractionOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    extractionType?: SortOrder
    extractedData?: SortOrder
    confidence?: SortOrderInput | SortOrder
    extractorName?: SortOrder
    extractorVersion?: SortOrderInput | SortOrder
    processingTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type DocumentExtractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentExtractionWhereInput | DocumentExtractionWhereInput[]
    OR?: DocumentExtractionWhereInput[]
    NOT?: DocumentExtractionWhereInput | DocumentExtractionWhereInput[]
    documentId?: StringFilter<"DocumentExtraction"> | string
    extractionType?: StringFilter<"DocumentExtraction"> | string
    extractedData?: JsonFilter<"DocumentExtraction">
    confidence?: FloatNullableFilter<"DocumentExtraction"> | number | null
    extractorName?: StringFilter<"DocumentExtraction"> | string
    extractorVersion?: StringNullableFilter<"DocumentExtraction"> | string | null
    processingTime?: IntNullableFilter<"DocumentExtraction"> | number | null
    createdAt?: DateTimeFilter<"DocumentExtraction"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id">

  export type DocumentExtractionOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    extractionType?: SortOrder
    extractedData?: SortOrder
    confidence?: SortOrderInput | SortOrder
    extractorName?: SortOrder
    extractorVersion?: SortOrderInput | SortOrder
    processingTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DocumentExtractionCountOrderByAggregateInput
    _avg?: DocumentExtractionAvgOrderByAggregateInput
    _max?: DocumentExtractionMaxOrderByAggregateInput
    _min?: DocumentExtractionMinOrderByAggregateInput
    _sum?: DocumentExtractionSumOrderByAggregateInput
  }

  export type DocumentExtractionScalarWhereWithAggregatesInput = {
    AND?: DocumentExtractionScalarWhereWithAggregatesInput | DocumentExtractionScalarWhereWithAggregatesInput[]
    OR?: DocumentExtractionScalarWhereWithAggregatesInput[]
    NOT?: DocumentExtractionScalarWhereWithAggregatesInput | DocumentExtractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentExtraction"> | string
    documentId?: StringWithAggregatesFilter<"DocumentExtraction"> | string
    extractionType?: StringWithAggregatesFilter<"DocumentExtraction"> | string
    extractedData?: JsonWithAggregatesFilter<"DocumentExtraction">
    confidence?: FloatNullableWithAggregatesFilter<"DocumentExtraction"> | number | null
    extractorName?: StringWithAggregatesFilter<"DocumentExtraction"> | string
    extractorVersion?: StringNullableWithAggregatesFilter<"DocumentExtraction"> | string | null
    processingTime?: IntNullableWithAggregatesFilter<"DocumentExtraction"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"DocumentExtraction"> | Date | string
  }

  export type CaseStatusHistoryWhereInput = {
    AND?: CaseStatusHistoryWhereInput | CaseStatusHistoryWhereInput[]
    OR?: CaseStatusHistoryWhereInput[]
    NOT?: CaseStatusHistoryWhereInput | CaseStatusHistoryWhereInput[]
    id?: StringFilter<"CaseStatusHistory"> | string
    caseId?: StringFilter<"CaseStatusHistory"> | string
    fromStatus?: EnumCaseStatusNullableFilter<"CaseStatusHistory"> | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFilter<"CaseStatusHistory"> | $Enums.CaseStatus
    reason?: StringNullableFilter<"CaseStatusHistory"> | string | null
    notes?: StringNullableFilter<"CaseStatusHistory"> | string | null
    changedByType?: StringFilter<"CaseStatusHistory"> | string
    changedById?: StringFilter<"CaseStatusHistory"> | string
    createdAt?: DateTimeFilter<"CaseStatusHistory"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type CaseStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    fromStatus?: SortOrderInput | SortOrder
    toStatus?: SortOrder
    reason?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    changedByType?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type CaseStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseStatusHistoryWhereInput | CaseStatusHistoryWhereInput[]
    OR?: CaseStatusHistoryWhereInput[]
    NOT?: CaseStatusHistoryWhereInput | CaseStatusHistoryWhereInput[]
    caseId?: StringFilter<"CaseStatusHistory"> | string
    fromStatus?: EnumCaseStatusNullableFilter<"CaseStatusHistory"> | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFilter<"CaseStatusHistory"> | $Enums.CaseStatus
    reason?: StringNullableFilter<"CaseStatusHistory"> | string | null
    notes?: StringNullableFilter<"CaseStatusHistory"> | string | null
    changedByType?: StringFilter<"CaseStatusHistory"> | string
    changedById?: StringFilter<"CaseStatusHistory"> | string
    createdAt?: DateTimeFilter<"CaseStatusHistory"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id">

  export type CaseStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    fromStatus?: SortOrderInput | SortOrder
    toStatus?: SortOrder
    reason?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    changedByType?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
    _count?: CaseStatusHistoryCountOrderByAggregateInput
    _max?: CaseStatusHistoryMaxOrderByAggregateInput
    _min?: CaseStatusHistoryMinOrderByAggregateInput
  }

  export type CaseStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: CaseStatusHistoryScalarWhereWithAggregatesInput | CaseStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: CaseStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: CaseStatusHistoryScalarWhereWithAggregatesInput | CaseStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseStatusHistory"> | string
    caseId?: StringWithAggregatesFilter<"CaseStatusHistory"> | string
    fromStatus?: EnumCaseStatusNullableWithAggregatesFilter<"CaseStatusHistory"> | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusWithAggregatesFilter<"CaseStatusHistory"> | $Enums.CaseStatus
    reason?: StringNullableWithAggregatesFilter<"CaseStatusHistory"> | string | null
    notes?: StringNullableWithAggregatesFilter<"CaseStatusHistory"> | string | null
    changedByType?: StringWithAggregatesFilter<"CaseStatusHistory"> | string
    changedById?: StringWithAggregatesFilter<"CaseStatusHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CaseStatusHistory"> | Date | string
  }

  export type CaseAssignmentWhereInput = {
    AND?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    OR?: CaseAssignmentWhereInput[]
    NOT?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    id?: StringFilter<"CaseAssignment"> | string
    caseId?: StringFilter<"CaseAssignment"> | string
    professionalId?: StringFilter<"CaseAssignment"> | string
    assignmentType?: StringFilter<"CaseAssignment"> | string
    specialization?: StringNullableFilter<"CaseAssignment"> | string | null
    isActive?: BoolFilter<"CaseAssignment"> | boolean
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    declinedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    priority?: EnumCasePriorityFilter<"CaseAssignment"> | $Enums.CasePriority
    estimatedHours?: IntNullableFilter<"CaseAssignment"> | number | null
    deadlineAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    notes?: StringNullableFilter<"CaseAssignment"> | string | null
    createdAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type CaseAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignmentType?: SortOrder
    specialization?: SortOrderInput | SortOrder
    isActive?: SortOrder
    assignedAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    declinedAt?: SortOrderInput | SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrderInput | SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type CaseAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    OR?: CaseAssignmentWhereInput[]
    NOT?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    caseId?: StringFilter<"CaseAssignment"> | string
    professionalId?: StringFilter<"CaseAssignment"> | string
    assignmentType?: StringFilter<"CaseAssignment"> | string
    specialization?: StringNullableFilter<"CaseAssignment"> | string | null
    isActive?: BoolFilter<"CaseAssignment"> | boolean
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    declinedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    priority?: EnumCasePriorityFilter<"CaseAssignment"> | $Enums.CasePriority
    estimatedHours?: IntNullableFilter<"CaseAssignment"> | number | null
    deadlineAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    notes?: StringNullableFilter<"CaseAssignment"> | string | null
    createdAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id">

  export type CaseAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignmentType?: SortOrder
    specialization?: SortOrderInput | SortOrder
    isActive?: SortOrder
    assignedAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    declinedAt?: SortOrderInput | SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrderInput | SortOrder
    deadlineAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseAssignmentCountOrderByAggregateInput
    _avg?: CaseAssignmentAvgOrderByAggregateInput
    _max?: CaseAssignmentMaxOrderByAggregateInput
    _min?: CaseAssignmentMinOrderByAggregateInput
    _sum?: CaseAssignmentSumOrderByAggregateInput
  }

  export type CaseAssignmentScalarWhereWithAggregatesInput = {
    AND?: CaseAssignmentScalarWhereWithAggregatesInput | CaseAssignmentScalarWhereWithAggregatesInput[]
    OR?: CaseAssignmentScalarWhereWithAggregatesInput[]
    NOT?: CaseAssignmentScalarWhereWithAggregatesInput | CaseAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseAssignment"> | string
    caseId?: StringWithAggregatesFilter<"CaseAssignment"> | string
    professionalId?: StringWithAggregatesFilter<"CaseAssignment"> | string
    assignmentType?: StringWithAggregatesFilter<"CaseAssignment"> | string
    specialization?: StringNullableWithAggregatesFilter<"CaseAssignment"> | string | null
    isActive?: BoolWithAggregatesFilter<"CaseAssignment"> | boolean
    assignedAt?: DateTimeWithAggregatesFilter<"CaseAssignment"> | Date | string
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CaseAssignment"> | Date | string | null
    declinedAt?: DateTimeNullableWithAggregatesFilter<"CaseAssignment"> | Date | string | null
    priority?: EnumCasePriorityWithAggregatesFilter<"CaseAssignment"> | $Enums.CasePriority
    estimatedHours?: IntNullableWithAggregatesFilter<"CaseAssignment"> | number | null
    deadlineAt?: DateTimeNullableWithAggregatesFilter<"CaseAssignment"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"CaseAssignment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CaseAssignment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CaseAssignment"> | Date | string
  }

  export type CaseReviewWhereInput = {
    AND?: CaseReviewWhereInput | CaseReviewWhereInput[]
    OR?: CaseReviewWhereInput[]
    NOT?: CaseReviewWhereInput | CaseReviewWhereInput[]
    id?: StringFilter<"CaseReview"> | string
    caseId?: StringFilter<"CaseReview"> | string
    reviewerId?: StringFilter<"CaseReview"> | string
    reviewerType?: StringFilter<"CaseReview"> | string
    reviewType?: StringFilter<"CaseReview"> | string
    findings?: StringNullableFilter<"CaseReview"> | string | null
    diagnosis?: StringNullableFilter<"CaseReview"> | string | null
    recommendations?: StringNullableFilter<"CaseReview"> | string | null
    confidenceScore?: FloatNullableFilter<"CaseReview"> | number | null
    reviewDuration?: IntNullableFilter<"CaseReview"> | number | null
    status?: StringFilter<"CaseReview"> | string
    isActive?: BoolFilter<"CaseReview"> | boolean
    createdAt?: DateTimeFilter<"CaseReview"> | Date | string
    updatedAt?: DateTimeFilter<"CaseReview"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type CaseReviewOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    reviewType?: SortOrder
    findings?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    confidenceScore?: SortOrderInput | SortOrder
    reviewDuration?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type CaseReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseReviewWhereInput | CaseReviewWhereInput[]
    OR?: CaseReviewWhereInput[]
    NOT?: CaseReviewWhereInput | CaseReviewWhereInput[]
    caseId?: StringFilter<"CaseReview"> | string
    reviewerId?: StringFilter<"CaseReview"> | string
    reviewerType?: StringFilter<"CaseReview"> | string
    reviewType?: StringFilter<"CaseReview"> | string
    findings?: StringNullableFilter<"CaseReview"> | string | null
    diagnosis?: StringNullableFilter<"CaseReview"> | string | null
    recommendations?: StringNullableFilter<"CaseReview"> | string | null
    confidenceScore?: FloatNullableFilter<"CaseReview"> | number | null
    reviewDuration?: IntNullableFilter<"CaseReview"> | number | null
    status?: StringFilter<"CaseReview"> | string
    isActive?: BoolFilter<"CaseReview"> | boolean
    createdAt?: DateTimeFilter<"CaseReview"> | Date | string
    updatedAt?: DateTimeFilter<"CaseReview"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id">

  export type CaseReviewOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    reviewType?: SortOrder
    findings?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    confidenceScore?: SortOrderInput | SortOrder
    reviewDuration?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CaseReviewCountOrderByAggregateInput
    _avg?: CaseReviewAvgOrderByAggregateInput
    _max?: CaseReviewMaxOrderByAggregateInput
    _min?: CaseReviewMinOrderByAggregateInput
    _sum?: CaseReviewSumOrderByAggregateInput
  }

  export type CaseReviewScalarWhereWithAggregatesInput = {
    AND?: CaseReviewScalarWhereWithAggregatesInput | CaseReviewScalarWhereWithAggregatesInput[]
    OR?: CaseReviewScalarWhereWithAggregatesInput[]
    NOT?: CaseReviewScalarWhereWithAggregatesInput | CaseReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseReview"> | string
    caseId?: StringWithAggregatesFilter<"CaseReview"> | string
    reviewerId?: StringWithAggregatesFilter<"CaseReview"> | string
    reviewerType?: StringWithAggregatesFilter<"CaseReview"> | string
    reviewType?: StringWithAggregatesFilter<"CaseReview"> | string
    findings?: StringNullableWithAggregatesFilter<"CaseReview"> | string | null
    diagnosis?: StringNullableWithAggregatesFilter<"CaseReview"> | string | null
    recommendations?: StringNullableWithAggregatesFilter<"CaseReview"> | string | null
    confidenceScore?: FloatNullableWithAggregatesFilter<"CaseReview"> | number | null
    reviewDuration?: IntNullableWithAggregatesFilter<"CaseReview"> | number | null
    status?: StringWithAggregatesFilter<"CaseReview"> | string
    isActive?: BoolWithAggregatesFilter<"CaseReview"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CaseReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CaseReview"> | Date | string
  }

  export type TempCaseSubmissionWhereInput = {
    AND?: TempCaseSubmissionWhereInput | TempCaseSubmissionWhereInput[]
    OR?: TempCaseSubmissionWhereInput[]
    NOT?: TempCaseSubmissionWhereInput | TempCaseSubmissionWhereInput[]
    id?: StringFilter<"TempCaseSubmission"> | string
    patientData?: JsonFilter<"TempCaseSubmission">
    caseData?: JsonFilter<"TempCaseSubmission">
    documentReferences?: JsonNullableFilter<"TempCaseSubmission">
    submissionToken?: StringFilter<"TempCaseSubmission"> | string
    expiresAt?: DateTimeFilter<"TempCaseSubmission"> | Date | string
    convertedToCaseId?: StringNullableFilter<"TempCaseSubmission"> | string | null
    convertedAt?: DateTimeNullableFilter<"TempCaseSubmission"> | Date | string | null
    clientIP?: StringNullableFilter<"TempCaseSubmission"> | string | null
    userAgent?: StringNullableFilter<"TempCaseSubmission"> | string | null
    createdAt?: DateTimeFilter<"TempCaseSubmission"> | Date | string
  }

  export type TempCaseSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    patientData?: SortOrder
    caseData?: SortOrder
    documentReferences?: SortOrderInput | SortOrder
    submissionToken?: SortOrder
    expiresAt?: SortOrder
    convertedToCaseId?: SortOrderInput | SortOrder
    convertedAt?: SortOrderInput | SortOrder
    clientIP?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type TempCaseSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    submissionToken?: string
    AND?: TempCaseSubmissionWhereInput | TempCaseSubmissionWhereInput[]
    OR?: TempCaseSubmissionWhereInput[]
    NOT?: TempCaseSubmissionWhereInput | TempCaseSubmissionWhereInput[]
    patientData?: JsonFilter<"TempCaseSubmission">
    caseData?: JsonFilter<"TempCaseSubmission">
    documentReferences?: JsonNullableFilter<"TempCaseSubmission">
    expiresAt?: DateTimeFilter<"TempCaseSubmission"> | Date | string
    convertedToCaseId?: StringNullableFilter<"TempCaseSubmission"> | string | null
    convertedAt?: DateTimeNullableFilter<"TempCaseSubmission"> | Date | string | null
    clientIP?: StringNullableFilter<"TempCaseSubmission"> | string | null
    userAgent?: StringNullableFilter<"TempCaseSubmission"> | string | null
    createdAt?: DateTimeFilter<"TempCaseSubmission"> | Date | string
  }, "id" | "submissionToken">

  export type TempCaseSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    patientData?: SortOrder
    caseData?: SortOrder
    documentReferences?: SortOrderInput | SortOrder
    submissionToken?: SortOrder
    expiresAt?: SortOrder
    convertedToCaseId?: SortOrderInput | SortOrder
    convertedAt?: SortOrderInput | SortOrder
    clientIP?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TempCaseSubmissionCountOrderByAggregateInput
    _max?: TempCaseSubmissionMaxOrderByAggregateInput
    _min?: TempCaseSubmissionMinOrderByAggregateInput
  }

  export type TempCaseSubmissionScalarWhereWithAggregatesInput = {
    AND?: TempCaseSubmissionScalarWhereWithAggregatesInput | TempCaseSubmissionScalarWhereWithAggregatesInput[]
    OR?: TempCaseSubmissionScalarWhereWithAggregatesInput[]
    NOT?: TempCaseSubmissionScalarWhereWithAggregatesInput | TempCaseSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TempCaseSubmission"> | string
    patientData?: JsonWithAggregatesFilter<"TempCaseSubmission">
    caseData?: JsonWithAggregatesFilter<"TempCaseSubmission">
    documentReferences?: JsonNullableWithAggregatesFilter<"TempCaseSubmission">
    submissionToken?: StringWithAggregatesFilter<"TempCaseSubmission"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"TempCaseSubmission"> | Date | string
    convertedToCaseId?: StringNullableWithAggregatesFilter<"TempCaseSubmission"> | string | null
    convertedAt?: DateTimeNullableWithAggregatesFilter<"TempCaseSubmission"> | Date | string | null
    clientIP?: StringNullableWithAggregatesFilter<"TempCaseSubmission"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"TempCaseSubmission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TempCaseSubmission"> | Date | string
  }

  export type CaseCreateInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentCreateNestedManyWithoutCaseInput
    statusHistory?: CaseStatusHistoryCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentUncheckedCreateNestedManyWithoutCaseInput
    statusHistory?: CaseStatusHistoryUncheckedCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUpdateManyWithoutCaseNestedInput
    statusHistory?: CaseStatusHistoryUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUncheckedUpdateManyWithoutCaseNestedInput
    statusHistory?: CaseStatusHistoryUncheckedUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateManyInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
  }

  export type CaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
  }

  export type CaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentCreateInput = {
    id?: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    case: CaseCreateNestedOneWithoutDocumentsInput
    extractions?: DocumentExtractionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    caseId: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    extractions?: DocumentExtractionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutDocumentsNestedInput
    extractions?: DocumentExtractionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: DocumentExtractionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    caseId: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentExtractionCreateInput = {
    id?: string
    extractionType: string
    extractedData: JsonNullValueInput | InputJsonValue
    confidence?: number | null
    extractorName: string
    extractorVersion?: string | null
    processingTime?: number | null
    createdAt?: Date | string
    document: DocumentCreateNestedOneWithoutExtractionsInput
  }

  export type DocumentExtractionUncheckedCreateInput = {
    id?: string
    documentId: string
    extractionType: string
    extractedData: JsonNullValueInput | InputJsonValue
    confidence?: number | null
    extractorName: string
    extractorVersion?: string | null
    processingTime?: number | null
    createdAt?: Date | string
  }

  export type DocumentExtractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    extractionType?: StringFieldUpdateOperationsInput | string
    extractedData?: JsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    extractorName?: StringFieldUpdateOperationsInput | string
    extractorVersion?: NullableStringFieldUpdateOperationsInput | string | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutExtractionsNestedInput
  }

  export type DocumentExtractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    extractionType?: StringFieldUpdateOperationsInput | string
    extractedData?: JsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    extractorName?: StringFieldUpdateOperationsInput | string
    extractorVersion?: NullableStringFieldUpdateOperationsInput | string | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentExtractionCreateManyInput = {
    id?: string
    documentId: string
    extractionType: string
    extractedData: JsonNullValueInput | InputJsonValue
    confidence?: number | null
    extractorName: string
    extractorVersion?: string | null
    processingTime?: number | null
    createdAt?: Date | string
  }

  export type DocumentExtractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    extractionType?: StringFieldUpdateOperationsInput | string
    extractedData?: JsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    extractorName?: StringFieldUpdateOperationsInput | string
    extractorVersion?: NullableStringFieldUpdateOperationsInput | string | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentExtractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    extractionType?: StringFieldUpdateOperationsInput | string
    extractedData?: JsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    extractorName?: StringFieldUpdateOperationsInput | string
    extractorVersion?: NullableStringFieldUpdateOperationsInput | string | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStatusHistoryCreateInput = {
    id?: string
    fromStatus?: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus
    reason?: string | null
    notes?: string | null
    changedByType: string
    changedById: string
    createdAt?: Date | string
    case: CaseCreateNestedOneWithoutStatusHistoryInput
  }

  export type CaseStatusHistoryUncheckedCreateInput = {
    id?: string
    caseId: string
    fromStatus?: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus
    reason?: string | null
    notes?: string | null
    changedByType: string
    changedById: string
    createdAt?: Date | string
  }

  export type CaseStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableEnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    changedByType?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type CaseStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableEnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    changedByType?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStatusHistoryCreateManyInput = {
    id?: string
    caseId: string
    fromStatus?: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus
    reason?: string | null
    notes?: string | null
    changedByType: string
    changedById: string
    createdAt?: Date | string
  }

  export type CaseStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableEnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    changedByType?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableEnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    changedByType?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentCreateInput = {
    id?: string
    professionalId: string
    assignmentType: string
    specialization?: string | null
    isActive?: boolean
    assignedAt?: Date | string
    acceptedAt?: Date | string | null
    completedAt?: Date | string | null
    declinedAt?: Date | string | null
    priority?: $Enums.CasePriority
    estimatedHours?: number | null
    deadlineAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    case: CaseCreateNestedOneWithoutAssignmentsInput
  }

  export type CaseAssignmentUncheckedCreateInput = {
    id?: string
    caseId: string
    professionalId: string
    assignmentType: string
    specialization?: string | null
    isActive?: boolean
    assignedAt?: Date | string
    acceptedAt?: Date | string | null
    completedAt?: Date | string | null
    declinedAt?: Date | string | null
    priority?: $Enums.CasePriority
    estimatedHours?: number | null
    deadlineAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignmentType?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type CaseAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignmentType?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentCreateManyInput = {
    id?: string
    caseId: string
    professionalId: string
    assignmentType: string
    specialization?: string | null
    isActive?: boolean
    assignedAt?: Date | string
    acceptedAt?: Date | string | null
    completedAt?: Date | string | null
    declinedAt?: Date | string | null
    priority?: $Enums.CasePriority
    estimatedHours?: number | null
    deadlineAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignmentType?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignmentType?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseReviewCreateInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    reviewType: string
    findings?: string | null
    diagnosis?: string | null
    recommendations?: string | null
    confidenceScore?: number | null
    reviewDuration?: number | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    case: CaseCreateNestedOneWithoutReviewsInput
  }

  export type CaseReviewUncheckedCreateInput = {
    id?: string
    caseId: string
    reviewerId: string
    reviewerType: string
    reviewType: string
    findings?: string | null
    diagnosis?: string | null
    recommendations?: string | null
    confidenceScore?: number | null
    reviewDuration?: number | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    reviewType?: StringFieldUpdateOperationsInput | string
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type CaseReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    reviewType?: StringFieldUpdateOperationsInput | string
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseReviewCreateManyInput = {
    id?: string
    caseId: string
    reviewerId: string
    reviewerType: string
    reviewType: string
    findings?: string | null
    diagnosis?: string | null
    recommendations?: string | null
    confidenceScore?: number | null
    reviewDuration?: number | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    reviewType?: StringFieldUpdateOperationsInput | string
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    reviewType?: StringFieldUpdateOperationsInput | string
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempCaseSubmissionCreateInput = {
    id?: string
    patientData: JsonNullValueInput | InputJsonValue
    caseData: JsonNullValueInput | InputJsonValue
    documentReferences?: NullableJsonNullValueInput | InputJsonValue
    submissionToken: string
    expiresAt: Date | string
    convertedToCaseId?: string | null
    convertedAt?: Date | string | null
    clientIP?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type TempCaseSubmissionUncheckedCreateInput = {
    id?: string
    patientData: JsonNullValueInput | InputJsonValue
    caseData: JsonNullValueInput | InputJsonValue
    documentReferences?: NullableJsonNullValueInput | InputJsonValue
    submissionToken: string
    expiresAt: Date | string
    convertedToCaseId?: string | null
    convertedAt?: Date | string | null
    clientIP?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type TempCaseSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientData?: JsonNullValueInput | InputJsonValue
    caseData?: JsonNullValueInput | InputJsonValue
    documentReferences?: NullableJsonNullValueInput | InputJsonValue
    submissionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedToCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientIP?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempCaseSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientData?: JsonNullValueInput | InputJsonValue
    caseData?: JsonNullValueInput | InputJsonValue
    documentReferences?: NullableJsonNullValueInput | InputJsonValue
    submissionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedToCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientIP?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempCaseSubmissionCreateManyInput = {
    id?: string
    patientData: JsonNullValueInput | InputJsonValue
    caseData: JsonNullValueInput | InputJsonValue
    documentReferences?: NullableJsonNullValueInput | InputJsonValue
    submissionToken: string
    expiresAt: Date | string
    convertedToCaseId?: string | null
    convertedAt?: Date | string | null
    clientIP?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type TempCaseSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientData?: JsonNullValueInput | InputJsonValue
    caseData?: JsonNullValueInput | InputJsonValue
    documentReferences?: NullableJsonNullValueInput | InputJsonValue
    submissionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedToCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientIP?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TempCaseSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientData?: JsonNullValueInput | InputJsonValue
    caseData?: JsonNullValueInput | InputJsonValue
    documentReferences?: NullableJsonNullValueInput | InputJsonValue
    submissionToken?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    convertedToCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clientIP?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumCaseCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseCategory | EnumCaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseCategoryFilter<$PrismaModel> | $Enums.CaseCategory
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

  export type EnumCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusFilter<$PrismaModel> | $Enums.CaseStatus
  }

  export type EnumCasePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityFilter<$PrismaModel> | $Enums.CasePriority
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type CaseStatusHistoryListRelationFilter = {
    every?: CaseStatusHistoryWhereInput
    some?: CaseStatusHistoryWhereInput
    none?: CaseStatusHistoryWhereInput
  }

  export type CaseAssignmentListRelationFilter = {
    every?: CaseAssignmentWhereInput
    some?: CaseAssignmentWhereInput
    none?: CaseAssignmentWhereInput
  }

  export type CaseReviewListRelationFilter = {
    every?: CaseReviewWhereInput
    some?: CaseReviewWhereInput
    none?: CaseReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseCountOrderByAggregateInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    customerId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
    description?: SortOrder
    chiefComplaint?: SortOrder
    category?: SortOrder
    medicalHistory?: SortOrder
    currentMedications?: SortOrder
    allergies?: SortOrder
    familyHistory?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    urgencyReason?: SortOrder
    submittedAt?: SortOrder
    reviewStartedAt?: SortOrder
    completedAt?: SortOrder
    expiresAt?: SortOrder
    assignedProfessionalId?: SortOrder
    assignedAt?: SortOrder
    qualityScore?: SortOrder
    completenessScore?: SortOrder
    metadata?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
  }

  export type CaseAvgOrderByAggregateInput = {
    qualityScore?: SortOrder
    completenessScore?: SortOrder
    version?: SortOrder
  }

  export type CaseMaxOrderByAggregateInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    customerId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
    description?: SortOrder
    chiefComplaint?: SortOrder
    category?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    urgencyReason?: SortOrder
    submittedAt?: SortOrder
    reviewStartedAt?: SortOrder
    completedAt?: SortOrder
    expiresAt?: SortOrder
    assignedProfessionalId?: SortOrder
    assignedAt?: SortOrder
    qualityScore?: SortOrder
    completenessScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
  }

  export type CaseMinOrderByAggregateInput = {
    id?: SortOrder
    caseNumber?: SortOrder
    customerId?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    title?: SortOrder
    description?: SortOrder
    chiefComplaint?: SortOrder
    category?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    urgencyReason?: SortOrder
    submittedAt?: SortOrder
    reviewStartedAt?: SortOrder
    completedAt?: SortOrder
    expiresAt?: SortOrder
    assignedProfessionalId?: SortOrder
    assignedAt?: SortOrder
    qualityScore?: SortOrder
    completenessScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
  }

  export type CaseSumOrderByAggregateInput = {
    qualityScore?: SortOrder
    completenessScore?: SortOrder
    version?: SortOrder
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

  export type EnumCaseCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseCategory | EnumCaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CaseCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseCategoryFilter<$PrismaModel>
    _max?: NestedEnumCaseCategoryFilter<$PrismaModel>
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

  export type EnumCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusFilter<$PrismaModel>
  }

  export type EnumCasePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityWithAggregatesFilter<$PrismaModel> | $Enums.CasePriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCasePriorityFilter<$PrismaModel>
    _max?: NestedEnumCasePriorityFilter<$PrismaModel>
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

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type EnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CaseScalarRelationFilter = {
    is?: CaseWhereInput
    isNot?: CaseWhereInput
  }

  export type DocumentExtractionListRelationFilter = {
    every?: DocumentExtractionWhereInput
    some?: DocumentExtractionWhereInput
    none?: DocumentExtractionWhereInput
  }

  export type DocumentExtractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    originalFilename?: SortOrder
    filename?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    fileExtension?: SortOrder
    documentType?: SortOrder
    category?: SortOrder
    description?: SortOrder
    cloudProvider?: SortOrder
    bucketName?: SortOrder
    objectKey?: SortOrder
    storageRegion?: SortOrder
    status?: SortOrder
    processingStartedAt?: SortOrder
    processingCompletedAt?: SortOrder
    processingError?: SortOrder
    textContent?: SortOrder
    ocrConfidence?: SortOrder
    pageCount?: SortOrder
    encryptionStatus?: SortOrder
    checksumSHA256?: SortOrder
    virusScanStatus?: SortOrder
    virusScanAt?: SortOrder
    isPublic?: SortOrder
    accessPermissions?: SortOrder
    metadata?: SortOrder
    uploadedByType?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    ocrConfidence?: SortOrder
    pageCount?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    originalFilename?: SortOrder
    filename?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    fileExtension?: SortOrder
    documentType?: SortOrder
    category?: SortOrder
    description?: SortOrder
    cloudProvider?: SortOrder
    bucketName?: SortOrder
    objectKey?: SortOrder
    storageRegion?: SortOrder
    status?: SortOrder
    processingStartedAt?: SortOrder
    processingCompletedAt?: SortOrder
    processingError?: SortOrder
    textContent?: SortOrder
    ocrConfidence?: SortOrder
    pageCount?: SortOrder
    encryptionStatus?: SortOrder
    checksumSHA256?: SortOrder
    virusScanStatus?: SortOrder
    virusScanAt?: SortOrder
    isPublic?: SortOrder
    uploadedByType?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    originalFilename?: SortOrder
    filename?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    fileExtension?: SortOrder
    documentType?: SortOrder
    category?: SortOrder
    description?: SortOrder
    cloudProvider?: SortOrder
    bucketName?: SortOrder
    objectKey?: SortOrder
    storageRegion?: SortOrder
    status?: SortOrder
    processingStartedAt?: SortOrder
    processingCompletedAt?: SortOrder
    processingError?: SortOrder
    textContent?: SortOrder
    ocrConfidence?: SortOrder
    pageCount?: SortOrder
    encryptionStatus?: SortOrder
    checksumSHA256?: SortOrder
    virusScanStatus?: SortOrder
    virusScanAt?: SortOrder
    isPublic?: SortOrder
    uploadedByType?: SortOrder
    uploadedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
    ocrConfidence?: SortOrder
    pageCount?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type EnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
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

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type DocumentExtractionCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    extractionType?: SortOrder
    extractedData?: SortOrder
    confidence?: SortOrder
    extractorName?: SortOrder
    extractorVersion?: SortOrder
    processingTime?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentExtractionAvgOrderByAggregateInput = {
    confidence?: SortOrder
    processingTime?: SortOrder
  }

  export type DocumentExtractionMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    extractionType?: SortOrder
    confidence?: SortOrder
    extractorName?: SortOrder
    extractorVersion?: SortOrder
    processingTime?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentExtractionMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    extractionType?: SortOrder
    confidence?: SortOrder
    extractorName?: SortOrder
    extractorVersion?: SortOrder
    processingTime?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentExtractionSumOrderByAggregateInput = {
    confidence?: SortOrder
    processingTime?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumCaseStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCaseStatusNullableFilter<$PrismaModel> | $Enums.CaseStatus | null
  }

  export type CaseStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    changedByType?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    changedByType?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    reason?: SortOrder
    notes?: SortOrder
    changedByType?: SortOrder
    changedById?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumCaseStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCaseStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusNullableFilter<$PrismaModel>
  }

  export type CaseAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignmentType?: SortOrder
    specialization?: SortOrder
    isActive?: SortOrder
    assignedAt?: SortOrder
    acceptedAt?: SortOrder
    completedAt?: SortOrder
    declinedAt?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrder
    deadlineAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseAssignmentAvgOrderByAggregateInput = {
    estimatedHours?: SortOrder
  }

  export type CaseAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignmentType?: SortOrder
    specialization?: SortOrder
    isActive?: SortOrder
    assignedAt?: SortOrder
    acceptedAt?: SortOrder
    completedAt?: SortOrder
    declinedAt?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrder
    deadlineAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignmentType?: SortOrder
    specialization?: SortOrder
    isActive?: SortOrder
    assignedAt?: SortOrder
    acceptedAt?: SortOrder
    completedAt?: SortOrder
    declinedAt?: SortOrder
    priority?: SortOrder
    estimatedHours?: SortOrder
    deadlineAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseAssignmentSumOrderByAggregateInput = {
    estimatedHours?: SortOrder
  }

  export type CaseReviewCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    reviewType?: SortOrder
    findings?: SortOrder
    diagnosis?: SortOrder
    recommendations?: SortOrder
    confidenceScore?: SortOrder
    reviewDuration?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseReviewAvgOrderByAggregateInput = {
    confidenceScore?: SortOrder
    reviewDuration?: SortOrder
  }

  export type CaseReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    reviewType?: SortOrder
    findings?: SortOrder
    diagnosis?: SortOrder
    recommendations?: SortOrder
    confidenceScore?: SortOrder
    reviewDuration?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseReviewMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    reviewerId?: SortOrder
    reviewerType?: SortOrder
    reviewType?: SortOrder
    findings?: SortOrder
    diagnosis?: SortOrder
    recommendations?: SortOrder
    confidenceScore?: SortOrder
    reviewDuration?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CaseReviewSumOrderByAggregateInput = {
    confidenceScore?: SortOrder
    reviewDuration?: SortOrder
  }

  export type TempCaseSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    patientData?: SortOrder
    caseData?: SortOrder
    documentReferences?: SortOrder
    submissionToken?: SortOrder
    expiresAt?: SortOrder
    convertedToCaseId?: SortOrder
    convertedAt?: SortOrder
    clientIP?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type TempCaseSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    submissionToken?: SortOrder
    expiresAt?: SortOrder
    convertedToCaseId?: SortOrder
    convertedAt?: SortOrder
    clientIP?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type TempCaseSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    submissionToken?: SortOrder
    expiresAt?: SortOrder
    convertedToCaseId?: SortOrder
    convertedAt?: SortOrder
    clientIP?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseCreatetagsInput = {
    set: string[]
  }

  export type DocumentCreateNestedManyWithoutCaseInput = {
    create?: XOR<DocumentCreateWithoutCaseInput, DocumentUncheckedCreateWithoutCaseInput> | DocumentCreateWithoutCaseInput[] | DocumentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCaseInput | DocumentCreateOrConnectWithoutCaseInput[]
    createMany?: DocumentCreateManyCaseInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type CaseStatusHistoryCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseStatusHistoryCreateWithoutCaseInput, CaseStatusHistoryUncheckedCreateWithoutCaseInput> | CaseStatusHistoryCreateWithoutCaseInput[] | CaseStatusHistoryUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseStatusHistoryCreateOrConnectWithoutCaseInput | CaseStatusHistoryCreateOrConnectWithoutCaseInput[]
    createMany?: CaseStatusHistoryCreateManyCaseInputEnvelope
    connect?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
  }

  export type CaseAssignmentCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type CaseReviewCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseReviewCreateWithoutCaseInput, CaseReviewUncheckedCreateWithoutCaseInput> | CaseReviewCreateWithoutCaseInput[] | CaseReviewUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseReviewCreateOrConnectWithoutCaseInput | CaseReviewCreateOrConnectWithoutCaseInput[]
    createMany?: CaseReviewCreateManyCaseInputEnvelope
    connect?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<DocumentCreateWithoutCaseInput, DocumentUncheckedCreateWithoutCaseInput> | DocumentCreateWithoutCaseInput[] | DocumentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCaseInput | DocumentCreateOrConnectWithoutCaseInput[]
    createMany?: DocumentCreateManyCaseInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type CaseStatusHistoryUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseStatusHistoryCreateWithoutCaseInput, CaseStatusHistoryUncheckedCreateWithoutCaseInput> | CaseStatusHistoryCreateWithoutCaseInput[] | CaseStatusHistoryUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseStatusHistoryCreateOrConnectWithoutCaseInput | CaseStatusHistoryCreateOrConnectWithoutCaseInput[]
    createMany?: CaseStatusHistoryCreateManyCaseInputEnvelope
    connect?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
  }

  export type CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type CaseReviewUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseReviewCreateWithoutCaseInput, CaseReviewUncheckedCreateWithoutCaseInput> | CaseReviewCreateWithoutCaseInput[] | CaseReviewUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseReviewCreateOrConnectWithoutCaseInput | CaseReviewCreateOrConnectWithoutCaseInput[]
    createMany?: CaseReviewCreateManyCaseInputEnvelope
    connect?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumCaseCategoryFieldUpdateOperationsInput = {
    set?: $Enums.CaseCategory
  }

  export type EnumCaseStatusFieldUpdateOperationsInput = {
    set?: $Enums.CaseStatus
  }

  export type EnumCasePriorityFieldUpdateOperationsInput = {
    set?: $Enums.CasePriority
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

  export type CaseUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DocumentUpdateManyWithoutCaseNestedInput = {
    create?: XOR<DocumentCreateWithoutCaseInput, DocumentUncheckedCreateWithoutCaseInput> | DocumentCreateWithoutCaseInput[] | DocumentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCaseInput | DocumentCreateOrConnectWithoutCaseInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCaseInput | DocumentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: DocumentCreateManyCaseInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCaseInput | DocumentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCaseInput | DocumentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type CaseStatusHistoryUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseStatusHistoryCreateWithoutCaseInput, CaseStatusHistoryUncheckedCreateWithoutCaseInput> | CaseStatusHistoryCreateWithoutCaseInput[] | CaseStatusHistoryUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseStatusHistoryCreateOrConnectWithoutCaseInput | CaseStatusHistoryCreateOrConnectWithoutCaseInput[]
    upsert?: CaseStatusHistoryUpsertWithWhereUniqueWithoutCaseInput | CaseStatusHistoryUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseStatusHistoryCreateManyCaseInputEnvelope
    set?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    disconnect?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    delete?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    connect?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    update?: CaseStatusHistoryUpdateWithWhereUniqueWithoutCaseInput | CaseStatusHistoryUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseStatusHistoryUpdateManyWithWhereWithoutCaseInput | CaseStatusHistoryUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseStatusHistoryScalarWhereInput | CaseStatusHistoryScalarWhereInput[]
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

  export type CaseReviewUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseReviewCreateWithoutCaseInput, CaseReviewUncheckedCreateWithoutCaseInput> | CaseReviewCreateWithoutCaseInput[] | CaseReviewUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseReviewCreateOrConnectWithoutCaseInput | CaseReviewCreateOrConnectWithoutCaseInput[]
    upsert?: CaseReviewUpsertWithWhereUniqueWithoutCaseInput | CaseReviewUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseReviewCreateManyCaseInputEnvelope
    set?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    disconnect?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    delete?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    connect?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    update?: CaseReviewUpdateWithWhereUniqueWithoutCaseInput | CaseReviewUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseReviewUpdateManyWithWhereWithoutCaseInput | CaseReviewUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseReviewScalarWhereInput | CaseReviewScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<DocumentCreateWithoutCaseInput, DocumentUncheckedCreateWithoutCaseInput> | DocumentCreateWithoutCaseInput[] | DocumentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutCaseInput | DocumentCreateOrConnectWithoutCaseInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutCaseInput | DocumentUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: DocumentCreateManyCaseInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutCaseInput | DocumentUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutCaseInput | DocumentUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type CaseStatusHistoryUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseStatusHistoryCreateWithoutCaseInput, CaseStatusHistoryUncheckedCreateWithoutCaseInput> | CaseStatusHistoryCreateWithoutCaseInput[] | CaseStatusHistoryUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseStatusHistoryCreateOrConnectWithoutCaseInput | CaseStatusHistoryCreateOrConnectWithoutCaseInput[]
    upsert?: CaseStatusHistoryUpsertWithWhereUniqueWithoutCaseInput | CaseStatusHistoryUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseStatusHistoryCreateManyCaseInputEnvelope
    set?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    disconnect?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    delete?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    connect?: CaseStatusHistoryWhereUniqueInput | CaseStatusHistoryWhereUniqueInput[]
    update?: CaseStatusHistoryUpdateWithWhereUniqueWithoutCaseInput | CaseStatusHistoryUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseStatusHistoryUpdateManyWithWhereWithoutCaseInput | CaseStatusHistoryUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseStatusHistoryScalarWhereInput | CaseStatusHistoryScalarWhereInput[]
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

  export type CaseReviewUncheckedUpdateManyWithoutCaseNestedInput = {
    create?: XOR<CaseReviewCreateWithoutCaseInput, CaseReviewUncheckedCreateWithoutCaseInput> | CaseReviewCreateWithoutCaseInput[] | CaseReviewUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseReviewCreateOrConnectWithoutCaseInput | CaseReviewCreateOrConnectWithoutCaseInput[]
    upsert?: CaseReviewUpsertWithWhereUniqueWithoutCaseInput | CaseReviewUpsertWithWhereUniqueWithoutCaseInput[]
    createMany?: CaseReviewCreateManyCaseInputEnvelope
    set?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    disconnect?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    delete?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    connect?: CaseReviewWhereUniqueInput | CaseReviewWhereUniqueInput[]
    update?: CaseReviewUpdateWithWhereUniqueWithoutCaseInput | CaseReviewUpdateWithWhereUniqueWithoutCaseInput[]
    updateMany?: CaseReviewUpdateManyWithWhereWithoutCaseInput | CaseReviewUpdateManyWithWhereWithoutCaseInput[]
    deleteMany?: CaseReviewScalarWhereInput | CaseReviewScalarWhereInput[]
  }

  export type CaseCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<CaseCreateWithoutDocumentsInput, CaseUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutDocumentsInput
    connect?: CaseWhereUniqueInput
  }

  export type DocumentExtractionCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentExtractionCreateWithoutDocumentInput, DocumentExtractionUncheckedCreateWithoutDocumentInput> | DocumentExtractionCreateWithoutDocumentInput[] | DocumentExtractionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentExtractionCreateOrConnectWithoutDocumentInput | DocumentExtractionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentExtractionCreateManyDocumentInputEnvelope
    connect?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
  }

  export type DocumentExtractionUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentExtractionCreateWithoutDocumentInput, DocumentExtractionUncheckedCreateWithoutDocumentInput> | DocumentExtractionCreateWithoutDocumentInput[] | DocumentExtractionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentExtractionCreateOrConnectWithoutDocumentInput | DocumentExtractionCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentExtractionCreateManyDocumentInputEnvelope
    connect?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type EnumDocumentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocumentStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CaseUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<CaseCreateWithoutDocumentsInput, CaseUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutDocumentsInput
    upsert?: CaseUpsertWithoutDocumentsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutDocumentsInput, CaseUpdateWithoutDocumentsInput>, CaseUncheckedUpdateWithoutDocumentsInput>
  }

  export type DocumentExtractionUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentExtractionCreateWithoutDocumentInput, DocumentExtractionUncheckedCreateWithoutDocumentInput> | DocumentExtractionCreateWithoutDocumentInput[] | DocumentExtractionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentExtractionCreateOrConnectWithoutDocumentInput | DocumentExtractionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentExtractionUpsertWithWhereUniqueWithoutDocumentInput | DocumentExtractionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentExtractionCreateManyDocumentInputEnvelope
    set?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    disconnect?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    delete?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    connect?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    update?: DocumentExtractionUpdateWithWhereUniqueWithoutDocumentInput | DocumentExtractionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentExtractionUpdateManyWithWhereWithoutDocumentInput | DocumentExtractionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentExtractionScalarWhereInput | DocumentExtractionScalarWhereInput[]
  }

  export type DocumentExtractionUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentExtractionCreateWithoutDocumentInput, DocumentExtractionUncheckedCreateWithoutDocumentInput> | DocumentExtractionCreateWithoutDocumentInput[] | DocumentExtractionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentExtractionCreateOrConnectWithoutDocumentInput | DocumentExtractionCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentExtractionUpsertWithWhereUniqueWithoutDocumentInput | DocumentExtractionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentExtractionCreateManyDocumentInputEnvelope
    set?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    disconnect?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    delete?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    connect?: DocumentExtractionWhereUniqueInput | DocumentExtractionWhereUniqueInput[]
    update?: DocumentExtractionUpdateWithWhereUniqueWithoutDocumentInput | DocumentExtractionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentExtractionUpdateManyWithWhereWithoutDocumentInput | DocumentExtractionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentExtractionScalarWhereInput | DocumentExtractionScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutExtractionsInput = {
    create?: XOR<DocumentCreateWithoutExtractionsInput, DocumentUncheckedCreateWithoutExtractionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutExtractionsInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutExtractionsNestedInput = {
    create?: XOR<DocumentCreateWithoutExtractionsInput, DocumentUncheckedCreateWithoutExtractionsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutExtractionsInput
    upsert?: DocumentUpsertWithoutExtractionsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutExtractionsInput, DocumentUpdateWithoutExtractionsInput>, DocumentUncheckedUpdateWithoutExtractionsInput>
  }

  export type CaseCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<CaseCreateWithoutStatusHistoryInput, CaseUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: CaseCreateOrConnectWithoutStatusHistoryInput
    connect?: CaseWhereUniqueInput
  }

  export type NullableEnumCaseStatusFieldUpdateOperationsInput = {
    set?: $Enums.CaseStatus | null
  }

  export type CaseUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<CaseCreateWithoutStatusHistoryInput, CaseUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: CaseCreateOrConnectWithoutStatusHistoryInput
    upsert?: CaseUpsertWithoutStatusHistoryInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutStatusHistoryInput, CaseUpdateWithoutStatusHistoryInput>, CaseUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type CaseCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<CaseCreateWithoutAssignmentsInput, CaseUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAssignmentsInput
    connect?: CaseWhereUniqueInput
  }

  export type CaseUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<CaseCreateWithoutAssignmentsInput, CaseUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAssignmentsInput
    upsert?: CaseUpsertWithoutAssignmentsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutAssignmentsInput, CaseUpdateWithoutAssignmentsInput>, CaseUncheckedUpdateWithoutAssignmentsInput>
  }

  export type CaseCreateNestedOneWithoutReviewsInput = {
    create?: XOR<CaseCreateWithoutReviewsInput, CaseUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutReviewsInput
    connect?: CaseWhereUniqueInput
  }

  export type CaseUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<CaseCreateWithoutReviewsInput, CaseUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutReviewsInput
    upsert?: CaseUpsertWithoutReviewsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutReviewsInput, CaseUpdateWithoutReviewsInput>, CaseUncheckedUpdateWithoutReviewsInput>
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

  export type NestedEnumCaseCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseCategory | EnumCaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseCategoryFilter<$PrismaModel> | $Enums.CaseCategory
  }

  export type NestedEnumCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusFilter<$PrismaModel> | $Enums.CaseStatus
  }

  export type NestedEnumCasePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityFilter<$PrismaModel> | $Enums.CasePriority
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

  export type NestedEnumCaseCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseCategory | EnumCaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseCategory[] | ListEnumCaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CaseCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseCategoryFilter<$PrismaModel>
    _max?: NestedEnumCaseCategoryFilter<$PrismaModel>
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

  export type NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusFilter<$PrismaModel>
  }

  export type NestedEnumCasePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityWithAggregatesFilter<$PrismaModel> | $Enums.CasePriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCasePriorityFilter<$PrismaModel>
    _max?: NestedEnumCasePriorityFilter<$PrismaModel>
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

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
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

  export type NestedEnumCaseStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCaseStatusNullableFilter<$PrismaModel> | $Enums.CaseStatus | null
  }

  export type NestedEnumCaseStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCaseStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusNullableFilter<$PrismaModel>
  }

  export type DocumentCreateWithoutCaseInput = {
    id?: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    extractions?: DocumentExtractionCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutCaseInput = {
    id?: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    extractions?: DocumentExtractionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutCaseInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutCaseInput, DocumentUncheckedCreateWithoutCaseInput>
  }

  export type DocumentCreateManyCaseInputEnvelope = {
    data: DocumentCreateManyCaseInput | DocumentCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type CaseStatusHistoryCreateWithoutCaseInput = {
    id?: string
    fromStatus?: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus
    reason?: string | null
    notes?: string | null
    changedByType: string
    changedById: string
    createdAt?: Date | string
  }

  export type CaseStatusHistoryUncheckedCreateWithoutCaseInput = {
    id?: string
    fromStatus?: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus
    reason?: string | null
    notes?: string | null
    changedByType: string
    changedById: string
    createdAt?: Date | string
  }

  export type CaseStatusHistoryCreateOrConnectWithoutCaseInput = {
    where: CaseStatusHistoryWhereUniqueInput
    create: XOR<CaseStatusHistoryCreateWithoutCaseInput, CaseStatusHistoryUncheckedCreateWithoutCaseInput>
  }

  export type CaseStatusHistoryCreateManyCaseInputEnvelope = {
    data: CaseStatusHistoryCreateManyCaseInput | CaseStatusHistoryCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type CaseAssignmentCreateWithoutCaseInput = {
    id?: string
    professionalId: string
    assignmentType: string
    specialization?: string | null
    isActive?: boolean
    assignedAt?: Date | string
    acceptedAt?: Date | string | null
    completedAt?: Date | string | null
    declinedAt?: Date | string | null
    priority?: $Enums.CasePriority
    estimatedHours?: number | null
    deadlineAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAssignmentUncheckedCreateWithoutCaseInput = {
    id?: string
    professionalId: string
    assignmentType: string
    specialization?: string | null
    isActive?: boolean
    assignedAt?: Date | string
    acceptedAt?: Date | string | null
    completedAt?: Date | string | null
    declinedAt?: Date | string | null
    priority?: $Enums.CasePriority
    estimatedHours?: number | null
    deadlineAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseAssignmentCreateOrConnectWithoutCaseInput = {
    where: CaseAssignmentWhereUniqueInput
    create: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput>
  }

  export type CaseAssignmentCreateManyCaseInputEnvelope = {
    data: CaseAssignmentCreateManyCaseInput | CaseAssignmentCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type CaseReviewCreateWithoutCaseInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    reviewType: string
    findings?: string | null
    diagnosis?: string | null
    recommendations?: string | null
    confidenceScore?: number | null
    reviewDuration?: number | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseReviewUncheckedCreateWithoutCaseInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    reviewType: string
    findings?: string | null
    diagnosis?: string | null
    recommendations?: string | null
    confidenceScore?: number | null
    reviewDuration?: number | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseReviewCreateOrConnectWithoutCaseInput = {
    where: CaseReviewWhereUniqueInput
    create: XOR<CaseReviewCreateWithoutCaseInput, CaseReviewUncheckedCreateWithoutCaseInput>
  }

  export type CaseReviewCreateManyCaseInputEnvelope = {
    data: CaseReviewCreateManyCaseInput | CaseReviewCreateManyCaseInput[]
    skipDuplicates?: boolean
  }

  export type DocumentUpsertWithWhereUniqueWithoutCaseInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutCaseInput, DocumentUncheckedUpdateWithoutCaseInput>
    create: XOR<DocumentCreateWithoutCaseInput, DocumentUncheckedCreateWithoutCaseInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutCaseInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutCaseInput, DocumentUncheckedUpdateWithoutCaseInput>
  }

  export type DocumentUpdateManyWithWhereWithoutCaseInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutCaseInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    caseId?: StringFilter<"Document"> | string
    originalFilename?: StringFilter<"Document"> | string
    filename?: StringFilter<"Document"> | string
    fileSize?: BigIntFilter<"Document"> | bigint | number
    mimeType?: StringFilter<"Document"> | string
    fileExtension?: StringFilter<"Document"> | string
    documentType?: EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType
    category?: StringNullableFilter<"Document"> | string | null
    description?: StringNullableFilter<"Document"> | string | null
    cloudProvider?: StringFilter<"Document"> | string
    bucketName?: StringNullableFilter<"Document"> | string | null
    objectKey?: StringFilter<"Document"> | string
    storageRegion?: StringNullableFilter<"Document"> | string | null
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    processingStartedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    processingCompletedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    processingError?: StringNullableFilter<"Document"> | string | null
    textContent?: StringNullableFilter<"Document"> | string | null
    ocrConfidence?: FloatNullableFilter<"Document"> | number | null
    pageCount?: IntNullableFilter<"Document"> | number | null
    encryptionStatus?: BoolFilter<"Document"> | boolean
    checksumSHA256?: StringNullableFilter<"Document"> | string | null
    virusScanStatus?: StringNullableFilter<"Document"> | string | null
    virusScanAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    isPublic?: BoolFilter<"Document"> | boolean
    accessPermissions?: JsonNullableFilter<"Document">
    metadata?: JsonNullableFilter<"Document">
    uploadedByType?: StringFilter<"Document"> | string
    uploadedById?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type CaseStatusHistoryUpsertWithWhereUniqueWithoutCaseInput = {
    where: CaseStatusHistoryWhereUniqueInput
    update: XOR<CaseStatusHistoryUpdateWithoutCaseInput, CaseStatusHistoryUncheckedUpdateWithoutCaseInput>
    create: XOR<CaseStatusHistoryCreateWithoutCaseInput, CaseStatusHistoryUncheckedCreateWithoutCaseInput>
  }

  export type CaseStatusHistoryUpdateWithWhereUniqueWithoutCaseInput = {
    where: CaseStatusHistoryWhereUniqueInput
    data: XOR<CaseStatusHistoryUpdateWithoutCaseInput, CaseStatusHistoryUncheckedUpdateWithoutCaseInput>
  }

  export type CaseStatusHistoryUpdateManyWithWhereWithoutCaseInput = {
    where: CaseStatusHistoryScalarWhereInput
    data: XOR<CaseStatusHistoryUpdateManyMutationInput, CaseStatusHistoryUncheckedUpdateManyWithoutCaseInput>
  }

  export type CaseStatusHistoryScalarWhereInput = {
    AND?: CaseStatusHistoryScalarWhereInput | CaseStatusHistoryScalarWhereInput[]
    OR?: CaseStatusHistoryScalarWhereInput[]
    NOT?: CaseStatusHistoryScalarWhereInput | CaseStatusHistoryScalarWhereInput[]
    id?: StringFilter<"CaseStatusHistory"> | string
    caseId?: StringFilter<"CaseStatusHistory"> | string
    fromStatus?: EnumCaseStatusNullableFilter<"CaseStatusHistory"> | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFilter<"CaseStatusHistory"> | $Enums.CaseStatus
    reason?: StringNullableFilter<"CaseStatusHistory"> | string | null
    notes?: StringNullableFilter<"CaseStatusHistory"> | string | null
    changedByType?: StringFilter<"CaseStatusHistory"> | string
    changedById?: StringFilter<"CaseStatusHistory"> | string
    createdAt?: DateTimeFilter<"CaseStatusHistory"> | Date | string
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
    assignmentType?: StringFilter<"CaseAssignment"> | string
    specialization?: StringNullableFilter<"CaseAssignment"> | string | null
    isActive?: BoolFilter<"CaseAssignment"> | boolean
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    declinedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    priority?: EnumCasePriorityFilter<"CaseAssignment"> | $Enums.CasePriority
    estimatedHours?: IntNullableFilter<"CaseAssignment"> | number | null
    deadlineAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    notes?: StringNullableFilter<"CaseAssignment"> | string | null
    createdAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
  }

  export type CaseReviewUpsertWithWhereUniqueWithoutCaseInput = {
    where: CaseReviewWhereUniqueInput
    update: XOR<CaseReviewUpdateWithoutCaseInput, CaseReviewUncheckedUpdateWithoutCaseInput>
    create: XOR<CaseReviewCreateWithoutCaseInput, CaseReviewUncheckedCreateWithoutCaseInput>
  }

  export type CaseReviewUpdateWithWhereUniqueWithoutCaseInput = {
    where: CaseReviewWhereUniqueInput
    data: XOR<CaseReviewUpdateWithoutCaseInput, CaseReviewUncheckedUpdateWithoutCaseInput>
  }

  export type CaseReviewUpdateManyWithWhereWithoutCaseInput = {
    where: CaseReviewScalarWhereInput
    data: XOR<CaseReviewUpdateManyMutationInput, CaseReviewUncheckedUpdateManyWithoutCaseInput>
  }

  export type CaseReviewScalarWhereInput = {
    AND?: CaseReviewScalarWhereInput | CaseReviewScalarWhereInput[]
    OR?: CaseReviewScalarWhereInput[]
    NOT?: CaseReviewScalarWhereInput | CaseReviewScalarWhereInput[]
    id?: StringFilter<"CaseReview"> | string
    caseId?: StringFilter<"CaseReview"> | string
    reviewerId?: StringFilter<"CaseReview"> | string
    reviewerType?: StringFilter<"CaseReview"> | string
    reviewType?: StringFilter<"CaseReview"> | string
    findings?: StringNullableFilter<"CaseReview"> | string | null
    diagnosis?: StringNullableFilter<"CaseReview"> | string | null
    recommendations?: StringNullableFilter<"CaseReview"> | string | null
    confidenceScore?: FloatNullableFilter<"CaseReview"> | number | null
    reviewDuration?: IntNullableFilter<"CaseReview"> | number | null
    status?: StringFilter<"CaseReview"> | string
    isActive?: BoolFilter<"CaseReview"> | boolean
    createdAt?: DateTimeFilter<"CaseReview"> | Date | string
    updatedAt?: DateTimeFilter<"CaseReview"> | Date | string
  }

  export type CaseCreateWithoutDocumentsInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    statusHistory?: CaseStatusHistoryCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutDocumentsInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    statusHistory?: CaseStatusHistoryUncheckedCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutDocumentsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutDocumentsInput, CaseUncheckedCreateWithoutDocumentsInput>
  }

  export type DocumentExtractionCreateWithoutDocumentInput = {
    id?: string
    extractionType: string
    extractedData: JsonNullValueInput | InputJsonValue
    confidence?: number | null
    extractorName: string
    extractorVersion?: string | null
    processingTime?: number | null
    createdAt?: Date | string
  }

  export type DocumentExtractionUncheckedCreateWithoutDocumentInput = {
    id?: string
    extractionType: string
    extractedData: JsonNullValueInput | InputJsonValue
    confidence?: number | null
    extractorName: string
    extractorVersion?: string | null
    processingTime?: number | null
    createdAt?: Date | string
  }

  export type DocumentExtractionCreateOrConnectWithoutDocumentInput = {
    where: DocumentExtractionWhereUniqueInput
    create: XOR<DocumentExtractionCreateWithoutDocumentInput, DocumentExtractionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentExtractionCreateManyDocumentInputEnvelope = {
    data: DocumentExtractionCreateManyDocumentInput | DocumentExtractionCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type CaseUpsertWithoutDocumentsInput = {
    update: XOR<CaseUpdateWithoutDocumentsInput, CaseUncheckedUpdateWithoutDocumentsInput>
    create: XOR<CaseCreateWithoutDocumentsInput, CaseUncheckedCreateWithoutDocumentsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutDocumentsInput, CaseUncheckedUpdateWithoutDocumentsInput>
  }

  export type CaseUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    statusHistory?: CaseStatusHistoryUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    statusHistory?: CaseStatusHistoryUncheckedUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type DocumentExtractionUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentExtractionWhereUniqueInput
    update: XOR<DocumentExtractionUpdateWithoutDocumentInput, DocumentExtractionUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentExtractionCreateWithoutDocumentInput, DocumentExtractionUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentExtractionUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentExtractionWhereUniqueInput
    data: XOR<DocumentExtractionUpdateWithoutDocumentInput, DocumentExtractionUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentExtractionUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentExtractionScalarWhereInput
    data: XOR<DocumentExtractionUpdateManyMutationInput, DocumentExtractionUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentExtractionScalarWhereInput = {
    AND?: DocumentExtractionScalarWhereInput | DocumentExtractionScalarWhereInput[]
    OR?: DocumentExtractionScalarWhereInput[]
    NOT?: DocumentExtractionScalarWhereInput | DocumentExtractionScalarWhereInput[]
    id?: StringFilter<"DocumentExtraction"> | string
    documentId?: StringFilter<"DocumentExtraction"> | string
    extractionType?: StringFilter<"DocumentExtraction"> | string
    extractedData?: JsonFilter<"DocumentExtraction">
    confidence?: FloatNullableFilter<"DocumentExtraction"> | number | null
    extractorName?: StringFilter<"DocumentExtraction"> | string
    extractorVersion?: StringNullableFilter<"DocumentExtraction"> | string | null
    processingTime?: IntNullableFilter<"DocumentExtraction"> | number | null
    createdAt?: DateTimeFilter<"DocumentExtraction"> | Date | string
  }

  export type DocumentCreateWithoutExtractionsInput = {
    id?: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    case: CaseCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutExtractionsInput = {
    id?: string
    caseId: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutExtractionsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutExtractionsInput, DocumentUncheckedCreateWithoutExtractionsInput>
  }

  export type DocumentUpsertWithoutExtractionsInput = {
    update: XOR<DocumentUpdateWithoutExtractionsInput, DocumentUncheckedUpdateWithoutExtractionsInput>
    create: XOR<DocumentCreateWithoutExtractionsInput, DocumentUncheckedCreateWithoutExtractionsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutExtractionsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutExtractionsInput, DocumentUncheckedUpdateWithoutExtractionsInput>
  }

  export type DocumentUpdateWithoutExtractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutExtractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateWithoutStatusHistoryInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentUncheckedCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutStatusHistoryInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutStatusHistoryInput, CaseUncheckedCreateWithoutStatusHistoryInput>
  }

  export type CaseUpsertWithoutStatusHistoryInput = {
    update: XOR<CaseUpdateWithoutStatusHistoryInput, CaseUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<CaseCreateWithoutStatusHistoryInput, CaseUncheckedCreateWithoutStatusHistoryInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutStatusHistoryInput, CaseUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type CaseUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUncheckedUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateWithoutAssignmentsInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentCreateNestedManyWithoutCaseInput
    statusHistory?: CaseStatusHistoryCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentUncheckedCreateNestedManyWithoutCaseInput
    statusHistory?: CaseStatusHistoryUncheckedCreateNestedManyWithoutCaseInput
    reviews?: CaseReviewUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutAssignmentsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutAssignmentsInput, CaseUncheckedCreateWithoutAssignmentsInput>
  }

  export type CaseUpsertWithoutAssignmentsInput = {
    update: XOR<CaseUpdateWithoutAssignmentsInput, CaseUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<CaseCreateWithoutAssignmentsInput, CaseUncheckedCreateWithoutAssignmentsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutAssignmentsInput, CaseUncheckedUpdateWithoutAssignmentsInput>
  }

  export type CaseUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUpdateManyWithoutCaseNestedInput
    statusHistory?: CaseStatusHistoryUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUncheckedUpdateManyWithoutCaseNestedInput
    statusHistory?: CaseStatusHistoryUncheckedUpdateManyWithoutCaseNestedInput
    reviews?: CaseReviewUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateWithoutReviewsInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentCreateNestedManyWithoutCaseInput
    statusHistory?: CaseStatusHistoryCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutReviewsInput = {
    id?: string
    caseNumber: string
    customerId: string
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    email: string
    phone?: string | null
    title?: string | null
    description?: string | null
    chiefComplaint?: string | null
    category?: $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    urgencyReason?: string | null
    submittedAt?: Date | string | null
    reviewStartedAt?: Date | string | null
    completedAt?: Date | string | null
    expiresAt?: Date | string | null
    assignedProfessionalId?: string | null
    assignedAt?: Date | string | null
    qualityScore?: number | null
    completenessScore?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    documents?: DocumentUncheckedCreateNestedManyWithoutCaseInput
    statusHistory?: CaseStatusHistoryUncheckedCreateNestedManyWithoutCaseInput
    assignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutReviewsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutReviewsInput, CaseUncheckedCreateWithoutReviewsInput>
  }

  export type CaseUpsertWithoutReviewsInput = {
    update: XOR<CaseUpdateWithoutReviewsInput, CaseUncheckedUpdateWithoutReviewsInput>
    create: XOR<CaseCreateWithoutReviewsInput, CaseUncheckedCreateWithoutReviewsInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutReviewsInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutReviewsInput, CaseUncheckedUpdateWithoutReviewsInput>
  }

  export type CaseUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUpdateManyWithoutCaseNestedInput
    statusHistory?: CaseStatusHistoryUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    chiefComplaint?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumCaseCategoryFieldUpdateOperationsInput | $Enums.CaseCategory
    medicalHistory?: NullableJsonNullValueInput | InputJsonValue
    currentMedications?: NullableJsonNullValueInput | InputJsonValue
    allergies?: NullableJsonNullValueInput | InputJsonValue
    familyHistory?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    urgencyReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    tags?: CaseUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    documents?: DocumentUncheckedUpdateManyWithoutCaseNestedInput
    statusHistory?: CaseStatusHistoryUncheckedUpdateManyWithoutCaseNestedInput
    assignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type DocumentCreateManyCaseInput = {
    id?: string
    originalFilename: string
    filename: string
    fileSize: bigint | number
    mimeType: string
    fileExtension: string
    documentType: $Enums.DocumentType
    category?: string | null
    description?: string | null
    cloudProvider: string
    bucketName?: string | null
    objectKey: string
    storageRegion?: string | null
    status?: $Enums.DocumentStatus
    processingStartedAt?: Date | string | null
    processingCompletedAt?: Date | string | null
    processingError?: string | null
    textContent?: string | null
    ocrConfidence?: number | null
    pageCount?: number | null
    encryptionStatus?: boolean
    checksumSHA256?: string | null
    virusScanStatus?: string | null
    virusScanAt?: Date | string | null
    isPublic?: boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType: string
    uploadedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseStatusHistoryCreateManyCaseInput = {
    id?: string
    fromStatus?: $Enums.CaseStatus | null
    toStatus: $Enums.CaseStatus
    reason?: string | null
    notes?: string | null
    changedByType: string
    changedById: string
    createdAt?: Date | string
  }

  export type CaseAssignmentCreateManyCaseInput = {
    id?: string
    professionalId: string
    assignmentType: string
    specialization?: string | null
    isActive?: boolean
    assignedAt?: Date | string
    acceptedAt?: Date | string | null
    completedAt?: Date | string | null
    declinedAt?: Date | string | null
    priority?: $Enums.CasePriority
    estimatedHours?: number | null
    deadlineAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CaseReviewCreateManyCaseInput = {
    id?: string
    reviewerId: string
    reviewerType: string
    reviewType: string
    findings?: string | null
    diagnosis?: string | null
    recommendations?: string | null
    confidenceScore?: number | null
    reviewDuration?: number | null
    status?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: DocumentExtractionUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: DocumentExtractionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    mimeType?: StringFieldUpdateOperationsInput | string
    fileExtension?: StringFieldUpdateOperationsInput | string
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cloudProvider?: StringFieldUpdateOperationsInput | string
    bucketName?: NullableStringFieldUpdateOperationsInput | string | null
    objectKey?: StringFieldUpdateOperationsInput | string
    storageRegion?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    processingStartedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingError?: NullableStringFieldUpdateOperationsInput | string | null
    textContent?: NullableStringFieldUpdateOperationsInput | string | null
    ocrConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    encryptionStatus?: BoolFieldUpdateOperationsInput | boolean
    checksumSHA256?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanStatus?: NullableStringFieldUpdateOperationsInput | string | null
    virusScanAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    accessPermissions?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    uploadedByType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStatusHistoryUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableEnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    changedByType?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStatusHistoryUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableEnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    changedByType?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseStatusHistoryUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: NullableEnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus | null
    toStatus?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    changedByType?: StringFieldUpdateOperationsInput | string
    changedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignmentType?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignmentType?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignmentType?: StringFieldUpdateOperationsInput | string
    specialization?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    declinedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    deadlineAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseReviewUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    reviewType?: StringFieldUpdateOperationsInput | string
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseReviewUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    reviewType?: StringFieldUpdateOperationsInput | string
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseReviewUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    reviewerType?: StringFieldUpdateOperationsInput | string
    reviewType?: StringFieldUpdateOperationsInput | string
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    reviewDuration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentExtractionCreateManyDocumentInput = {
    id?: string
    extractionType: string
    extractedData: JsonNullValueInput | InputJsonValue
    confidence?: number | null
    extractorName: string
    extractorVersion?: string | null
    processingTime?: number | null
    createdAt?: Date | string
  }

  export type DocumentExtractionUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    extractionType?: StringFieldUpdateOperationsInput | string
    extractedData?: JsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    extractorName?: StringFieldUpdateOperationsInput | string
    extractorVersion?: NullableStringFieldUpdateOperationsInput | string | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentExtractionUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    extractionType?: StringFieldUpdateOperationsInput | string
    extractedData?: JsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    extractorName?: StringFieldUpdateOperationsInput | string
    extractorVersion?: NullableStringFieldUpdateOperationsInput | string | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentExtractionUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    extractionType?: StringFieldUpdateOperationsInput | string
    extractedData?: JsonNullValueInput | InputJsonValue
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    extractorName?: StringFieldUpdateOperationsInput | string
    extractorVersion?: NullableStringFieldUpdateOperationsInput | string | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
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