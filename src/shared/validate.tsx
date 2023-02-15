import _ from 'lodash'

interface FData {
    [k: string]: JSONValue
}
type Rule<T> = {
    key: keyof T,
    message?: string
} & ({ type: 'required', value: boolean } | { type: 'pattern', value: RegExp, message: string } | {type: 'notEqual',value: JSONValue})

type Rules<T> = Rule<T>[]

export type { Rules, Rule, FData }

export const  validate = <T extends FData>(Rules: Rules<T>, formData: T) => {
    type Errors = {
        [k in keyof T]?: string[]
    }
    const errors: Errors = {}
    Rules.forEach((Rule) => {
        const { type, value, key, message } = Rule

        const itemValue = formData[key]
        switch (type) {
            case "pattern":
                if (itemValue && !value.test(itemValue.toString())) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                }
                break;
            case 'notEqual':
                console.log(key,itemValue,value)
                if(value!==undefined && value===itemValue){
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message||'值不能为'+value)
                }
                break;
            case "required":
                if (value && typeof itemValue === 'object'?_.isEmpty(itemValue):_.isUndefined(itemValue)) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message||'必填')
                }
                break;
            default:
                return
        }
    })
    return errors
}

export const judgeError = (errors:Record<string, string[]>)=>{
    return Object.values(errors).flat().join('')
}
