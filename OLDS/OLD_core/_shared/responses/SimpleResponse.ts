export class SimpleResponse {
    success: boolean = false;
    alertErrorMessage: string = '';

    constructor(options?: Partial<SimpleResponse>) {
        Object.assign(this, options);
    }
}