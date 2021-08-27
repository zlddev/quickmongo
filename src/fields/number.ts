import { FieldModel, FieldModelOptions } from "./";

export class NumberField extends FieldModel<number> {
    constructor(options?: FieldModelOptions<number>) {
        super(options);
    }

    override validate(value: unknown): value is number {
        return typeof value === "number";
    }
}
