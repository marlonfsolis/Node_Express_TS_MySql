export interface IOutputResult {
    success: boolean,
    msg: string,
    errorLogId: number,
    recordCount: number
}

export interface ISqlResultRow{
    '@result':string
}

// todo: Make it generic to get one/more outputs. Check how is the return if we ask for more than one output param.
export function getOutputResult(rowData:any): IOutputResult {
    return JSON.parse(rowData[0]["@result"]);
}

export function getData<Type>(rows:any) {
    return rows[0] as Type;
}
