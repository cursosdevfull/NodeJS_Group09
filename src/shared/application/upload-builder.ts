export class UploadBuilder {
  private _fieldName: string;
  private _maxFieldSize: number;
  private _directory: string;
  private _isPublic: boolean;
  private _mimeTypesAllowed: string[];

  get fieldName(): string {
    return this._fieldName;
  }

  get maxFileSize(): number {
    return this._maxFieldSize;
  }

  get directory(): string {
    return this._directory;
  }

  get isPublic(): boolean {
    return this._isPublic;
  }

  get mimeTypesAllowed(): string[] {
    return this._mimeTypesAllowed;
  }

  addFieldName(fieldName: string): UploadBuilder {
    this._fieldName = fieldName;
    return this;
  }

  addMaxFileSize(maxFileSize: number): UploadBuilder {
    this._maxFieldSize = maxFileSize;
    return this;
  }

  addDirectory(directory: string): UploadBuilder {
    this._directory = directory;
    return this;
  }

  addIsPublic(isPublic: boolean): UploadBuilder {
    this._isPublic = isPublic;
    return this;
  }

  addMimeTypesAllowed(mimeTypesAllowed: string[]): UploadBuilder {
    this._mimeTypesAllowed = mimeTypesAllowed;
    return this;
  }

  build(): UploadOptions {
    return new UploadOptions(this);
  }
}

export class UploadOptions {
  readonly fieldName: string;
  readonly maxFieldSize: number;
  readonly directory: string;
  readonly isPublic: boolean;
  readonly mimeTypesAllowed: string[];

  constructor(ub: UploadBuilder) {
    this.fieldName = ub.fieldName;
    this.maxFieldSize = ub.maxFileSize;
    this.directory = ub.directory;
    this.isPublic = ub.isPublic;
    this.mimeTypesAllowed = ub.mimeTypesAllowed;
  }
}
