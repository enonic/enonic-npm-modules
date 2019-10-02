export const EnonicContext = React.createContext();

export const EnonicProvider = ({
	children,
	initialState,
	reducer
}) => <EnonicContext.Provider
	value={React.useReducer(reducer, initialState)}
>{children}</EnonicContext.Provider>;

export const getEnonicContext = () => React.useContext(EnonicContext);
