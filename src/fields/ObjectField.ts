import { FieldModel, FieldModelOptions, FieldType } from "./model";

export type ObjectFieldModel = {
    [s: string]: FieldModel<unknown>;
};

export class ObjectField<T extends ObjectFieldModel> extends FieldModel<ObjectFieldType<T>> {
    model: T;

    constructor(model: T, options?: FieldModelOptions<ObjectFieldType<T>>) {
        super(options);

        this.model = model;
    }

    override create(value: ObjectFieldType<T>): ObjectFieldType<T> {
        if (!this.validate(value)) {
            throw new TypeError();
        }

        return value;
    }

    override validate(value: unknown): value is ObjectFieldType<T> {
        return value !== null && typeof value === "object" && Object.entries(value).every(([key, val]) => this.model[key as keyof T]?.validate(val));
    }
}

export type ObjectFieldType<T extends ObjectFieldModel> = {
    [K in keyof T]: FieldType<T[K]>;
};
