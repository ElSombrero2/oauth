

export const RouterGuard = ({children, handler, action}: {children: JSX.Element, action: () => void, handler: () => void}) => {

    if(!handler) action()
    
    return (
        <div>
            {children}
        </div>
    )
}