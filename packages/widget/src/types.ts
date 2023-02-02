export type Theme = 'light' | 'dark'

export type ConnectAction = (() => void) | ((show: boolean) => void) | undefined
