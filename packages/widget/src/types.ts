export type Theme = 'light' | 'dark'

export type ConnectAction = (() => void) | ((show: boolean) => void) | undefined

export type WidgetStatus = 'idle' | 'active' | 'error' | 'success'
