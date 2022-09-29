interface FData {
    [k: string]: string | number | null | undefined | FData
}
type Rule<T> = {
    key: keyof T,
    message?: string
} & ({ type: 'required', value: boolean } | { type: 'pattern', value: RegExp, message: string })

type Rules<T> = Rule<T>[]

export type { Rules, Rule, FData }

export const validate = <T extends FData>(Rules: Rules<T>, formData: T) => {
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
            case "required":
                if (value && (!itemValue || itemValue === null)) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push('必填')
                }
                break;
            default:
                return
        }
    })
    return errors
}