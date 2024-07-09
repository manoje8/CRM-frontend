const Container = (param) => (
    <div className="container-fluid">
        <div className="inner-container">
            {param.children}
        </div>
    </div>
)

export default Container