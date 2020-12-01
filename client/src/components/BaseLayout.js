import { React } from 'react'

function BaseLayout(props){
    

    return(
        <div>
            <header>
                Header
            </header>
            {props.children}
            <footer>
                Footer
            </footer>
        </div>
    )
}

export default BaseLayout