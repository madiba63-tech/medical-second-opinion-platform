
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
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
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
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
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
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
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
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

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
    Customer: 'Customer',
    Case: 'Case',
    UploadedFile: 'UploadedFile',
    MedicalProfessional: 'MedicalProfessional',
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
      modelProps: "customer" | "case" | "uploadedFile" | "medicalProfessional" | "caseAssignment" | "aIAnalysis" | "medicalOpinion" | "professionalPayment" | "admin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
    customer?: CustomerOmit
    case?: CaseOmit
    uploadedFile?: UploadedFileOmit
    medicalProfessional?: MedicalProfessionalOmit
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
    medicalOpinions: number
  }

  export type CaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedFiles?: boolean | CaseCountOutputTypeCountUploadedFilesArgs
    caseAssignments?: boolean | CaseCountOutputTypeCountCaseAssignmentsArgs
    medicalOpinions?: boolean | CaseCountOutputTypeCountMedicalOpinionsArgs
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
  export type CaseCountOutputTypeCountMedicalOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalOpinionWhereInput
  }


  /**
   * Count Type MedicalProfessionalCountOutputType
   */

  export type MedicalProfessionalCountOutputType = {
    caseAssignments: number
    primaryOpinions: number
    reviewedOpinions: number
    payments: number
  }

  export type MedicalProfessionalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caseAssignments?: boolean | MedicalProfessionalCountOutputTypeCountCaseAssignmentsArgs
    primaryOpinions?: boolean | MedicalProfessionalCountOutputTypeCountPrimaryOpinionsArgs
    reviewedOpinions?: boolean | MedicalProfessionalCountOutputTypeCountReviewedOpinionsArgs
    payments?: boolean | MedicalProfessionalCountOutputTypeCountPaymentsArgs
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
  export type MedicalProfessionalCountOutputTypeCountPrimaryOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalOpinionWhereInput
  }

  /**
   * MedicalProfessionalCountOutputType without action
   */
  export type MedicalProfessionalCountOutputTypeCountReviewedOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalOpinionWhereInput
  }

  /**
   * MedicalProfessionalCountOutputType without action
   */
  export type MedicalProfessionalCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalPaymentWhereInput
  }


  /**
   * Models
   */

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
    customerId: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    phone: string | null
    preferredContact: string | null
    emailNotifications: boolean | null
    smsNotifications: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    firstName: string | null
    middleName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    phone: string | null
    preferredContact: string | null
    emailNotifications: boolean | null
    smsNotifications: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    customerId: number
    email: number
    passwordHash: number
    isActive: number
    lastLoginAt: number
    firstName: number
    middleName: number
    lastName: number
    dateOfBirth: number
    phone: number
    preferredContact: number
    emailNotifications: number
    smsNotifications: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    customerId?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    phone?: true
    preferredContact?: true
    emailNotifications?: true
    smsNotifications?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    customerId?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    phone?: true
    preferredContact?: true
    emailNotifications?: true
    smsNotifications?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    customerId?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    firstName?: true
    middleName?: true
    lastName?: true
    dateOfBirth?: true
    phone?: true
    preferredContact?: true
    emailNotifications?: true
    smsNotifications?: true
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
    customerId: string
    email: string
    passwordHash: string
    isActive: boolean
    lastLoginAt: Date | null
    firstName: string
    middleName: string | null
    lastName: string
    dateOfBirth: Date
    phone: string | null
    preferredContact: string
    emailNotifications: boolean
    smsNotifications: boolean
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
    customerId?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    phone?: boolean
    preferredContact?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cases?: boolean | Customer$casesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    phone?: boolean
    preferredContact?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    phone?: boolean
    preferredContact?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    customerId?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    firstName?: boolean
    middleName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    phone?: boolean
    preferredContact?: boolean
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "email" | "passwordHash" | "isActive" | "lastLoginAt" | "firstName" | "middleName" | "lastName" | "dateOfBirth" | "phone" | "preferredContact" | "emailNotifications" | "smsNotifications" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cases?: boolean | Customer$casesArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      cases: Prisma.$CasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      email: string
      passwordHash: string
      isActive: boolean
      lastLoginAt: Date | null
      firstName: string
      middleName: string | null
      lastName: string
      dateOfBirth: Date
      phone: string | null
      preferredContact: string
      emailNotifications: boolean
      smsNotifications: boolean
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
    readonly customerId: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly passwordHash: FieldRef<"Customer", 'String'>
    readonly isActive: FieldRef<"Customer", 'Boolean'>
    readonly lastLoginAt: FieldRef<"Customer", 'DateTime'>
    readonly firstName: FieldRef<"Customer", 'String'>
    readonly middleName: FieldRef<"Customer", 'String'>
    readonly lastName: FieldRef<"Customer", 'String'>
    readonly dateOfBirth: FieldRef<"Customer", 'DateTime'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly preferredContact: FieldRef<"Customer", 'String'>
    readonly emailNotifications: FieldRef<"Customer", 'Boolean'>
    readonly smsNotifications: FieldRef<"Customer", 'Boolean'>
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
    customerId: string | null
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
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
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
    ethnicity: string | null
    gender: string | null
    diseaseType: string | null
    isFirstOccurrence: boolean | null
    geneticFamilyHistory: string | null
    paymentId: string | null
    consentAccepted: boolean | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
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
    ethnicity: number
    gender: number
    diseaseType: number
    isFirstOccurrence: number
    geneticFamilyHistory: number
    paymentId: number
    consentAccepted: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
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
    ethnicity?: true
    gender?: true
    diseaseType?: true
    isFirstOccurrence?: true
    geneticFamilyHistory?: true
    paymentId?: true
    consentAccepted?: true
    status?: true
    createdAt?: true
    updatedAt?: true
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
    ethnicity?: true
    gender?: true
    diseaseType?: true
    isFirstOccurrence?: true
    geneticFamilyHistory?: true
    paymentId?: true
    consentAccepted?: true
    status?: true
    createdAt?: true
    updatedAt?: true
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
    ethnicity?: true
    gender?: true
    diseaseType?: true
    isFirstOccurrence?: true
    geneticFamilyHistory?: true
    paymentId?: true
    consentAccepted?: true
    status?: true
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
    customerId: string
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
    status: string
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
    customerId?: boolean
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
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    uploadedFiles?: boolean | Case$uploadedFilesArgs<ExtArgs>
    aiAnalysis?: boolean | Case$aiAnalysisArgs<ExtArgs>
    caseAssignments?: boolean | Case$caseAssignmentsArgs<ExtArgs>
    medicalOpinions?: boolean | Case$medicalOpinionsArgs<ExtArgs>
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
    ethnicity?: boolean
    gender?: boolean
    diseaseType?: boolean
    isFirstOccurrence?: boolean
    geneticFamilyHistory?: boolean
    paymentId?: boolean
    consentAccepted?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
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
    ethnicity?: boolean
    gender?: boolean
    diseaseType?: boolean
    isFirstOccurrence?: boolean
    geneticFamilyHistory?: boolean
    paymentId?: boolean
    consentAccepted?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
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
    ethnicity?: boolean
    gender?: boolean
    diseaseType?: boolean
    isFirstOccurrence?: boolean
    geneticFamilyHistory?: boolean
    paymentId?: boolean
    consentAccepted?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseNumber" | "customerId" | "firstName" | "middleName" | "lastName" | "dateOfBirth" | "email" | "phone" | "ethnicity" | "gender" | "diseaseType" | "isFirstOccurrence" | "geneticFamilyHistory" | "paymentId" | "consentAccepted" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["case"]>
  export type CaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    uploadedFiles?: boolean | Case$uploadedFilesArgs<ExtArgs>
    aiAnalysis?: boolean | Case$aiAnalysisArgs<ExtArgs>
    caseAssignments?: boolean | Case$caseAssignmentsArgs<ExtArgs>
    medicalOpinions?: boolean | Case$medicalOpinionsArgs<ExtArgs>
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
      aiAnalysis: Prisma.$AIAnalysisPayload<ExtArgs> | null
      caseAssignments: Prisma.$CaseAssignmentPayload<ExtArgs>[]
      medicalOpinions: Prisma.$MedicalOpinionPayload<ExtArgs>[]
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
      ethnicity: string | null
      gender: string | null
      diseaseType: string | null
      isFirstOccurrence: boolean | null
      geneticFamilyHistory: string | null
      paymentId: string | null
      consentAccepted: boolean
      status: string
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
    aiAnalysis<T extends Case$aiAnalysisArgs<ExtArgs> = {}>(args?: Subset<T, Case$aiAnalysisArgs<ExtArgs>>): Prisma__AIAnalysisClient<$Result.GetResult<Prisma.$AIAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    caseAssignments<T extends Case$caseAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Case$caseAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalOpinions<T extends Case$medicalOpinionsArgs<ExtArgs> = {}>(args?: Subset<T, Case$medicalOpinionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly ethnicity: FieldRef<"Case", 'String'>
    readonly gender: FieldRef<"Case", 'String'>
    readonly diseaseType: FieldRef<"Case", 'String'>
    readonly isFirstOccurrence: FieldRef<"Case", 'Boolean'>
    readonly geneticFamilyHistory: FieldRef<"Case", 'String'>
    readonly paymentId: FieldRef<"Case", 'String'>
    readonly consentAccepted: FieldRef<"Case", 'Boolean'>
    readonly status: FieldRef<"Case", 'String'>
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
   * Case.aiAnalysis
   */
  export type Case$aiAnalysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    fileSize: number | null
  }

  export type UploadedFileSumAggregateOutputType = {
    fileSize: number | null
  }

  export type UploadedFileMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    fileName: string | null
    originalName: string | null
    fileSize: number | null
    mimeType: string | null
    category: string | null
    s3Key: string | null
    uploadedAt: Date | null
  }

  export type UploadedFileMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    fileName: string | null
    originalName: string | null
    fileSize: number | null
    mimeType: string | null
    category: string | null
    s3Key: string | null
    uploadedAt: Date | null
  }

  export type UploadedFileCountAggregateOutputType = {
    id: number
    caseId: number
    fileName: number
    originalName: number
    fileSize: number
    mimeType: number
    category: number
    s3Key: number
    uploadedAt: number
    _all: number
  }


  export type UploadedFileAvgAggregateInputType = {
    fileSize?: true
  }

  export type UploadedFileSumAggregateInputType = {
    fileSize?: true
  }

  export type UploadedFileMinAggregateInputType = {
    id?: true
    caseId?: true
    fileName?: true
    originalName?: true
    fileSize?: true
    mimeType?: true
    category?: true
    s3Key?: true
    uploadedAt?: true
  }

  export type UploadedFileMaxAggregateInputType = {
    id?: true
    caseId?: true
    fileName?: true
    originalName?: true
    fileSize?: true
    mimeType?: true
    category?: true
    s3Key?: true
    uploadedAt?: true
  }

  export type UploadedFileCountAggregateInputType = {
    id?: true
    caseId?: true
    fileName?: true
    originalName?: true
    fileSize?: true
    mimeType?: true
    category?: true
    s3Key?: true
    uploadedAt?: true
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
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    category: string
    s3Key: string | null
    uploadedAt: Date
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
    fileName?: boolean
    originalName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    category?: boolean
    s3Key?: boolean
    uploadedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    fileName?: boolean
    originalName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    category?: boolean
    s3Key?: boolean
    uploadedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    fileName?: boolean
    originalName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    category?: boolean
    s3Key?: boolean
    uploadedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedFile"]>

  export type UploadedFileSelectScalar = {
    id?: boolean
    caseId?: boolean
    fileName?: boolean
    originalName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    category?: boolean
    s3Key?: boolean
    uploadedAt?: boolean
  }

  export type UploadedFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "fileName" | "originalName" | "fileSize" | "mimeType" | "category" | "s3Key" | "uploadedAt", ExtArgs["result"]["uploadedFile"]>
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
      fileName: string
      originalName: string
      fileSize: number
      mimeType: string
      category: string
      s3Key: string | null
      uploadedAt: Date
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
    readonly fileName: FieldRef<"UploadedFile", 'String'>
    readonly originalName: FieldRef<"UploadedFile", 'String'>
    readonly fileSize: FieldRef<"UploadedFile", 'Int'>
    readonly mimeType: FieldRef<"UploadedFile", 'String'>
    readonly category: FieldRef<"UploadedFile", 'String'>
    readonly s3Key: FieldRef<"UploadedFile", 'String'>
    readonly uploadedAt: FieldRef<"UploadedFile", 'DateTime'>
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
    yearsExperience: number | null
  }

  export type MedicalProfessionalSumAggregateOutputType = {
    yearsExperience: number | null
  }

  export type MedicalProfessionalMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    licenseNumber: string | null
    specialty: string | null
    yearsExperience: number | null
    qualifications: string | null
    vettingStatus: string | null
    vettedBy: string | null
    vettedAt: Date | null
    appliedAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalProfessionalMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    licenseNumber: string | null
    specialty: string | null
    yearsExperience: number | null
    qualifications: string | null
    vettingStatus: string | null
    vettedBy: string | null
    vettedAt: Date | null
    appliedAt: Date | null
    updatedAt: Date | null
  }

  export type MedicalProfessionalCountAggregateOutputType = {
    id: number
    professionalId: number
    firstName: number
    lastName: number
    email: number
    phone: number
    licenseNumber: number
    specialty: number
    yearsExperience: number
    qualifications: number
    vettingStatus: number
    vettedBy: number
    vettedAt: number
    appliedAt: number
    updatedAt: number
    _all: number
  }


  export type MedicalProfessionalAvgAggregateInputType = {
    yearsExperience?: true
  }

  export type MedicalProfessionalSumAggregateInputType = {
    yearsExperience?: true
  }

  export type MedicalProfessionalMinAggregateInputType = {
    id?: true
    professionalId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    licenseNumber?: true
    specialty?: true
    yearsExperience?: true
    qualifications?: true
    vettingStatus?: true
    vettedBy?: true
    vettedAt?: true
    appliedAt?: true
    updatedAt?: true
  }

  export type MedicalProfessionalMaxAggregateInputType = {
    id?: true
    professionalId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    licenseNumber?: true
    specialty?: true
    yearsExperience?: true
    qualifications?: true
    vettingStatus?: true
    vettedBy?: true
    vettedAt?: true
    appliedAt?: true
    updatedAt?: true
  }

  export type MedicalProfessionalCountAggregateInputType = {
    id?: true
    professionalId?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    licenseNumber?: true
    specialty?: true
    yearsExperience?: true
    qualifications?: true
    vettingStatus?: true
    vettedBy?: true
    vettedAt?: true
    appliedAt?: true
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
    professionalId: string
    firstName: string
    lastName: string
    email: string
    phone: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus: string
    vettedBy: string | null
    vettedAt: Date | null
    appliedAt: Date
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
    professionalId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    licenseNumber?: boolean
    specialty?: boolean
    yearsExperience?: boolean
    qualifications?: boolean
    vettingStatus?: boolean
    vettedBy?: boolean
    vettedAt?: boolean
    appliedAt?: boolean
    updatedAt?: boolean
    caseAssignments?: boolean | MedicalProfessional$caseAssignmentsArgs<ExtArgs>
    primaryOpinions?: boolean | MedicalProfessional$primaryOpinionsArgs<ExtArgs>
    reviewedOpinions?: boolean | MedicalProfessional$reviewedOpinionsArgs<ExtArgs>
    payments?: boolean | MedicalProfessional$paymentsArgs<ExtArgs>
    _count?: boolean | MedicalProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalProfessional"]>

  export type MedicalProfessionalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    licenseNumber?: boolean
    specialty?: boolean
    yearsExperience?: boolean
    qualifications?: boolean
    vettingStatus?: boolean
    vettedBy?: boolean
    vettedAt?: boolean
    appliedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["medicalProfessional"]>

  export type MedicalProfessionalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    licenseNumber?: boolean
    specialty?: boolean
    yearsExperience?: boolean
    qualifications?: boolean
    vettingStatus?: boolean
    vettedBy?: boolean
    vettedAt?: boolean
    appliedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["medicalProfessional"]>

  export type MedicalProfessionalSelectScalar = {
    id?: boolean
    professionalId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    licenseNumber?: boolean
    specialty?: boolean
    yearsExperience?: boolean
    qualifications?: boolean
    vettingStatus?: boolean
    vettedBy?: boolean
    vettedAt?: boolean
    appliedAt?: boolean
    updatedAt?: boolean
  }

  export type MedicalProfessionalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "firstName" | "lastName" | "email" | "phone" | "licenseNumber" | "specialty" | "yearsExperience" | "qualifications" | "vettingStatus" | "vettedBy" | "vettedAt" | "appliedAt" | "updatedAt", ExtArgs["result"]["medicalProfessional"]>
  export type MedicalProfessionalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    caseAssignments?: boolean | MedicalProfessional$caseAssignmentsArgs<ExtArgs>
    primaryOpinions?: boolean | MedicalProfessional$primaryOpinionsArgs<ExtArgs>
    reviewedOpinions?: boolean | MedicalProfessional$reviewedOpinionsArgs<ExtArgs>
    payments?: boolean | MedicalProfessional$paymentsArgs<ExtArgs>
    _count?: boolean | MedicalProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MedicalProfessionalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MedicalProfessionalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MedicalProfessionalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalProfessional"
    objects: {
      caseAssignments: Prisma.$CaseAssignmentPayload<ExtArgs>[]
      primaryOpinions: Prisma.$MedicalOpinionPayload<ExtArgs>[]
      reviewedOpinions: Prisma.$MedicalOpinionPayload<ExtArgs>[]
      payments: Prisma.$ProfessionalPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      firstName: string
      lastName: string
      email: string
      phone: string | null
      licenseNumber: string
      specialty: string
      yearsExperience: number
      qualifications: string
      vettingStatus: string
      vettedBy: string | null
      vettedAt: Date | null
      appliedAt: Date
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
    primaryOpinions<T extends MedicalProfessional$primaryOpinionsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessional$primaryOpinionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewedOpinions<T extends MedicalProfessional$reviewedOpinionsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessional$reviewedOpinionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalOpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends MedicalProfessional$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessional$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly professionalId: FieldRef<"MedicalProfessional", 'String'>
    readonly firstName: FieldRef<"MedicalProfessional", 'String'>
    readonly lastName: FieldRef<"MedicalProfessional", 'String'>
    readonly email: FieldRef<"MedicalProfessional", 'String'>
    readonly phone: FieldRef<"MedicalProfessional", 'String'>
    readonly licenseNumber: FieldRef<"MedicalProfessional", 'String'>
    readonly specialty: FieldRef<"MedicalProfessional", 'String'>
    readonly yearsExperience: FieldRef<"MedicalProfessional", 'Int'>
    readonly qualifications: FieldRef<"MedicalProfessional", 'String'>
    readonly vettingStatus: FieldRef<"MedicalProfessional", 'String'>
    readonly vettedBy: FieldRef<"MedicalProfessional", 'String'>
    readonly vettedAt: FieldRef<"MedicalProfessional", 'DateTime'>
    readonly appliedAt: FieldRef<"MedicalProfessional", 'DateTime'>
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
   * MedicalProfessional.primaryOpinions
   */
  export type MedicalProfessional$primaryOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MedicalProfessional.reviewedOpinions
   */
  export type MedicalProfessional$reviewedOpinionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MedicalProfessional.payments
   */
  export type MedicalProfessional$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    assignedBy: string | null
    assignedAt: Date | null
    status: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type CaseAssignmentMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    professionalId: string | null
    assignedBy: string | null
    assignedAt: Date | null
    status: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type CaseAssignmentCountAggregateOutputType = {
    id: number
    caseId: number
    professionalId: number
    assignedBy: number
    assignedAt: number
    status: number
    startedAt: number
    completedAt: number
    _all: number
  }


  export type CaseAssignmentMinAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    assignedBy?: true
    assignedAt?: true
    status?: true
    startedAt?: true
    completedAt?: true
  }

  export type CaseAssignmentMaxAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    assignedBy?: true
    assignedAt?: true
    status?: true
    startedAt?: true
    completedAt?: true
  }

  export type CaseAssignmentCountAggregateInputType = {
    id?: true
    caseId?: true
    professionalId?: true
    assignedBy?: true
    assignedAt?: true
    status?: true
    startedAt?: true
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
    assignedBy: string
    assignedAt: Date
    status: string
    startedAt: Date | null
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
    assignedBy?: boolean
    assignedAt?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseAssignment"]>

  export type CaseAssignmentSelectScalar = {
    id?: boolean
    caseId?: boolean
    professionalId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
  }

  export type CaseAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "professionalId" | "assignedBy" | "assignedAt" | "status" | "startedAt" | "completedAt", ExtArgs["result"]["caseAssignment"]>
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
      assignedBy: string
      assignedAt: Date
      status: string
      startedAt: Date | null
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
    readonly assignedBy: FieldRef<"CaseAssignment", 'String'>
    readonly assignedAt: FieldRef<"CaseAssignment", 'DateTime'>
    readonly status: FieldRef<"CaseAssignment", 'String'>
    readonly startedAt: FieldRef<"CaseAssignment", 'DateTime'>
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
    _avg: AIAnalysisAvgAggregateOutputType | null
    _sum: AIAnalysisSumAggregateOutputType | null
    _min: AIAnalysisMinAggregateOutputType | null
    _max: AIAnalysisMaxAggregateOutputType | null
  }

  export type AIAnalysisAvgAggregateOutputType = {
    confidence: number | null
  }

  export type AIAnalysisSumAggregateOutputType = {
    confidence: number | null
  }

  export type AIAnalysisMinAggregateOutputType = {
    id: string | null
    caseId: string | null
    analysisType: string | null
    findings: string | null
    confidence: number | null
    initiatedAt: Date | null
    completedAt: Date | null
  }

  export type AIAnalysisMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    analysisType: string | null
    findings: string | null
    confidence: number | null
    initiatedAt: Date | null
    completedAt: Date | null
  }

  export type AIAnalysisCountAggregateOutputType = {
    id: number
    caseId: number
    analysisType: number
    findings: number
    confidence: number
    initiatedAt: number
    completedAt: number
    _all: number
  }


  export type AIAnalysisAvgAggregateInputType = {
    confidence?: true
  }

  export type AIAnalysisSumAggregateInputType = {
    confidence?: true
  }

  export type AIAnalysisMinAggregateInputType = {
    id?: true
    caseId?: true
    analysisType?: true
    findings?: true
    confidence?: true
    initiatedAt?: true
    completedAt?: true
  }

  export type AIAnalysisMaxAggregateInputType = {
    id?: true
    caseId?: true
    analysisType?: true
    findings?: true
    confidence?: true
    initiatedAt?: true
    completedAt?: true
  }

  export type AIAnalysisCountAggregateInputType = {
    id?: true
    caseId?: true
    analysisType?: true
    findings?: true
    confidence?: true
    initiatedAt?: true
    completedAt?: true
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
     * Select which fields to average
    **/
    _avg?: AIAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIAnalysisSumAggregateInputType
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
    _avg?: AIAnalysisAvgAggregateInputType
    _sum?: AIAnalysisSumAggregateInputType
    _min?: AIAnalysisMinAggregateInputType
    _max?: AIAnalysisMaxAggregateInputType
  }

  export type AIAnalysisGroupByOutputType = {
    id: string
    caseId: string
    analysisType: string
    findings: string
    confidence: number | null
    initiatedAt: Date
    completedAt: Date | null
    _count: AIAnalysisCountAggregateOutputType | null
    _avg: AIAnalysisAvgAggregateOutputType | null
    _sum: AIAnalysisSumAggregateOutputType | null
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
    findings?: boolean
    confidence?: boolean
    initiatedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    analysisType?: boolean
    findings?: boolean
    confidence?: boolean
    initiatedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    analysisType?: boolean
    findings?: boolean
    confidence?: boolean
    initiatedAt?: boolean
    completedAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIAnalysis"]>

  export type AIAnalysisSelectScalar = {
    id?: boolean
    caseId?: boolean
    analysisType?: boolean
    findings?: boolean
    confidence?: boolean
    initiatedAt?: boolean
    completedAt?: boolean
  }

  export type AIAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "analysisType" | "findings" | "confidence" | "initiatedAt" | "completedAt", ExtArgs["result"]["aIAnalysis"]>
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
      findings: string
      confidence: number | null
      initiatedAt: Date
      completedAt: Date | null
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
    readonly findings: FieldRef<"AIAnalysis", 'String'>
    readonly confidence: FieldRef<"AIAnalysis", 'Float'>
    readonly initiatedAt: FieldRef<"AIAnalysis", 'DateTime'>
    readonly completedAt: FieldRef<"AIAnalysis", 'DateTime'>
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
    primaryProfessionalId: string | null
    reviewerProfessionalId: string | null
    diagnosis: string | null
    recommendations: string | null
    riskAssessment: string | null
    additionalTests: string | null
    notes: string | null
    status: string | null
    peerReviewNotes: string | null
    createdAt: Date | null
    submittedAt: Date | null
    reviewedAt: Date | null
    approvedAt: Date | null
    deliveredAt: Date | null
  }

  export type MedicalOpinionMaxAggregateOutputType = {
    id: string | null
    caseId: string | null
    primaryProfessionalId: string | null
    reviewerProfessionalId: string | null
    diagnosis: string | null
    recommendations: string | null
    riskAssessment: string | null
    additionalTests: string | null
    notes: string | null
    status: string | null
    peerReviewNotes: string | null
    createdAt: Date | null
    submittedAt: Date | null
    reviewedAt: Date | null
    approvedAt: Date | null
    deliveredAt: Date | null
  }

  export type MedicalOpinionCountAggregateOutputType = {
    id: number
    caseId: number
    primaryProfessionalId: number
    reviewerProfessionalId: number
    diagnosis: number
    recommendations: number
    riskAssessment: number
    additionalTests: number
    notes: number
    status: number
    peerReviewNotes: number
    createdAt: number
    submittedAt: number
    reviewedAt: number
    approvedAt: number
    deliveredAt: number
    _all: number
  }


  export type MedicalOpinionMinAggregateInputType = {
    id?: true
    caseId?: true
    primaryProfessionalId?: true
    reviewerProfessionalId?: true
    diagnosis?: true
    recommendations?: true
    riskAssessment?: true
    additionalTests?: true
    notes?: true
    status?: true
    peerReviewNotes?: true
    createdAt?: true
    submittedAt?: true
    reviewedAt?: true
    approvedAt?: true
    deliveredAt?: true
  }

  export type MedicalOpinionMaxAggregateInputType = {
    id?: true
    caseId?: true
    primaryProfessionalId?: true
    reviewerProfessionalId?: true
    diagnosis?: true
    recommendations?: true
    riskAssessment?: true
    additionalTests?: true
    notes?: true
    status?: true
    peerReviewNotes?: true
    createdAt?: true
    submittedAt?: true
    reviewedAt?: true
    approvedAt?: true
    deliveredAt?: true
  }

  export type MedicalOpinionCountAggregateInputType = {
    id?: true
    caseId?: true
    primaryProfessionalId?: true
    reviewerProfessionalId?: true
    diagnosis?: true
    recommendations?: true
    riskAssessment?: true
    additionalTests?: true
    notes?: true
    status?: true
    peerReviewNotes?: true
    createdAt?: true
    submittedAt?: true
    reviewedAt?: true
    approvedAt?: true
    deliveredAt?: true
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
    primaryProfessionalId: string
    reviewerProfessionalId: string | null
    diagnosis: string | null
    recommendations: string
    riskAssessment: string | null
    additionalTests: string | null
    notes: string | null
    status: string
    peerReviewNotes: string | null
    createdAt: Date
    submittedAt: Date | null
    reviewedAt: Date | null
    approvedAt: Date | null
    deliveredAt: Date | null
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
    primaryProfessionalId?: boolean
    reviewerProfessionalId?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    riskAssessment?: boolean
    additionalTests?: boolean
    notes?: boolean
    status?: boolean
    peerReviewNotes?: boolean
    createdAt?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    approvedAt?: boolean
    deliveredAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    primaryProfessional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
    reviewerProfessional?: boolean | MedicalOpinion$reviewerProfessionalArgs<ExtArgs>
  }, ExtArgs["result"]["medicalOpinion"]>

  export type MedicalOpinionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    primaryProfessionalId?: boolean
    reviewerProfessionalId?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    riskAssessment?: boolean
    additionalTests?: boolean
    notes?: boolean
    status?: boolean
    peerReviewNotes?: boolean
    createdAt?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    approvedAt?: boolean
    deliveredAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    primaryProfessional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
    reviewerProfessional?: boolean | MedicalOpinion$reviewerProfessionalArgs<ExtArgs>
  }, ExtArgs["result"]["medicalOpinion"]>

  export type MedicalOpinionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    caseId?: boolean
    primaryProfessionalId?: boolean
    reviewerProfessionalId?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    riskAssessment?: boolean
    additionalTests?: boolean
    notes?: boolean
    status?: boolean
    peerReviewNotes?: boolean
    createdAt?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    approvedAt?: boolean
    deliveredAt?: boolean
    case?: boolean | CaseDefaultArgs<ExtArgs>
    primaryProfessional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
    reviewerProfessional?: boolean | MedicalOpinion$reviewerProfessionalArgs<ExtArgs>
  }, ExtArgs["result"]["medicalOpinion"]>

  export type MedicalOpinionSelectScalar = {
    id?: boolean
    caseId?: boolean
    primaryProfessionalId?: boolean
    reviewerProfessionalId?: boolean
    diagnosis?: boolean
    recommendations?: boolean
    riskAssessment?: boolean
    additionalTests?: boolean
    notes?: boolean
    status?: boolean
    peerReviewNotes?: boolean
    createdAt?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    approvedAt?: boolean
    deliveredAt?: boolean
  }

  export type MedicalOpinionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "caseId" | "primaryProfessionalId" | "reviewerProfessionalId" | "diagnosis" | "recommendations" | "riskAssessment" | "additionalTests" | "notes" | "status" | "peerReviewNotes" | "createdAt" | "submittedAt" | "reviewedAt" | "approvedAt" | "deliveredAt", ExtArgs["result"]["medicalOpinion"]>
  export type MedicalOpinionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    primaryProfessional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
    reviewerProfessional?: boolean | MedicalOpinion$reviewerProfessionalArgs<ExtArgs>
  }
  export type MedicalOpinionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    primaryProfessional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
    reviewerProfessional?: boolean | MedicalOpinion$reviewerProfessionalArgs<ExtArgs>
  }
  export type MedicalOpinionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    case?: boolean | CaseDefaultArgs<ExtArgs>
    primaryProfessional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
    reviewerProfessional?: boolean | MedicalOpinion$reviewerProfessionalArgs<ExtArgs>
  }

  export type $MedicalOpinionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalOpinion"
    objects: {
      case: Prisma.$CasePayload<ExtArgs>
      primaryProfessional: Prisma.$MedicalProfessionalPayload<ExtArgs>
      reviewerProfessional: Prisma.$MedicalProfessionalPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      caseId: string
      primaryProfessionalId: string
      reviewerProfessionalId: string | null
      diagnosis: string | null
      recommendations: string
      riskAssessment: string | null
      additionalTests: string | null
      notes: string | null
      status: string
      peerReviewNotes: string | null
      createdAt: Date
      submittedAt: Date | null
      reviewedAt: Date | null
      approvedAt: Date | null
      deliveredAt: Date | null
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
    primaryProfessional<T extends MedicalProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalProfessionalDefaultArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewerProfessional<T extends MedicalOpinion$reviewerProfessionalArgs<ExtArgs> = {}>(args?: Subset<T, MedicalOpinion$reviewerProfessionalArgs<ExtArgs>>): Prisma__MedicalProfessionalClient<$Result.GetResult<Prisma.$MedicalProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly primaryProfessionalId: FieldRef<"MedicalOpinion", 'String'>
    readonly reviewerProfessionalId: FieldRef<"MedicalOpinion", 'String'>
    readonly diagnosis: FieldRef<"MedicalOpinion", 'String'>
    readonly recommendations: FieldRef<"MedicalOpinion", 'String'>
    readonly riskAssessment: FieldRef<"MedicalOpinion", 'String'>
    readonly additionalTests: FieldRef<"MedicalOpinion", 'String'>
    readonly notes: FieldRef<"MedicalOpinion", 'String'>
    readonly status: FieldRef<"MedicalOpinion", 'String'>
    readonly peerReviewNotes: FieldRef<"MedicalOpinion", 'String'>
    readonly createdAt: FieldRef<"MedicalOpinion", 'DateTime'>
    readonly submittedAt: FieldRef<"MedicalOpinion", 'DateTime'>
    readonly reviewedAt: FieldRef<"MedicalOpinion", 'DateTime'>
    readonly approvedAt: FieldRef<"MedicalOpinion", 'DateTime'>
    readonly deliveredAt: FieldRef<"MedicalOpinion", 'DateTime'>
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
   * MedicalOpinion.reviewerProfessional
   */
  export type MedicalOpinion$reviewerProfessionalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: MedicalProfessionalWhereInput
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
    professionalId: string | null
    caseId: string | null
    amount: number | null
    currency: string | null
    paymentType: string | null
    paymentMethod: string | null
    status: string | null
    transactionId: string | null
    initiatedAt: Date | null
    processedAt: Date | null
  }

  export type ProfessionalPaymentMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    caseId: string | null
    amount: number | null
    currency: string | null
    paymentType: string | null
    paymentMethod: string | null
    status: string | null
    transactionId: string | null
    initiatedAt: Date | null
    processedAt: Date | null
  }

  export type ProfessionalPaymentCountAggregateOutputType = {
    id: number
    professionalId: number
    caseId: number
    amount: number
    currency: number
    paymentType: number
    paymentMethod: number
    status: number
    transactionId: number
    initiatedAt: number
    processedAt: number
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
    professionalId?: true
    caseId?: true
    amount?: true
    currency?: true
    paymentType?: true
    paymentMethod?: true
    status?: true
    transactionId?: true
    initiatedAt?: true
    processedAt?: true
  }

  export type ProfessionalPaymentMaxAggregateInputType = {
    id?: true
    professionalId?: true
    caseId?: true
    amount?: true
    currency?: true
    paymentType?: true
    paymentMethod?: true
    status?: true
    transactionId?: true
    initiatedAt?: true
    processedAt?: true
  }

  export type ProfessionalPaymentCountAggregateInputType = {
    id?: true
    professionalId?: true
    caseId?: true
    amount?: true
    currency?: true
    paymentType?: true
    paymentMethod?: true
    status?: true
    transactionId?: true
    initiatedAt?: true
    processedAt?: true
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
    professionalId: string
    caseId: string | null
    amount: number
    currency: string
    paymentType: string
    paymentMethod: string
    status: string
    transactionId: string | null
    initiatedAt: Date
    processedAt: Date | null
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
    professionalId?: boolean
    caseId?: boolean
    amount?: boolean
    currency?: boolean
    paymentType?: boolean
    paymentMethod?: boolean
    status?: boolean
    transactionId?: boolean
    initiatedAt?: boolean
    processedAt?: boolean
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalPayment"]>

  export type ProfessionalPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    caseId?: boolean
    amount?: boolean
    currency?: boolean
    paymentType?: boolean
    paymentMethod?: boolean
    status?: boolean
    transactionId?: boolean
    initiatedAt?: boolean
    processedAt?: boolean
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalPayment"]>

  export type ProfessionalPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    caseId?: boolean
    amount?: boolean
    currency?: boolean
    paymentType?: boolean
    paymentMethod?: boolean
    status?: boolean
    transactionId?: boolean
    initiatedAt?: boolean
    processedAt?: boolean
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalPayment"]>

  export type ProfessionalPaymentSelectScalar = {
    id?: boolean
    professionalId?: boolean
    caseId?: boolean
    amount?: boolean
    currency?: boolean
    paymentType?: boolean
    paymentMethod?: boolean
    status?: boolean
    transactionId?: boolean
    initiatedAt?: boolean
    processedAt?: boolean
  }

  export type ProfessionalPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "caseId" | "amount" | "currency" | "paymentType" | "paymentMethod" | "status" | "transactionId" | "initiatedAt" | "processedAt", ExtArgs["result"]["professionalPayment"]>
  export type ProfessionalPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }
  export type ProfessionalPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | MedicalProfessionalDefaultArgs<ExtArgs>
  }

  export type $ProfessionalPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalPayment"
    objects: {
      professional: Prisma.$MedicalProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      caseId: string | null
      amount: number
      currency: string
      paymentType: string
      paymentMethod: string
      status: string
      transactionId: string | null
      initiatedAt: Date
      processedAt: Date | null
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
    readonly professionalId: FieldRef<"ProfessionalPayment", 'String'>
    readonly caseId: FieldRef<"ProfessionalPayment", 'String'>
    readonly amount: FieldRef<"ProfessionalPayment", 'Float'>
    readonly currency: FieldRef<"ProfessionalPayment", 'String'>
    readonly paymentType: FieldRef<"ProfessionalPayment", 'String'>
    readonly paymentMethod: FieldRef<"ProfessionalPayment", 'String'>
    readonly status: FieldRef<"ProfessionalPayment", 'String'>
    readonly transactionId: FieldRef<"ProfessionalPayment", 'String'>
    readonly initiatedAt: FieldRef<"ProfessionalPayment", 'DateTime'>
    readonly processedAt: FieldRef<"ProfessionalPayment", 'DateTime'>
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
    adminId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    permissions: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    adminId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    permissions: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    adminId: number
    firstName: number
    lastName: number
    email: number
    passwordHash: number
    role: number
    permissions: number
    isActive: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    adminId?: true
    firstName?: true
    lastName?: true
    email?: true
    passwordHash?: true
    role?: true
    permissions?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    adminId?: true
    firstName?: true
    lastName?: true
    email?: true
    passwordHash?: true
    role?: true
    permissions?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    adminId?: true
    firstName?: true
    lastName?: true
    email?: true
    passwordHash?: true
    role?: true
    permissions?: true
    isActive?: true
    lastLoginAt?: true
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
    adminId: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    role: string
    permissions: string
    isActive: boolean
    lastLoginAt: Date | null
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
    adminId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    permissions?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    permissions?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    permissions?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    adminId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    permissions?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminId" | "firstName" | "lastName" | "email" | "passwordHash" | "role" | "permissions" | "isActive" | "lastLoginAt" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminId: string
      firstName: string
      lastName: string
      email: string
      passwordHash: string
      role: string
      permissions: string
      isActive: boolean
      lastLoginAt: Date | null
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
    readonly adminId: FieldRef<"Admin", 'String'>
    readonly firstName: FieldRef<"Admin", 'String'>
    readonly lastName: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly passwordHash: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'String'>
    readonly permissions: FieldRef<"Admin", 'String'>
    readonly isActive: FieldRef<"Admin", 'Boolean'>
    readonly lastLoginAt: FieldRef<"Admin", 'DateTime'>
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


  export const CustomerScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    email: 'email',
    passwordHash: 'passwordHash',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    firstName: 'firstName',
    middleName: 'middleName',
    lastName: 'lastName',
    dateOfBirth: 'dateOfBirth',
    phone: 'phone',
    preferredContact: 'preferredContact',
    emailNotifications: 'emailNotifications',
    smsNotifications: 'smsNotifications',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


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
    ethnicity: 'ethnicity',
    gender: 'gender',
    diseaseType: 'diseaseType',
    isFirstOccurrence: 'isFirstOccurrence',
    geneticFamilyHistory: 'geneticFamilyHistory',
    paymentId: 'paymentId',
    consentAccepted: 'consentAccepted',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CaseScalarFieldEnum = (typeof CaseScalarFieldEnum)[keyof typeof CaseScalarFieldEnum]


  export const UploadedFileScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    fileName: 'fileName',
    originalName: 'originalName',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    category: 'category',
    s3Key: 's3Key',
    uploadedAt: 'uploadedAt'
  };

  export type UploadedFileScalarFieldEnum = (typeof UploadedFileScalarFieldEnum)[keyof typeof UploadedFileScalarFieldEnum]


  export const MedicalProfessionalScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    licenseNumber: 'licenseNumber',
    specialty: 'specialty',
    yearsExperience: 'yearsExperience',
    qualifications: 'qualifications',
    vettingStatus: 'vettingStatus',
    vettedBy: 'vettedBy',
    vettedAt: 'vettedAt',
    appliedAt: 'appliedAt',
    updatedAt: 'updatedAt'
  };

  export type MedicalProfessionalScalarFieldEnum = (typeof MedicalProfessionalScalarFieldEnum)[keyof typeof MedicalProfessionalScalarFieldEnum]


  export const CaseAssignmentScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    professionalId: 'professionalId',
    assignedBy: 'assignedBy',
    assignedAt: 'assignedAt',
    status: 'status',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
  };

  export type CaseAssignmentScalarFieldEnum = (typeof CaseAssignmentScalarFieldEnum)[keyof typeof CaseAssignmentScalarFieldEnum]


  export const AIAnalysisScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    analysisType: 'analysisType',
    findings: 'findings',
    confidence: 'confidence',
    initiatedAt: 'initiatedAt',
    completedAt: 'completedAt'
  };

  export type AIAnalysisScalarFieldEnum = (typeof AIAnalysisScalarFieldEnum)[keyof typeof AIAnalysisScalarFieldEnum]


  export const MedicalOpinionScalarFieldEnum: {
    id: 'id',
    caseId: 'caseId',
    primaryProfessionalId: 'primaryProfessionalId',
    reviewerProfessionalId: 'reviewerProfessionalId',
    diagnosis: 'diagnosis',
    recommendations: 'recommendations',
    riskAssessment: 'riskAssessment',
    additionalTests: 'additionalTests',
    notes: 'notes',
    status: 'status',
    peerReviewNotes: 'peerReviewNotes',
    createdAt: 'createdAt',
    submittedAt: 'submittedAt',
    reviewedAt: 'reviewedAt',
    approvedAt: 'approvedAt',
    deliveredAt: 'deliveredAt'
  };

  export type MedicalOpinionScalarFieldEnum = (typeof MedicalOpinionScalarFieldEnum)[keyof typeof MedicalOpinionScalarFieldEnum]


  export const ProfessionalPaymentScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    caseId: 'caseId',
    amount: 'amount',
    currency: 'currency',
    paymentType: 'paymentType',
    paymentMethod: 'paymentMethod',
    status: 'status',
    transactionId: 'transactionId',
    initiatedAt: 'initiatedAt',
    processedAt: 'processedAt'
  };

  export type ProfessionalPaymentScalarFieldEnum = (typeof ProfessionalPaymentScalarFieldEnum)[keyof typeof ProfessionalPaymentScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    permissions: 'permissions',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    customerId?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    passwordHash?: StringFilter<"Customer"> | string
    isActive?: BoolFilter<"Customer"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    firstName?: StringFilter<"Customer"> | string
    middleName?: StringNullableFilter<"Customer"> | string | null
    lastName?: StringFilter<"Customer"> | string
    dateOfBirth?: DateTimeFilter<"Customer"> | Date | string
    phone?: StringNullableFilter<"Customer"> | string | null
    preferredContact?: StringFilter<"Customer"> | string
    emailNotifications?: BoolFilter<"Customer"> | boolean
    smsNotifications?: BoolFilter<"Customer"> | boolean
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    cases?: CaseListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    phone?: SortOrderInput | SortOrder
    preferredContact?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cases?: CaseOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    customerId?: string
    email?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    passwordHash?: StringFilter<"Customer"> | string
    isActive?: BoolFilter<"Customer"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Customer"> | Date | string | null
    firstName?: StringFilter<"Customer"> | string
    middleName?: StringNullableFilter<"Customer"> | string | null
    lastName?: StringFilter<"Customer"> | string
    dateOfBirth?: DateTimeFilter<"Customer"> | Date | string
    phone?: StringNullableFilter<"Customer"> | string | null
    preferredContact?: StringFilter<"Customer"> | string
    emailNotifications?: BoolFilter<"Customer"> | boolean
    smsNotifications?: BoolFilter<"Customer"> | boolean
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
    cases?: CaseListRelationFilter
  }, "id" | "customerId" | "email">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    firstName?: SortOrder
    middleName?: SortOrderInput | SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    phone?: SortOrderInput | SortOrder
    preferredContact?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
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
    customerId?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    passwordHash?: StringWithAggregatesFilter<"Customer"> | string
    isActive?: BoolWithAggregatesFilter<"Customer"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    firstName?: StringWithAggregatesFilter<"Customer"> | string
    middleName?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    lastName?: StringWithAggregatesFilter<"Customer"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    preferredContact?: StringWithAggregatesFilter<"Customer"> | string
    emailNotifications?: BoolWithAggregatesFilter<"Customer"> | boolean
    smsNotifications?: BoolWithAggregatesFilter<"Customer"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

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
    ethnicity?: StringNullableFilter<"Case"> | string | null
    gender?: StringNullableFilter<"Case"> | string | null
    diseaseType?: StringNullableFilter<"Case"> | string | null
    isFirstOccurrence?: BoolNullableFilter<"Case"> | boolean | null
    geneticFamilyHistory?: StringNullableFilter<"Case"> | string | null
    paymentId?: StringNullableFilter<"Case"> | string | null
    consentAccepted?: BoolFilter<"Case"> | boolean
    status?: StringFilter<"Case"> | string
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    uploadedFiles?: UploadedFileListRelationFilter
    aiAnalysis?: XOR<AIAnalysisNullableScalarRelationFilter, AIAnalysisWhereInput> | null
    caseAssignments?: CaseAssignmentListRelationFilter
    medicalOpinions?: MedicalOpinionListRelationFilter
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
    ethnicity?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    diseaseType?: SortOrderInput | SortOrder
    isFirstOccurrence?: SortOrderInput | SortOrder
    geneticFamilyHistory?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    consentAccepted?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    uploadedFiles?: UploadedFileOrderByRelationAggregateInput
    aiAnalysis?: AIAnalysisOrderByWithRelationInput
    caseAssignments?: CaseAssignmentOrderByRelationAggregateInput
    medicalOpinions?: MedicalOpinionOrderByRelationAggregateInput
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
    ethnicity?: StringNullableFilter<"Case"> | string | null
    gender?: StringNullableFilter<"Case"> | string | null
    diseaseType?: StringNullableFilter<"Case"> | string | null
    isFirstOccurrence?: BoolNullableFilter<"Case"> | boolean | null
    geneticFamilyHistory?: StringNullableFilter<"Case"> | string | null
    paymentId?: StringNullableFilter<"Case"> | string | null
    consentAccepted?: BoolFilter<"Case"> | boolean
    status?: StringFilter<"Case"> | string
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    uploadedFiles?: UploadedFileListRelationFilter
    aiAnalysis?: XOR<AIAnalysisNullableScalarRelationFilter, AIAnalysisWhereInput> | null
    caseAssignments?: CaseAssignmentListRelationFilter
    medicalOpinions?: MedicalOpinionListRelationFilter
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
    ethnicity?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    diseaseType?: SortOrderInput | SortOrder
    isFirstOccurrence?: SortOrderInput | SortOrder
    geneticFamilyHistory?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    consentAccepted?: SortOrder
    status?: SortOrder
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
    customerId?: StringWithAggregatesFilter<"Case"> | string
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
    status?: StringWithAggregatesFilter<"Case"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Case"> | Date | string
  }

  export type UploadedFileWhereInput = {
    AND?: UploadedFileWhereInput | UploadedFileWhereInput[]
    OR?: UploadedFileWhereInput[]
    NOT?: UploadedFileWhereInput | UploadedFileWhereInput[]
    id?: StringFilter<"UploadedFile"> | string
    caseId?: StringFilter<"UploadedFile"> | string
    fileName?: StringFilter<"UploadedFile"> | string
    originalName?: StringFilter<"UploadedFile"> | string
    fileSize?: IntFilter<"UploadedFile"> | number
    mimeType?: StringFilter<"UploadedFile"> | string
    category?: StringFilter<"UploadedFile"> | string
    s3Key?: StringNullableFilter<"UploadedFile"> | string | null
    uploadedAt?: DateTimeFilter<"UploadedFile"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type UploadedFileOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    category?: SortOrder
    s3Key?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type UploadedFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadedFileWhereInput | UploadedFileWhereInput[]
    OR?: UploadedFileWhereInput[]
    NOT?: UploadedFileWhereInput | UploadedFileWhereInput[]
    caseId?: StringFilter<"UploadedFile"> | string
    fileName?: StringFilter<"UploadedFile"> | string
    originalName?: StringFilter<"UploadedFile"> | string
    fileSize?: IntFilter<"UploadedFile"> | number
    mimeType?: StringFilter<"UploadedFile"> | string
    category?: StringFilter<"UploadedFile"> | string
    s3Key?: StringNullableFilter<"UploadedFile"> | string | null
    uploadedAt?: DateTimeFilter<"UploadedFile"> | Date | string
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id">

  export type UploadedFileOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    category?: SortOrder
    s3Key?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
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
    fileName?: StringWithAggregatesFilter<"UploadedFile"> | string
    originalName?: StringWithAggregatesFilter<"UploadedFile"> | string
    fileSize?: IntWithAggregatesFilter<"UploadedFile"> | number
    mimeType?: StringWithAggregatesFilter<"UploadedFile"> | string
    category?: StringWithAggregatesFilter<"UploadedFile"> | string
    s3Key?: StringNullableWithAggregatesFilter<"UploadedFile"> | string | null
    uploadedAt?: DateTimeWithAggregatesFilter<"UploadedFile"> | Date | string
  }

  export type MedicalProfessionalWhereInput = {
    AND?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    OR?: MedicalProfessionalWhereInput[]
    NOT?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    id?: StringFilter<"MedicalProfessional"> | string
    professionalId?: StringFilter<"MedicalProfessional"> | string
    firstName?: StringFilter<"MedicalProfessional"> | string
    lastName?: StringFilter<"MedicalProfessional"> | string
    email?: StringFilter<"MedicalProfessional"> | string
    phone?: StringNullableFilter<"MedicalProfessional"> | string | null
    licenseNumber?: StringFilter<"MedicalProfessional"> | string
    specialty?: StringFilter<"MedicalProfessional"> | string
    yearsExperience?: IntFilter<"MedicalProfessional"> | number
    qualifications?: StringFilter<"MedicalProfessional"> | string
    vettingStatus?: StringFilter<"MedicalProfessional"> | string
    vettedBy?: StringNullableFilter<"MedicalProfessional"> | string | null
    vettedAt?: DateTimeNullableFilter<"MedicalProfessional"> | Date | string | null
    appliedAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    caseAssignments?: CaseAssignmentListRelationFilter
    primaryOpinions?: MedicalOpinionListRelationFilter
    reviewedOpinions?: MedicalOpinionListRelationFilter
    payments?: ProfessionalPaymentListRelationFilter
  }

  export type MedicalProfessionalOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    licenseNumber?: SortOrder
    specialty?: SortOrder
    yearsExperience?: SortOrder
    qualifications?: SortOrder
    vettingStatus?: SortOrder
    vettedBy?: SortOrderInput | SortOrder
    vettedAt?: SortOrderInput | SortOrder
    appliedAt?: SortOrder
    updatedAt?: SortOrder
    caseAssignments?: CaseAssignmentOrderByRelationAggregateInput
    primaryOpinions?: MedicalOpinionOrderByRelationAggregateInput
    reviewedOpinions?: MedicalOpinionOrderByRelationAggregateInput
    payments?: ProfessionalPaymentOrderByRelationAggregateInput
  }

  export type MedicalProfessionalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    professionalId?: string
    email?: string
    AND?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    OR?: MedicalProfessionalWhereInput[]
    NOT?: MedicalProfessionalWhereInput | MedicalProfessionalWhereInput[]
    firstName?: StringFilter<"MedicalProfessional"> | string
    lastName?: StringFilter<"MedicalProfessional"> | string
    phone?: StringNullableFilter<"MedicalProfessional"> | string | null
    licenseNumber?: StringFilter<"MedicalProfessional"> | string
    specialty?: StringFilter<"MedicalProfessional"> | string
    yearsExperience?: IntFilter<"MedicalProfessional"> | number
    qualifications?: StringFilter<"MedicalProfessional"> | string
    vettingStatus?: StringFilter<"MedicalProfessional"> | string
    vettedBy?: StringNullableFilter<"MedicalProfessional"> | string | null
    vettedAt?: DateTimeNullableFilter<"MedicalProfessional"> | Date | string | null
    appliedAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalProfessional"> | Date | string
    caseAssignments?: CaseAssignmentListRelationFilter
    primaryOpinions?: MedicalOpinionListRelationFilter
    reviewedOpinions?: MedicalOpinionListRelationFilter
    payments?: ProfessionalPaymentListRelationFilter
  }, "id" | "professionalId" | "email">

  export type MedicalProfessionalOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    licenseNumber?: SortOrder
    specialty?: SortOrder
    yearsExperience?: SortOrder
    qualifications?: SortOrder
    vettingStatus?: SortOrder
    vettedBy?: SortOrderInput | SortOrder
    vettedAt?: SortOrderInput | SortOrder
    appliedAt?: SortOrder
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
    professionalId?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    firstName?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    lastName?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    email?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    phone?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    licenseNumber?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    specialty?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    yearsExperience?: IntWithAggregatesFilter<"MedicalProfessional"> | number
    qualifications?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    vettingStatus?: StringWithAggregatesFilter<"MedicalProfessional"> | string
    vettedBy?: StringNullableWithAggregatesFilter<"MedicalProfessional"> | string | null
    vettedAt?: DateTimeNullableWithAggregatesFilter<"MedicalProfessional"> | Date | string | null
    appliedAt?: DateTimeWithAggregatesFilter<"MedicalProfessional"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MedicalProfessional"> | Date | string
  }

  export type CaseAssignmentWhereInput = {
    AND?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    OR?: CaseAssignmentWhereInput[]
    NOT?: CaseAssignmentWhereInput | CaseAssignmentWhereInput[]
    id?: StringFilter<"CaseAssignment"> | string
    caseId?: StringFilter<"CaseAssignment"> | string
    professionalId?: StringFilter<"CaseAssignment"> | string
    assignedBy?: StringFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    status?: StringFilter<"CaseAssignment"> | string
    startedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }

  export type CaseAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
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
    assignedBy?: StringFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    status?: StringFilter<"CaseAssignment"> | string
    startedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }, "id">

  export type CaseAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    status?: SortOrder
    startedAt?: SortOrderInput | SortOrder
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
    assignedBy?: StringWithAggregatesFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"CaseAssignment"> | Date | string
    status?: StringWithAggregatesFilter<"CaseAssignment"> | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CaseAssignment"> | Date | string | null
  }

  export type AIAnalysisWhereInput = {
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    id?: StringFilter<"AIAnalysis"> | string
    caseId?: StringFilter<"AIAnalysis"> | string
    analysisType?: StringFilter<"AIAnalysis"> | string
    findings?: StringFilter<"AIAnalysis"> | string
    confidence?: FloatNullableFilter<"AIAnalysis"> | number | null
    initiatedAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    completedAt?: DateTimeNullableFilter<"AIAnalysis"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }

  export type AIAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    findings?: SortOrder
    confidence?: SortOrderInput | SortOrder
    initiatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    case?: CaseOrderByWithRelationInput
  }

  export type AIAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    caseId?: string
    AND?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    OR?: AIAnalysisWhereInput[]
    NOT?: AIAnalysisWhereInput | AIAnalysisWhereInput[]
    analysisType?: StringFilter<"AIAnalysis"> | string
    findings?: StringFilter<"AIAnalysis"> | string
    confidence?: FloatNullableFilter<"AIAnalysis"> | number | null
    initiatedAt?: DateTimeFilter<"AIAnalysis"> | Date | string
    completedAt?: DateTimeNullableFilter<"AIAnalysis"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
  }, "id" | "caseId">

  export type AIAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    findings?: SortOrder
    confidence?: SortOrderInput | SortOrder
    initiatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: AIAnalysisCountOrderByAggregateInput
    _avg?: AIAnalysisAvgOrderByAggregateInput
    _max?: AIAnalysisMaxOrderByAggregateInput
    _min?: AIAnalysisMinOrderByAggregateInput
    _sum?: AIAnalysisSumOrderByAggregateInput
  }

  export type AIAnalysisScalarWhereWithAggregatesInput = {
    AND?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    OR?: AIAnalysisScalarWhereWithAggregatesInput[]
    NOT?: AIAnalysisScalarWhereWithAggregatesInput | AIAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIAnalysis"> | string
    caseId?: StringWithAggregatesFilter<"AIAnalysis"> | string
    analysisType?: StringWithAggregatesFilter<"AIAnalysis"> | string
    findings?: StringWithAggregatesFilter<"AIAnalysis"> | string
    confidence?: FloatNullableWithAggregatesFilter<"AIAnalysis"> | number | null
    initiatedAt?: DateTimeWithAggregatesFilter<"AIAnalysis"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"AIAnalysis"> | Date | string | null
  }

  export type MedicalOpinionWhereInput = {
    AND?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    OR?: MedicalOpinionWhereInput[]
    NOT?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    id?: StringFilter<"MedicalOpinion"> | string
    caseId?: StringFilter<"MedicalOpinion"> | string
    primaryProfessionalId?: StringFilter<"MedicalOpinion"> | string
    reviewerProfessionalId?: StringNullableFilter<"MedicalOpinion"> | string | null
    diagnosis?: StringNullableFilter<"MedicalOpinion"> | string | null
    recommendations?: StringFilter<"MedicalOpinion"> | string
    riskAssessment?: StringNullableFilter<"MedicalOpinion"> | string | null
    additionalTests?: StringNullableFilter<"MedicalOpinion"> | string | null
    notes?: StringNullableFilter<"MedicalOpinion"> | string | null
    status?: StringFilter<"MedicalOpinion"> | string
    peerReviewNotes?: StringNullableFilter<"MedicalOpinion"> | string | null
    createdAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    submittedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    reviewedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    approvedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    primaryProfessional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
    reviewerProfessional?: XOR<MedicalProfessionalNullableScalarRelationFilter, MedicalProfessionalWhereInput> | null
  }

  export type MedicalOpinionOrderByWithRelationInput = {
    id?: SortOrder
    caseId?: SortOrder
    primaryProfessionalId?: SortOrder
    reviewerProfessionalId?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    recommendations?: SortOrder
    riskAssessment?: SortOrderInput | SortOrder
    additionalTests?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    peerReviewNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    case?: CaseOrderByWithRelationInput
    primaryProfessional?: MedicalProfessionalOrderByWithRelationInput
    reviewerProfessional?: MedicalProfessionalOrderByWithRelationInput
  }

  export type MedicalOpinionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    OR?: MedicalOpinionWhereInput[]
    NOT?: MedicalOpinionWhereInput | MedicalOpinionWhereInput[]
    caseId?: StringFilter<"MedicalOpinion"> | string
    primaryProfessionalId?: StringFilter<"MedicalOpinion"> | string
    reviewerProfessionalId?: StringNullableFilter<"MedicalOpinion"> | string | null
    diagnosis?: StringNullableFilter<"MedicalOpinion"> | string | null
    recommendations?: StringFilter<"MedicalOpinion"> | string
    riskAssessment?: StringNullableFilter<"MedicalOpinion"> | string | null
    additionalTests?: StringNullableFilter<"MedicalOpinion"> | string | null
    notes?: StringNullableFilter<"MedicalOpinion"> | string | null
    status?: StringFilter<"MedicalOpinion"> | string
    peerReviewNotes?: StringNullableFilter<"MedicalOpinion"> | string | null
    createdAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    submittedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    reviewedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    approvedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    case?: XOR<CaseScalarRelationFilter, CaseWhereInput>
    primaryProfessional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
    reviewerProfessional?: XOR<MedicalProfessionalNullableScalarRelationFilter, MedicalProfessionalWhereInput> | null
  }, "id">

  export type MedicalOpinionOrderByWithAggregationInput = {
    id?: SortOrder
    caseId?: SortOrder
    primaryProfessionalId?: SortOrder
    reviewerProfessionalId?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    recommendations?: SortOrder
    riskAssessment?: SortOrderInput | SortOrder
    additionalTests?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    peerReviewNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
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
    primaryProfessionalId?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    reviewerProfessionalId?: StringNullableWithAggregatesFilter<"MedicalOpinion"> | string | null
    diagnosis?: StringNullableWithAggregatesFilter<"MedicalOpinion"> | string | null
    recommendations?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    riskAssessment?: StringNullableWithAggregatesFilter<"MedicalOpinion"> | string | null
    additionalTests?: StringNullableWithAggregatesFilter<"MedicalOpinion"> | string | null
    notes?: StringNullableWithAggregatesFilter<"MedicalOpinion"> | string | null
    status?: StringWithAggregatesFilter<"MedicalOpinion"> | string
    peerReviewNotes?: StringNullableWithAggregatesFilter<"MedicalOpinion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MedicalOpinion"> | Date | string
    submittedAt?: DateTimeNullableWithAggregatesFilter<"MedicalOpinion"> | Date | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"MedicalOpinion"> | Date | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"MedicalOpinion"> | Date | string | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"MedicalOpinion"> | Date | string | null
  }

  export type ProfessionalPaymentWhereInput = {
    AND?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    OR?: ProfessionalPaymentWhereInput[]
    NOT?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    id?: StringFilter<"ProfessionalPayment"> | string
    professionalId?: StringFilter<"ProfessionalPayment"> | string
    caseId?: StringNullableFilter<"ProfessionalPayment"> | string | null
    amount?: FloatFilter<"ProfessionalPayment"> | number
    currency?: StringFilter<"ProfessionalPayment"> | string
    paymentType?: StringFilter<"ProfessionalPayment"> | string
    paymentMethod?: StringFilter<"ProfessionalPayment"> | string
    status?: StringFilter<"ProfessionalPayment"> | string
    transactionId?: StringNullableFilter<"ProfessionalPayment"> | string | null
    initiatedAt?: DateTimeFilter<"ProfessionalPayment"> | Date | string
    processedAt?: DateTimeNullableFilter<"ProfessionalPayment"> | Date | string | null
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }

  export type ProfessionalPaymentOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    caseId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    initiatedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    professional?: MedicalProfessionalOrderByWithRelationInput
  }

  export type ProfessionalPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    OR?: ProfessionalPaymentWhereInput[]
    NOT?: ProfessionalPaymentWhereInput | ProfessionalPaymentWhereInput[]
    professionalId?: StringFilter<"ProfessionalPayment"> | string
    caseId?: StringNullableFilter<"ProfessionalPayment"> | string | null
    amount?: FloatFilter<"ProfessionalPayment"> | number
    currency?: StringFilter<"ProfessionalPayment"> | string
    paymentType?: StringFilter<"ProfessionalPayment"> | string
    paymentMethod?: StringFilter<"ProfessionalPayment"> | string
    status?: StringFilter<"ProfessionalPayment"> | string
    transactionId?: StringNullableFilter<"ProfessionalPayment"> | string | null
    initiatedAt?: DateTimeFilter<"ProfessionalPayment"> | Date | string
    processedAt?: DateTimeNullableFilter<"ProfessionalPayment"> | Date | string | null
    professional?: XOR<MedicalProfessionalScalarRelationFilter, MedicalProfessionalWhereInput>
  }, "id">

  export type ProfessionalPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    caseId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    initiatedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
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
    professionalId?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    caseId?: StringNullableWithAggregatesFilter<"ProfessionalPayment"> | string | null
    amount?: FloatWithAggregatesFilter<"ProfessionalPayment"> | number
    currency?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    paymentType?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    paymentMethod?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    status?: StringWithAggregatesFilter<"ProfessionalPayment"> | string
    transactionId?: StringNullableWithAggregatesFilter<"ProfessionalPayment"> | string | null
    initiatedAt?: DateTimeWithAggregatesFilter<"ProfessionalPayment"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"ProfessionalPayment"> | Date | string | null
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    adminId?: StringFilter<"Admin"> | string
    firstName?: StringFilter<"Admin"> | string
    lastName?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    passwordHash?: StringFilter<"Admin"> | string
    role?: StringFilter<"Admin"> | string
    permissions?: StringFilter<"Admin"> | string
    isActive?: BoolFilter<"Admin"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Admin"> | Date | string | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    adminId?: string
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    firstName?: StringFilter<"Admin"> | string
    lastName?: StringFilter<"Admin"> | string
    passwordHash?: StringFilter<"Admin"> | string
    role?: StringFilter<"Admin"> | string
    permissions?: StringFilter<"Admin"> | string
    isActive?: BoolFilter<"Admin"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"Admin"> | Date | string | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }, "id" | "adminId" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
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
    adminId?: StringWithAggregatesFilter<"Admin"> | string
    firstName?: StringWithAggregatesFilter<"Admin"> | string
    lastName?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    passwordHash?: StringWithAggregatesFilter<"Admin"> | string
    role?: StringWithAggregatesFilter<"Admin"> | string
    permissions?: StringWithAggregatesFilter<"Admin"> | string
    isActive?: BoolWithAggregatesFilter<"Admin"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    customerId?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    phone?: string | null
    preferredContact?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    customerId?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    phone?: string | null
    preferredContact?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: CaseUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContact?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContact?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: CaseUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    customerId?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    phone?: string | null
    preferredContact?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContact?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContact?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseCreateInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateInput = {
    id?: string
    caseNumber?: string
    customerId: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisUncheckedCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
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
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUncheckedUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateManyInput = {
    id?: string
    caseNumber?: string
    customerId: string
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
    consentAccepted?: boolean
    status?: string
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    ethnicity?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    diseaseType?: NullableStringFieldUpdateOperationsInput | string | null
    isFirstOccurrence?: NullableBoolFieldUpdateOperationsInput | boolean | null
    geneticFamilyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    consentAccepted?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileCreateInput = {
    id?: string
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    category: string
    s3Key?: string | null
    uploadedAt?: Date | string
    case: CaseCreateNestedOneWithoutUploadedFilesInput
  }

  export type UploadedFileUncheckedCreateInput = {
    id?: string
    caseId: string
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    category: string
    s3Key?: string | null
    uploadedAt?: Date | string
  }

  export type UploadedFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    case?: CaseUpdateOneRequiredWithoutUploadedFilesNestedInput
  }

  export type UploadedFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileCreateManyInput = {
    id?: string
    caseId: string
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    category: string
    s3Key?: string | null
    uploadedAt?: Date | string
  }

  export type UploadedFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalProfessionalCreateInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    primaryOpinions?: MedicalOpinionCreateNestedManyWithoutPrimaryProfessionalInput
    reviewedOpinions?: MedicalOpinionCreateNestedManyWithoutReviewerProfessionalInput
    payments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    primaryOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutPrimaryProfessionalInput
    reviewedOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutReviewerProfessionalInput
    payments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    primaryOpinions?: MedicalOpinionUpdateManyWithoutPrimaryProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUpdateManyWithoutReviewerProfessionalNestedInput
    payments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    primaryOpinions?: MedicalOpinionUncheckedUpdateManyWithoutPrimaryProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUncheckedUpdateManyWithoutReviewerProfessionalNestedInput
    payments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalCreateManyInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicalProfessionalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalProfessionalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentCreateInput = {
    id?: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    case: CaseCreateNestedOneWithoutCaseAssignmentsInput
    professional: MedicalProfessionalCreateNestedOneWithoutCaseAssignmentsInput
  }

  export type CaseAssignmentUncheckedCreateInput = {
    id?: string
    caseId: string
    professionalId: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type CaseAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutCaseAssignmentsNestedInput
    professional?: MedicalProfessionalUpdateOneRequiredWithoutCaseAssignmentsNestedInput
  }

  export type CaseAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentCreateManyInput = {
    id?: string
    caseId: string
    professionalId: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type CaseAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIAnalysisCreateInput = {
    id?: string
    analysisType: string
    findings: string
    confidence?: number | null
    initiatedAt?: Date | string
    completedAt?: Date | string | null
    case: CaseCreateNestedOneWithoutAiAnalysisInput
  }

  export type AIAnalysisUncheckedCreateInput = {
    id?: string
    caseId: string
    analysisType: string
    findings: string
    confidence?: number | null
    initiatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutAiAnalysisNestedInput
  }

  export type AIAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIAnalysisCreateManyInput = {
    id?: string
    caseId: string
    analysisType: string
    findings: string
    confidence?: number | null
    initiatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionCreateInput = {
    id?: string
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
    case: CaseCreateNestedOneWithoutMedicalOpinionsInput
    primaryProfessional: MedicalProfessionalCreateNestedOneWithoutPrimaryOpinionsInput
    reviewerProfessional?: MedicalProfessionalCreateNestedOneWithoutReviewedOpinionsInput
  }

  export type MedicalOpinionUncheckedCreateInput = {
    id?: string
    caseId: string
    primaryProfessionalId: string
    reviewerProfessionalId?: string | null
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type MedicalOpinionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutMedicalOpinionsNestedInput
    primaryProfessional?: MedicalProfessionalUpdateOneRequiredWithoutPrimaryOpinionsNestedInput
    reviewerProfessional?: MedicalProfessionalUpdateOneWithoutReviewedOpinionsNestedInput
  }

  export type MedicalOpinionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    primaryProfessionalId?: StringFieldUpdateOperationsInput | string
    reviewerProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionCreateManyInput = {
    id?: string
    caseId: string
    primaryProfessionalId: string
    reviewerProfessionalId?: string | null
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type MedicalOpinionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    primaryProfessionalId?: StringFieldUpdateOperationsInput | string
    reviewerProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfessionalPaymentCreateInput = {
    id?: string
    caseId?: string | null
    amount: number
    currency?: string
    paymentType: string
    paymentMethod: string
    status?: string
    transactionId?: string | null
    initiatedAt?: Date | string
    processedAt?: Date | string | null
    professional: MedicalProfessionalCreateNestedOneWithoutPaymentsInput
  }

  export type ProfessionalPaymentUncheckedCreateInput = {
    id?: string
    professionalId: string
    caseId?: string | null
    amount: number
    currency?: string
    paymentType: string
    paymentMethod: string
    status?: string
    transactionId?: string | null
    initiatedAt?: Date | string
    processedAt?: Date | string | null
  }

  export type ProfessionalPaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    professional?: MedicalProfessionalUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type ProfessionalPaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfessionalPaymentCreateManyInput = {
    id?: string
    professionalId: string
    caseId?: string | null
    amount: number
    currency?: string
    paymentType: string
    paymentMethod: string
    status?: string
    transactionId?: string | null
    initiatedAt?: Date | string
    processedAt?: Date | string | null
  }

  export type ProfessionalPaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfessionalPaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminCreateInput = {
    id?: string
    adminId?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    role?: string
    permissions: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    adminId?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    role?: string
    permissions: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    permissions?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    permissions?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateManyInput = {
    id?: string
    adminId?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    role?: string
    permissions: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    permissions?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    permissions?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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
    customerId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    phone?: SortOrder
    preferredContact?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    phone?: SortOrder
    preferredContact?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    firstName?: SortOrder
    middleName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    phone?: SortOrder
    preferredContact?: SortOrder
    emailNotifications?: SortOrder
    smsNotifications?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type AIAnalysisNullableScalarRelationFilter = {
    is?: AIAnalysisWhereInput | null
    isNot?: AIAnalysisWhereInput | null
  }

  export type CaseAssignmentListRelationFilter = {
    every?: CaseAssignmentWhereInput
    some?: CaseAssignmentWhereInput
    none?: CaseAssignmentWhereInput
  }

  export type MedicalOpinionListRelationFilter = {
    every?: MedicalOpinionWhereInput
    some?: MedicalOpinionWhereInput
    none?: MedicalOpinionWhereInput
  }

  export type UploadedFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalOpinionOrderByRelationAggregateInput = {
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
    ethnicity?: SortOrder
    gender?: SortOrder
    diseaseType?: SortOrder
    isFirstOccurrence?: SortOrder
    geneticFamilyHistory?: SortOrder
    paymentId?: SortOrder
    consentAccepted?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    ethnicity?: SortOrder
    gender?: SortOrder
    diseaseType?: SortOrder
    isFirstOccurrence?: SortOrder
    geneticFamilyHistory?: SortOrder
    paymentId?: SortOrder
    consentAccepted?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    ethnicity?: SortOrder
    gender?: SortOrder
    diseaseType?: SortOrder
    isFirstOccurrence?: SortOrder
    geneticFamilyHistory?: SortOrder
    paymentId?: SortOrder
    consentAccepted?: SortOrder
    status?: SortOrder
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
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    category?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
  }

  export type UploadedFileAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type UploadedFileMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    category?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
  }

  export type UploadedFileMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    category?: SortOrder
    s3Key?: SortOrder
    uploadedAt?: SortOrder
  }

  export type UploadedFileSumOrderByAggregateInput = {
    fileSize?: SortOrder
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

  export type ProfessionalPaymentListRelationFilter = {
    every?: ProfessionalPaymentWhereInput
    some?: ProfessionalPaymentWhereInput
    none?: ProfessionalPaymentWhereInput
  }

  export type ProfessionalPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalProfessionalCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    licenseNumber?: SortOrder
    specialty?: SortOrder
    yearsExperience?: SortOrder
    qualifications?: SortOrder
    vettingStatus?: SortOrder
    vettedBy?: SortOrder
    vettedAt?: SortOrder
    appliedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalProfessionalAvgOrderByAggregateInput = {
    yearsExperience?: SortOrder
  }

  export type MedicalProfessionalMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    licenseNumber?: SortOrder
    specialty?: SortOrder
    yearsExperience?: SortOrder
    qualifications?: SortOrder
    vettingStatus?: SortOrder
    vettedBy?: SortOrder
    vettedAt?: SortOrder
    appliedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalProfessionalMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    licenseNumber?: SortOrder
    specialty?: SortOrder
    yearsExperience?: SortOrder
    qualifications?: SortOrder
    vettingStatus?: SortOrder
    vettedBy?: SortOrder
    vettedAt?: SortOrder
    appliedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicalProfessionalSumOrderByAggregateInput = {
    yearsExperience?: SortOrder
  }

  export type MedicalProfessionalScalarRelationFilter = {
    is?: MedicalProfessionalWhereInput
    isNot?: MedicalProfessionalWhereInput
  }

  export type CaseAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type CaseAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type CaseAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    professionalId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
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

  export type AIAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    findings?: SortOrder
    confidence?: SortOrder
    initiatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AIAnalysisAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type AIAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    findings?: SortOrder
    confidence?: SortOrder
    initiatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AIAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    analysisType?: SortOrder
    findings?: SortOrder
    confidence?: SortOrder
    initiatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AIAnalysisSumOrderByAggregateInput = {
    confidence?: SortOrder
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

  export type MedicalProfessionalNullableScalarRelationFilter = {
    is?: MedicalProfessionalWhereInput | null
    isNot?: MedicalProfessionalWhereInput | null
  }

  export type MedicalOpinionCountOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    primaryProfessionalId?: SortOrder
    reviewerProfessionalId?: SortOrder
    diagnosis?: SortOrder
    recommendations?: SortOrder
    riskAssessment?: SortOrder
    additionalTests?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    peerReviewNotes?: SortOrder
    createdAt?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    approvedAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type MedicalOpinionMaxOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    primaryProfessionalId?: SortOrder
    reviewerProfessionalId?: SortOrder
    diagnosis?: SortOrder
    recommendations?: SortOrder
    riskAssessment?: SortOrder
    additionalTests?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    peerReviewNotes?: SortOrder
    createdAt?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    approvedAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type MedicalOpinionMinOrderByAggregateInput = {
    id?: SortOrder
    caseId?: SortOrder
    primaryProfessionalId?: SortOrder
    reviewerProfessionalId?: SortOrder
    diagnosis?: SortOrder
    recommendations?: SortOrder
    riskAssessment?: SortOrder
    additionalTests?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    peerReviewNotes?: SortOrder
    createdAt?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    approvedAt?: SortOrder
    deliveredAt?: SortOrder
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
    professionalId?: SortOrder
    caseId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    initiatedAt?: SortOrder
    processedAt?: SortOrder
  }

  export type ProfessionalPaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ProfessionalPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    caseId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    initiatedAt?: SortOrder
    processedAt?: SortOrder
  }

  export type ProfessionalPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    caseId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    initiatedAt?: SortOrder
    processedAt?: SortOrder
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
    adminId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    permissions?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type AIAnalysisCreateNestedOneWithoutCaseInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput
    connect?: AIAnalysisWhereUniqueInput
  }

  export type CaseAssignmentCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type MedicalOpinionCreateNestedManyWithoutCaseInput = {
    create?: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput> | MedicalOpinionCreateWithoutCaseInput[] | MedicalOpinionUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutCaseInput | MedicalOpinionCreateOrConnectWithoutCaseInput[]
    createMany?: MedicalOpinionCreateManyCaseInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type UploadedFileUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput> | UploadedFileCreateWithoutCaseInput[] | UploadedFileUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: UploadedFileCreateOrConnectWithoutCaseInput | UploadedFileCreateOrConnectWithoutCaseInput[]
    createMany?: UploadedFileCreateManyCaseInputEnvelope
    connect?: UploadedFileWhereUniqueInput | UploadedFileWhereUniqueInput[]
  }

  export type AIAnalysisUncheckedCreateNestedOneWithoutCaseInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput
    connect?: AIAnalysisWhereUniqueInput
  }

  export type CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput> | CaseAssignmentCreateWithoutCaseInput[] | CaseAssignmentUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutCaseInput | CaseAssignmentCreateOrConnectWithoutCaseInput[]
    createMany?: CaseAssignmentCreateManyCaseInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput = {
    create?: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput> | MedicalOpinionCreateWithoutCaseInput[] | MedicalOpinionUncheckedCreateWithoutCaseInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutCaseInput | MedicalOpinionCreateOrConnectWithoutCaseInput[]
    createMany?: MedicalOpinionCreateManyCaseInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
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

  export type AIAnalysisUpdateOneWithoutCaseNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput
    upsert?: AIAnalysisUpsertWithoutCaseInput
    disconnect?: AIAnalysisWhereInput | boolean
    delete?: AIAnalysisWhereInput | boolean
    connect?: AIAnalysisWhereUniqueInput
    update?: XOR<XOR<AIAnalysisUpdateToOneWithWhereWithoutCaseInput, AIAnalysisUpdateWithoutCaseInput>, AIAnalysisUncheckedUpdateWithoutCaseInput>
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

  export type AIAnalysisUncheckedUpdateOneWithoutCaseNestedInput = {
    create?: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
    connectOrCreate?: AIAnalysisCreateOrConnectWithoutCaseInput
    upsert?: AIAnalysisUpsertWithoutCaseInput
    disconnect?: AIAnalysisWhereInput | boolean
    delete?: AIAnalysisWhereInput | boolean
    connect?: AIAnalysisWhereUniqueInput
    update?: XOR<XOR<AIAnalysisUpdateToOneWithWhereWithoutCaseInput, AIAnalysisUpdateWithoutCaseInput>, AIAnalysisUncheckedUpdateWithoutCaseInput>
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

  export type MedicalOpinionCreateNestedManyWithoutPrimaryProfessionalInput = {
    create?: XOR<MedicalOpinionCreateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput> | MedicalOpinionCreateWithoutPrimaryProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput | MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput[]
    createMany?: MedicalOpinionCreateManyPrimaryProfessionalInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type MedicalOpinionCreateNestedManyWithoutReviewerProfessionalInput = {
    create?: XOR<MedicalOpinionCreateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput> | MedicalOpinionCreateWithoutReviewerProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput | MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput[]
    createMany?: MedicalOpinionCreateManyReviewerProfessionalInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type ProfessionalPaymentCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput> | ProfessionalPaymentCreateWithoutProfessionalInput[] | ProfessionalPaymentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutProfessionalInput | ProfessionalPaymentCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalPaymentCreateManyProfessionalInputEnvelope
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
  }

  export type CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput> | CaseAssignmentCreateWithoutProfessionalInput[] | CaseAssignmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CaseAssignmentCreateOrConnectWithoutProfessionalInput | CaseAssignmentCreateOrConnectWithoutProfessionalInput[]
    createMany?: CaseAssignmentCreateManyProfessionalInputEnvelope
    connect?: CaseAssignmentWhereUniqueInput | CaseAssignmentWhereUniqueInput[]
  }

  export type MedicalOpinionUncheckedCreateNestedManyWithoutPrimaryProfessionalInput = {
    create?: XOR<MedicalOpinionCreateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput> | MedicalOpinionCreateWithoutPrimaryProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput | MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput[]
    createMany?: MedicalOpinionCreateManyPrimaryProfessionalInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type MedicalOpinionUncheckedCreateNestedManyWithoutReviewerProfessionalInput = {
    create?: XOR<MedicalOpinionCreateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput> | MedicalOpinionCreateWithoutReviewerProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput | MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput[]
    createMany?: MedicalOpinionCreateManyReviewerProfessionalInputEnvelope
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
  }

  export type ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput> | ProfessionalPaymentCreateWithoutProfessionalInput[] | ProfessionalPaymentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalPaymentCreateOrConnectWithoutProfessionalInput | ProfessionalPaymentCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalPaymentCreateManyProfessionalInputEnvelope
    connect?: ProfessionalPaymentWhereUniqueInput | ProfessionalPaymentWhereUniqueInput[]
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

  export type MedicalOpinionUpdateManyWithoutPrimaryProfessionalNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput> | MedicalOpinionCreateWithoutPrimaryProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput | MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutPrimaryProfessionalInput | MedicalOpinionUpsertWithWhereUniqueWithoutPrimaryProfessionalInput[]
    createMany?: MedicalOpinionCreateManyPrimaryProfessionalInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutPrimaryProfessionalInput | MedicalOpinionUpdateWithWhereUniqueWithoutPrimaryProfessionalInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutPrimaryProfessionalInput | MedicalOpinionUpdateManyWithWhereWithoutPrimaryProfessionalInput[]
    deleteMany?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
  }

  export type MedicalOpinionUpdateManyWithoutReviewerProfessionalNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput> | MedicalOpinionCreateWithoutReviewerProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput | MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutReviewerProfessionalInput | MedicalOpinionUpsertWithWhereUniqueWithoutReviewerProfessionalInput[]
    createMany?: MedicalOpinionCreateManyReviewerProfessionalInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutReviewerProfessionalInput | MedicalOpinionUpdateWithWhereUniqueWithoutReviewerProfessionalInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutReviewerProfessionalInput | MedicalOpinionUpdateManyWithWhereWithoutReviewerProfessionalInput[]
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

  export type MedicalOpinionUncheckedUpdateManyWithoutPrimaryProfessionalNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput> | MedicalOpinionCreateWithoutPrimaryProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput | MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutPrimaryProfessionalInput | MedicalOpinionUpsertWithWhereUniqueWithoutPrimaryProfessionalInput[]
    createMany?: MedicalOpinionCreateManyPrimaryProfessionalInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutPrimaryProfessionalInput | MedicalOpinionUpdateWithWhereUniqueWithoutPrimaryProfessionalInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutPrimaryProfessionalInput | MedicalOpinionUpdateManyWithWhereWithoutPrimaryProfessionalInput[]
    deleteMany?: MedicalOpinionScalarWhereInput | MedicalOpinionScalarWhereInput[]
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutReviewerProfessionalNestedInput = {
    create?: XOR<MedicalOpinionCreateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput> | MedicalOpinionCreateWithoutReviewerProfessionalInput[] | MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput[]
    connectOrCreate?: MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput | MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput[]
    upsert?: MedicalOpinionUpsertWithWhereUniqueWithoutReviewerProfessionalInput | MedicalOpinionUpsertWithWhereUniqueWithoutReviewerProfessionalInput[]
    createMany?: MedicalOpinionCreateManyReviewerProfessionalInputEnvelope
    set?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    disconnect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    delete?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    connect?: MedicalOpinionWhereUniqueInput | MedicalOpinionWhereUniqueInput[]
    update?: MedicalOpinionUpdateWithWhereUniqueWithoutReviewerProfessionalInput | MedicalOpinionUpdateWithWhereUniqueWithoutReviewerProfessionalInput[]
    updateMany?: MedicalOpinionUpdateManyWithWhereWithoutReviewerProfessionalInput | MedicalOpinionUpdateManyWithWhereWithoutReviewerProfessionalInput[]
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

  export type CaseCreateNestedOneWithoutAiAnalysisInput = {
    create?: XOR<CaseCreateWithoutAiAnalysisInput, CaseUncheckedCreateWithoutAiAnalysisInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAiAnalysisInput
    connect?: CaseWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CaseUpdateOneRequiredWithoutAiAnalysisNestedInput = {
    create?: XOR<CaseCreateWithoutAiAnalysisInput, CaseUncheckedCreateWithoutAiAnalysisInput>
    connectOrCreate?: CaseCreateOrConnectWithoutAiAnalysisInput
    upsert?: CaseUpsertWithoutAiAnalysisInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutAiAnalysisInput, CaseUpdateWithoutAiAnalysisInput>, CaseUncheckedUpdateWithoutAiAnalysisInput>
  }

  export type CaseCreateNestedOneWithoutMedicalOpinionsInput = {
    create?: XOR<CaseCreateWithoutMedicalOpinionsInput, CaseUncheckedCreateWithoutMedicalOpinionsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutMedicalOpinionsInput
    connect?: CaseWhereUniqueInput
  }

  export type MedicalProfessionalCreateNestedOneWithoutPrimaryOpinionsInput = {
    create?: XOR<MedicalProfessionalCreateWithoutPrimaryOpinionsInput, MedicalProfessionalUncheckedCreateWithoutPrimaryOpinionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutPrimaryOpinionsInput
    connect?: MedicalProfessionalWhereUniqueInput
  }

  export type MedicalProfessionalCreateNestedOneWithoutReviewedOpinionsInput = {
    create?: XOR<MedicalProfessionalCreateWithoutReviewedOpinionsInput, MedicalProfessionalUncheckedCreateWithoutReviewedOpinionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutReviewedOpinionsInput
    connect?: MedicalProfessionalWhereUniqueInput
  }

  export type CaseUpdateOneRequiredWithoutMedicalOpinionsNestedInput = {
    create?: XOR<CaseCreateWithoutMedicalOpinionsInput, CaseUncheckedCreateWithoutMedicalOpinionsInput>
    connectOrCreate?: CaseCreateOrConnectWithoutMedicalOpinionsInput
    upsert?: CaseUpsertWithoutMedicalOpinionsInput
    connect?: CaseWhereUniqueInput
    update?: XOR<XOR<CaseUpdateToOneWithWhereWithoutMedicalOpinionsInput, CaseUpdateWithoutMedicalOpinionsInput>, CaseUncheckedUpdateWithoutMedicalOpinionsInput>
  }

  export type MedicalProfessionalUpdateOneRequiredWithoutPrimaryOpinionsNestedInput = {
    create?: XOR<MedicalProfessionalCreateWithoutPrimaryOpinionsInput, MedicalProfessionalUncheckedCreateWithoutPrimaryOpinionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutPrimaryOpinionsInput
    upsert?: MedicalProfessionalUpsertWithoutPrimaryOpinionsInput
    connect?: MedicalProfessionalWhereUniqueInput
    update?: XOR<XOR<MedicalProfessionalUpdateToOneWithWhereWithoutPrimaryOpinionsInput, MedicalProfessionalUpdateWithoutPrimaryOpinionsInput>, MedicalProfessionalUncheckedUpdateWithoutPrimaryOpinionsInput>
  }

  export type MedicalProfessionalUpdateOneWithoutReviewedOpinionsNestedInput = {
    create?: XOR<MedicalProfessionalCreateWithoutReviewedOpinionsInput, MedicalProfessionalUncheckedCreateWithoutReviewedOpinionsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutReviewedOpinionsInput
    upsert?: MedicalProfessionalUpsertWithoutReviewedOpinionsInput
    disconnect?: MedicalProfessionalWhereInput | boolean
    delete?: MedicalProfessionalWhereInput | boolean
    connect?: MedicalProfessionalWhereUniqueInput
    update?: XOR<XOR<MedicalProfessionalUpdateToOneWithWhereWithoutReviewedOpinionsInput, MedicalProfessionalUpdateWithoutReviewedOpinionsInput>, MedicalProfessionalUncheckedUpdateWithoutReviewedOpinionsInput>
  }

  export type MedicalProfessionalCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<MedicalProfessionalCreateWithoutPaymentsInput, MedicalProfessionalUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutPaymentsInput
    connect?: MedicalProfessionalWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MedicalProfessionalUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<MedicalProfessionalCreateWithoutPaymentsInput, MedicalProfessionalUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: MedicalProfessionalCreateOrConnectWithoutPaymentsInput
    upsert?: MedicalProfessionalUpsertWithoutPaymentsInput
    connect?: MedicalProfessionalWhereUniqueInput
    update?: XOR<XOR<MedicalProfessionalUpdateToOneWithWhereWithoutPaymentsInput, MedicalProfessionalUpdateWithoutPaymentsInput>, MedicalProfessionalUncheckedUpdateWithoutPaymentsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type CaseCreateWithoutCustomerInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutCustomerInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisUncheckedCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutCustomerInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutCustomerInput, CaseUncheckedCreateWithoutCustomerInput>
  }

  export type CaseCreateManyCustomerInputEnvelope = {
    data: CaseCreateManyCustomerInput | CaseCreateManyCustomerInput[]
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
    customerId?: StringFilter<"Case"> | string
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
    status?: StringFilter<"Case"> | string
    createdAt?: DateTimeFilter<"Case"> | Date | string
    updatedAt?: DateTimeFilter<"Case"> | Date | string
  }

  export type CustomerCreateWithoutCasesInput = {
    id?: string
    customerId?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    phone?: string | null
    preferredContact?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutCasesInput = {
    id?: string
    customerId?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    firstName: string
    middleName?: string | null
    lastName: string
    dateOfBirth: Date | string
    phone?: string | null
    preferredContact?: string
    emailNotifications?: boolean
    smsNotifications?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutCasesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutCasesInput, CustomerUncheckedCreateWithoutCasesInput>
  }

  export type UploadedFileCreateWithoutCaseInput = {
    id?: string
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    category: string
    s3Key?: string | null
    uploadedAt?: Date | string
  }

  export type UploadedFileUncheckedCreateWithoutCaseInput = {
    id?: string
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    category: string
    s3Key?: string | null
    uploadedAt?: Date | string
  }

  export type UploadedFileCreateOrConnectWithoutCaseInput = {
    where: UploadedFileWhereUniqueInput
    create: XOR<UploadedFileCreateWithoutCaseInput, UploadedFileUncheckedCreateWithoutCaseInput>
  }

  export type UploadedFileCreateManyCaseInputEnvelope = {
    data: UploadedFileCreateManyCaseInput | UploadedFileCreateManyCaseInput[]
  }

  export type AIAnalysisCreateWithoutCaseInput = {
    id?: string
    analysisType: string
    findings: string
    confidence?: number | null
    initiatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIAnalysisUncheckedCreateWithoutCaseInput = {
    id?: string
    analysisType: string
    findings: string
    confidence?: number | null
    initiatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AIAnalysisCreateOrConnectWithoutCaseInput = {
    where: AIAnalysisWhereUniqueInput
    create: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
  }

  export type CaseAssignmentCreateWithoutCaseInput = {
    id?: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    professional: MedicalProfessionalCreateNestedOneWithoutCaseAssignmentsInput
  }

  export type CaseAssignmentUncheckedCreateWithoutCaseInput = {
    id?: string
    professionalId: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type CaseAssignmentCreateOrConnectWithoutCaseInput = {
    where: CaseAssignmentWhereUniqueInput
    create: XOR<CaseAssignmentCreateWithoutCaseInput, CaseAssignmentUncheckedCreateWithoutCaseInput>
  }

  export type CaseAssignmentCreateManyCaseInputEnvelope = {
    data: CaseAssignmentCreateManyCaseInput | CaseAssignmentCreateManyCaseInput[]
  }

  export type MedicalOpinionCreateWithoutCaseInput = {
    id?: string
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
    primaryProfessional: MedicalProfessionalCreateNestedOneWithoutPrimaryOpinionsInput
    reviewerProfessional?: MedicalProfessionalCreateNestedOneWithoutReviewedOpinionsInput
  }

  export type MedicalOpinionUncheckedCreateWithoutCaseInput = {
    id?: string
    primaryProfessionalId: string
    reviewerProfessionalId?: string | null
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type MedicalOpinionCreateOrConnectWithoutCaseInput = {
    where: MedicalOpinionWhereUniqueInput
    create: XOR<MedicalOpinionCreateWithoutCaseInput, MedicalOpinionUncheckedCreateWithoutCaseInput>
  }

  export type MedicalOpinionCreateManyCaseInputEnvelope = {
    data: MedicalOpinionCreateManyCaseInput | MedicalOpinionCreateManyCaseInput[]
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
    customerId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContact?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    middleName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    preferredContact?: StringFieldUpdateOperationsInput | string
    emailNotifications?: BoolFieldUpdateOperationsInput | boolean
    smsNotifications?: BoolFieldUpdateOperationsInput | boolean
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
    fileName?: StringFilter<"UploadedFile"> | string
    originalName?: StringFilter<"UploadedFile"> | string
    fileSize?: IntFilter<"UploadedFile"> | number
    mimeType?: StringFilter<"UploadedFile"> | string
    category?: StringFilter<"UploadedFile"> | string
    s3Key?: StringNullableFilter<"UploadedFile"> | string | null
    uploadedAt?: DateTimeFilter<"UploadedFile"> | Date | string
  }

  export type AIAnalysisUpsertWithoutCaseInput = {
    update: XOR<AIAnalysisUpdateWithoutCaseInput, AIAnalysisUncheckedUpdateWithoutCaseInput>
    create: XOR<AIAnalysisCreateWithoutCaseInput, AIAnalysisUncheckedCreateWithoutCaseInput>
    where?: AIAnalysisWhereInput
  }

  export type AIAnalysisUpdateToOneWithWhereWithoutCaseInput = {
    where?: AIAnalysisWhereInput
    data: XOR<AIAnalysisUpdateWithoutCaseInput, AIAnalysisUncheckedUpdateWithoutCaseInput>
  }

  export type AIAnalysisUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AIAnalysisUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisType?: StringFieldUpdateOperationsInput | string
    findings?: StringFieldUpdateOperationsInput | string
    confidence?: NullableFloatFieldUpdateOperationsInput | number | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    assignedBy?: StringFilter<"CaseAssignment"> | string
    assignedAt?: DateTimeFilter<"CaseAssignment"> | Date | string
    status?: StringFilter<"CaseAssignment"> | string
    startedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CaseAssignment"> | Date | string | null
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
    primaryProfessionalId?: StringFilter<"MedicalOpinion"> | string
    reviewerProfessionalId?: StringNullableFilter<"MedicalOpinion"> | string | null
    diagnosis?: StringNullableFilter<"MedicalOpinion"> | string | null
    recommendations?: StringFilter<"MedicalOpinion"> | string
    riskAssessment?: StringNullableFilter<"MedicalOpinion"> | string | null
    additionalTests?: StringNullableFilter<"MedicalOpinion"> | string | null
    notes?: StringNullableFilter<"MedicalOpinion"> | string | null
    status?: StringFilter<"MedicalOpinion"> | string
    peerReviewNotes?: StringNullableFilter<"MedicalOpinion"> | string | null
    createdAt?: DateTimeFilter<"MedicalOpinion"> | Date | string
    submittedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    reviewedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    approvedAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"MedicalOpinion"> | Date | string | null
  }

  export type CaseCreateWithoutUploadedFilesInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    aiAnalysis?: AIAnalysisCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutUploadedFilesInput = {
    id?: string
    caseNumber?: string
    customerId: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiAnalysis?: AIAnalysisUncheckedCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    aiAnalysis?: AIAnalysisUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutUploadedFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiAnalysis?: AIAnalysisUncheckedUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseAssignmentCreateWithoutProfessionalInput = {
    id?: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    case: CaseCreateNestedOneWithoutCaseAssignmentsInput
  }

  export type CaseAssignmentUncheckedCreateWithoutProfessionalInput = {
    id?: string
    caseId: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type CaseAssignmentCreateOrConnectWithoutProfessionalInput = {
    where: CaseAssignmentWhereUniqueInput
    create: XOR<CaseAssignmentCreateWithoutProfessionalInput, CaseAssignmentUncheckedCreateWithoutProfessionalInput>
  }

  export type CaseAssignmentCreateManyProfessionalInputEnvelope = {
    data: CaseAssignmentCreateManyProfessionalInput | CaseAssignmentCreateManyProfessionalInput[]
  }

  export type MedicalOpinionCreateWithoutPrimaryProfessionalInput = {
    id?: string
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
    case: CaseCreateNestedOneWithoutMedicalOpinionsInput
    reviewerProfessional?: MedicalProfessionalCreateNestedOneWithoutReviewedOpinionsInput
  }

  export type MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput = {
    id?: string
    caseId: string
    reviewerProfessionalId?: string | null
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type MedicalOpinionCreateOrConnectWithoutPrimaryProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    create: XOR<MedicalOpinionCreateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput>
  }

  export type MedicalOpinionCreateManyPrimaryProfessionalInputEnvelope = {
    data: MedicalOpinionCreateManyPrimaryProfessionalInput | MedicalOpinionCreateManyPrimaryProfessionalInput[]
  }

  export type MedicalOpinionCreateWithoutReviewerProfessionalInput = {
    id?: string
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
    case: CaseCreateNestedOneWithoutMedicalOpinionsInput
    primaryProfessional: MedicalProfessionalCreateNestedOneWithoutPrimaryOpinionsInput
  }

  export type MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput = {
    id?: string
    caseId: string
    primaryProfessionalId: string
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type MedicalOpinionCreateOrConnectWithoutReviewerProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    create: XOR<MedicalOpinionCreateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput>
  }

  export type MedicalOpinionCreateManyReviewerProfessionalInputEnvelope = {
    data: MedicalOpinionCreateManyReviewerProfessionalInput | MedicalOpinionCreateManyReviewerProfessionalInput[]
  }

  export type ProfessionalPaymentCreateWithoutProfessionalInput = {
    id?: string
    caseId?: string | null
    amount: number
    currency?: string
    paymentType: string
    paymentMethod: string
    status?: string
    transactionId?: string | null
    initiatedAt?: Date | string
    processedAt?: Date | string | null
  }

  export type ProfessionalPaymentUncheckedCreateWithoutProfessionalInput = {
    id?: string
    caseId?: string | null
    amount: number
    currency?: string
    paymentType: string
    paymentMethod: string
    status?: string
    transactionId?: string | null
    initiatedAt?: Date | string
    processedAt?: Date | string | null
  }

  export type ProfessionalPaymentCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalPaymentWhereUniqueInput
    create: XOR<ProfessionalPaymentCreateWithoutProfessionalInput, ProfessionalPaymentUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalPaymentCreateManyProfessionalInputEnvelope = {
    data: ProfessionalPaymentCreateManyProfessionalInput | ProfessionalPaymentCreateManyProfessionalInput[]
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

  export type MedicalOpinionUpsertWithWhereUniqueWithoutPrimaryProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    update: XOR<MedicalOpinionUpdateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedUpdateWithoutPrimaryProfessionalInput>
    create: XOR<MedicalOpinionCreateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedCreateWithoutPrimaryProfessionalInput>
  }

  export type MedicalOpinionUpdateWithWhereUniqueWithoutPrimaryProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    data: XOR<MedicalOpinionUpdateWithoutPrimaryProfessionalInput, MedicalOpinionUncheckedUpdateWithoutPrimaryProfessionalInput>
  }

  export type MedicalOpinionUpdateManyWithWhereWithoutPrimaryProfessionalInput = {
    where: MedicalOpinionScalarWhereInput
    data: XOR<MedicalOpinionUpdateManyMutationInput, MedicalOpinionUncheckedUpdateManyWithoutPrimaryProfessionalInput>
  }

  export type MedicalOpinionUpsertWithWhereUniqueWithoutReviewerProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    update: XOR<MedicalOpinionUpdateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedUpdateWithoutReviewerProfessionalInput>
    create: XOR<MedicalOpinionCreateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedCreateWithoutReviewerProfessionalInput>
  }

  export type MedicalOpinionUpdateWithWhereUniqueWithoutReviewerProfessionalInput = {
    where: MedicalOpinionWhereUniqueInput
    data: XOR<MedicalOpinionUpdateWithoutReviewerProfessionalInput, MedicalOpinionUncheckedUpdateWithoutReviewerProfessionalInput>
  }

  export type MedicalOpinionUpdateManyWithWhereWithoutReviewerProfessionalInput = {
    where: MedicalOpinionScalarWhereInput
    data: XOR<MedicalOpinionUpdateManyMutationInput, MedicalOpinionUncheckedUpdateManyWithoutReviewerProfessionalInput>
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

  export type ProfessionalPaymentScalarWhereInput = {
    AND?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
    OR?: ProfessionalPaymentScalarWhereInput[]
    NOT?: ProfessionalPaymentScalarWhereInput | ProfessionalPaymentScalarWhereInput[]
    id?: StringFilter<"ProfessionalPayment"> | string
    professionalId?: StringFilter<"ProfessionalPayment"> | string
    caseId?: StringNullableFilter<"ProfessionalPayment"> | string | null
    amount?: FloatFilter<"ProfessionalPayment"> | number
    currency?: StringFilter<"ProfessionalPayment"> | string
    paymentType?: StringFilter<"ProfessionalPayment"> | string
    paymentMethod?: StringFilter<"ProfessionalPayment"> | string
    status?: StringFilter<"ProfessionalPayment"> | string
    transactionId?: StringNullableFilter<"ProfessionalPayment"> | string | null
    initiatedAt?: DateTimeFilter<"ProfessionalPayment"> | Date | string
    processedAt?: DateTimeNullableFilter<"ProfessionalPayment"> | Date | string | null
  }

  export type CaseCreateWithoutCaseAssignmentsInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisCreateNestedOneWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutCaseAssignmentsInput = {
    id?: string
    caseNumber?: string
    customerId: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisUncheckedCreateNestedOneWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutCaseAssignmentsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutCaseAssignmentsInput, CaseUncheckedCreateWithoutCaseAssignmentsInput>
  }

  export type MedicalProfessionalCreateWithoutCaseAssignmentsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    primaryOpinions?: MedicalOpinionCreateNestedManyWithoutPrimaryProfessionalInput
    reviewedOpinions?: MedicalOpinionCreateNestedManyWithoutReviewerProfessionalInput
    payments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutCaseAssignmentsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    primaryOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutPrimaryProfessionalInput
    reviewedOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutReviewerProfessionalInput
    payments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUpdateOneWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutCaseAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUncheckedUpdateOneWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
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
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryOpinions?: MedicalOpinionUpdateManyWithoutPrimaryProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUpdateManyWithoutReviewerProfessionalNestedInput
    payments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutCaseAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryOpinions?: MedicalOpinionUncheckedUpdateManyWithoutPrimaryProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUncheckedUpdateManyWithoutReviewerProfessionalNestedInput
    payments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CaseCreateWithoutAiAnalysisInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutAiAnalysisInput = {
    id?: string
    caseNumber?: string
    customerId: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
    medicalOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutAiAnalysisInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutAiAnalysisInput, CaseUncheckedCreateWithoutAiAnalysisInput>
  }

  export type CaseUpsertWithoutAiAnalysisInput = {
    update: XOR<CaseUpdateWithoutAiAnalysisInput, CaseUncheckedUpdateWithoutAiAnalysisInput>
    create: XOR<CaseCreateWithoutAiAnalysisInput, CaseUncheckedCreateWithoutAiAnalysisInput>
    where?: CaseWhereInput
  }

  export type CaseUpdateToOneWithWhereWithoutAiAnalysisInput = {
    where?: CaseWhereInput
    data: XOR<CaseUpdateWithoutAiAnalysisInput, CaseUncheckedUpdateWithoutAiAnalysisInput>
  }

  export type CaseUpdateWithoutAiAnalysisInput = {
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutAiAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type CaseCreateWithoutMedicalOpinionsInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutCasesInput
    uploadedFiles?: UploadedFileCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutCaseInput
  }

  export type CaseUncheckedCreateWithoutMedicalOpinionsInput = {
    id?: string
    caseNumber?: string
    customerId: string
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
    consentAccepted?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutCaseInput
    aiAnalysis?: AIAnalysisUncheckedCreateNestedOneWithoutCaseInput
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutCaseInput
  }

  export type CaseCreateOrConnectWithoutMedicalOpinionsInput = {
    where: CaseWhereUniqueInput
    create: XOR<CaseCreateWithoutMedicalOpinionsInput, CaseUncheckedCreateWithoutMedicalOpinionsInput>
  }

  export type MedicalProfessionalCreateWithoutPrimaryOpinionsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    reviewedOpinions?: MedicalOpinionCreateNestedManyWithoutReviewerProfessionalInput
    payments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutPrimaryOpinionsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    reviewedOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutReviewerProfessionalInput
    payments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalCreateOrConnectWithoutPrimaryOpinionsInput = {
    where: MedicalProfessionalWhereUniqueInput
    create: XOR<MedicalProfessionalCreateWithoutPrimaryOpinionsInput, MedicalProfessionalUncheckedCreateWithoutPrimaryOpinionsInput>
  }

  export type MedicalProfessionalCreateWithoutReviewedOpinionsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    primaryOpinions?: MedicalOpinionCreateNestedManyWithoutPrimaryProfessionalInput
    payments?: ProfessionalPaymentCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutReviewedOpinionsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    primaryOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutPrimaryProfessionalInput
    payments?: ProfessionalPaymentUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type MedicalProfessionalCreateOrConnectWithoutReviewedOpinionsInput = {
    where: MedicalProfessionalWhereUniqueInput
    create: XOR<MedicalProfessionalCreateWithoutReviewedOpinionsInput, MedicalProfessionalUncheckedCreateWithoutReviewedOpinionsInput>
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutCasesNestedInput
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
  }

  export type CaseUncheckedUpdateWithoutMedicalOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseNumber?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUncheckedUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
  }

  export type MedicalProfessionalUpsertWithoutPrimaryOpinionsInput = {
    update: XOR<MedicalProfessionalUpdateWithoutPrimaryOpinionsInput, MedicalProfessionalUncheckedUpdateWithoutPrimaryOpinionsInput>
    create: XOR<MedicalProfessionalCreateWithoutPrimaryOpinionsInput, MedicalProfessionalUncheckedCreateWithoutPrimaryOpinionsInput>
    where?: MedicalProfessionalWhereInput
  }

  export type MedicalProfessionalUpdateToOneWithWhereWithoutPrimaryOpinionsInput = {
    where?: MedicalProfessionalWhereInput
    data: XOR<MedicalProfessionalUpdateWithoutPrimaryOpinionsInput, MedicalProfessionalUncheckedUpdateWithoutPrimaryOpinionsInput>
  }

  export type MedicalProfessionalUpdateWithoutPrimaryOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUpdateManyWithoutReviewerProfessionalNestedInput
    payments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutPrimaryOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUncheckedUpdateManyWithoutReviewerProfessionalNestedInput
    payments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUpsertWithoutReviewedOpinionsInput = {
    update: XOR<MedicalProfessionalUpdateWithoutReviewedOpinionsInput, MedicalProfessionalUncheckedUpdateWithoutReviewedOpinionsInput>
    create: XOR<MedicalProfessionalCreateWithoutReviewedOpinionsInput, MedicalProfessionalUncheckedCreateWithoutReviewedOpinionsInput>
    where?: MedicalProfessionalWhereInput
  }

  export type MedicalProfessionalUpdateToOneWithWhereWithoutReviewedOpinionsInput = {
    where?: MedicalProfessionalWhereInput
    data: XOR<MedicalProfessionalUpdateWithoutReviewedOpinionsInput, MedicalProfessionalUncheckedUpdateWithoutReviewedOpinionsInput>
  }

  export type MedicalProfessionalUpdateWithoutReviewedOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    primaryOpinions?: MedicalOpinionUpdateManyWithoutPrimaryProfessionalNestedInput
    payments?: ProfessionalPaymentUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutReviewedOpinionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    primaryOpinions?: MedicalOpinionUncheckedUpdateManyWithoutPrimaryProfessionalNestedInput
    payments?: ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type MedicalProfessionalCreateWithoutPaymentsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentCreateNestedManyWithoutProfessionalInput
    primaryOpinions?: MedicalOpinionCreateNestedManyWithoutPrimaryProfessionalInput
    reviewedOpinions?: MedicalOpinionCreateNestedManyWithoutReviewerProfessionalInput
  }

  export type MedicalProfessionalUncheckedCreateWithoutPaymentsInput = {
    id?: string
    professionalId?: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    licenseNumber: string
    specialty: string
    yearsExperience: number
    qualifications: string
    vettingStatus?: string
    vettedBy?: string | null
    vettedAt?: Date | string | null
    appliedAt?: Date | string
    updatedAt?: Date | string
    caseAssignments?: CaseAssignmentUncheckedCreateNestedManyWithoutProfessionalInput
    primaryOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutPrimaryProfessionalInput
    reviewedOpinions?: MedicalOpinionUncheckedCreateNestedManyWithoutReviewerProfessionalInput
  }

  export type MedicalProfessionalCreateOrConnectWithoutPaymentsInput = {
    where: MedicalProfessionalWhereUniqueInput
    create: XOR<MedicalProfessionalCreateWithoutPaymentsInput, MedicalProfessionalUncheckedCreateWithoutPaymentsInput>
  }

  export type MedicalProfessionalUpsertWithoutPaymentsInput = {
    update: XOR<MedicalProfessionalUpdateWithoutPaymentsInput, MedicalProfessionalUncheckedUpdateWithoutPaymentsInput>
    create: XOR<MedicalProfessionalCreateWithoutPaymentsInput, MedicalProfessionalUncheckedCreateWithoutPaymentsInput>
    where?: MedicalProfessionalWhereInput
  }

  export type MedicalProfessionalUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: MedicalProfessionalWhereInput
    data: XOR<MedicalProfessionalUpdateWithoutPaymentsInput, MedicalProfessionalUncheckedUpdateWithoutPaymentsInput>
  }

  export type MedicalProfessionalUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUpdateManyWithoutProfessionalNestedInput
    primaryOpinions?: MedicalOpinionUpdateManyWithoutPrimaryProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUpdateManyWithoutReviewerProfessionalNestedInput
  }

  export type MedicalProfessionalUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    licenseNumber?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    yearsExperience?: IntFieldUpdateOperationsInput | number
    qualifications?: StringFieldUpdateOperationsInput | string
    vettingStatus?: StringFieldUpdateOperationsInput | string
    vettedBy?: NullableStringFieldUpdateOperationsInput | string | null
    vettedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    appliedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutProfessionalNestedInput
    primaryOpinions?: MedicalOpinionUncheckedUpdateManyWithoutPrimaryProfessionalNestedInput
    reviewedOpinions?: MedicalOpinionUncheckedUpdateManyWithoutReviewerProfessionalNestedInput
  }

  export type CaseCreateManyCustomerInput = {
    id?: string
    caseNumber?: string
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
    consentAccepted?: boolean
    status?: string
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUpdateManyWithoutCaseNestedInput
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutCaseNestedInput
    aiAnalysis?: AIAnalysisUncheckedUpdateOneWithoutCaseNestedInput
    caseAssignments?: CaseAssignmentUncheckedUpdateManyWithoutCaseNestedInput
    medicalOpinions?: MedicalOpinionUncheckedUpdateManyWithoutCaseNestedInput
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
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileCreateManyCaseInput = {
    id?: string
    fileName: string
    originalName: string
    fileSize: number
    mimeType: string
    category: string
    s3Key?: string | null
    uploadedAt?: Date | string
  }

  export type CaseAssignmentCreateManyCaseInput = {
    id?: string
    professionalId: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type MedicalOpinionCreateManyCaseInput = {
    id?: string
    primaryProfessionalId: string
    reviewerProfessionalId?: string | null
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type UploadedFileUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedFileUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseAssignmentUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    professional?: MedicalProfessionalUpdateOneRequiredWithoutCaseAssignmentsNestedInput
  }

  export type CaseAssignmentUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    primaryProfessional?: MedicalProfessionalUpdateOneRequiredWithoutPrimaryOpinionsNestedInput
    reviewerProfessional?: MedicalProfessionalUpdateOneWithoutReviewedOpinionsNestedInput
  }

  export type MedicalOpinionUncheckedUpdateWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryProfessionalId?: StringFieldUpdateOperationsInput | string
    reviewerProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutCaseInput = {
    id?: StringFieldUpdateOperationsInput | string
    primaryProfessionalId?: StringFieldUpdateOperationsInput | string
    reviewerProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentCreateManyProfessionalInput = {
    id?: string
    caseId: string
    assignedBy: string
    assignedAt?: Date | string
    status?: string
    startedAt?: Date | string | null
    completedAt?: Date | string | null
  }

  export type MedicalOpinionCreateManyPrimaryProfessionalInput = {
    id?: string
    caseId: string
    reviewerProfessionalId?: string | null
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type MedicalOpinionCreateManyReviewerProfessionalInput = {
    id?: string
    caseId: string
    primaryProfessionalId: string
    diagnosis?: string | null
    recommendations: string
    riskAssessment?: string | null
    additionalTests?: string | null
    notes?: string | null
    status?: string
    peerReviewNotes?: string | null
    createdAt?: Date | string
    submittedAt?: Date | string | null
    reviewedAt?: Date | string | null
    approvedAt?: Date | string | null
    deliveredAt?: Date | string | null
  }

  export type ProfessionalPaymentCreateManyProfessionalInput = {
    id?: string
    caseId?: string | null
    amount: number
    currency?: string
    paymentType: string
    paymentMethod: string
    status?: string
    transactionId?: string | null
    initiatedAt?: Date | string
    processedAt?: Date | string | null
  }

  export type CaseAssignmentUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutCaseAssignmentsNestedInput
  }

  export type CaseAssignmentUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CaseAssignmentUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    assignedBy?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUpdateWithoutPrimaryProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutMedicalOpinionsNestedInput
    reviewerProfessional?: MedicalProfessionalUpdateOneWithoutReviewedOpinionsNestedInput
  }

  export type MedicalOpinionUncheckedUpdateWithoutPrimaryProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    reviewerProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutPrimaryProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    reviewerProfessionalId?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUpdateWithoutReviewerProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    case?: CaseUpdateOneRequiredWithoutMedicalOpinionsNestedInput
    primaryProfessional?: MedicalProfessionalUpdateOneRequiredWithoutPrimaryOpinionsNestedInput
  }

  export type MedicalOpinionUncheckedUpdateWithoutReviewerProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    primaryProfessionalId?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalOpinionUncheckedUpdateManyWithoutReviewerProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: StringFieldUpdateOperationsInput | string
    primaryProfessionalId?: StringFieldUpdateOperationsInput | string
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: StringFieldUpdateOperationsInput | string
    riskAssessment?: NullableStringFieldUpdateOperationsInput | string | null
    additionalTests?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    peerReviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfessionalPaymentUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfessionalPaymentUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProfessionalPaymentUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    caseId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentType?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    initiatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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