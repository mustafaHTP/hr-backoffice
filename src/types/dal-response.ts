export class DalResponse<T> {
  private readonly _success: boolean;
  private readonly _data: T | null | undefined;
  private readonly _error: string | null | undefined;

  private constructor(
    success: boolean,
    data?: T | null,
    error?: string | null,
  ) {
    this._success = success;
    this._data = data;
    this._error = error;
  }

  public static success<T>(data?: T | null) {
    return new DalResponse<T>(true, data ?? null, null);
  }

  public static failure<T>(error?: string | null) {
    return new DalResponse<T>(false, null, error ?? null);
  }

  public isSuccess(): boolean {
    return this._success;
  }

  public getData(): T | null | undefined {
    return this._data;
  }

  public getError(): string | null | undefined {
    return this._error;
  }
}
