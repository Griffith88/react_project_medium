import ErrorMessage from "../errorMessage/ErrorMessage"
import {Link} from 'react-router-dom'
const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p>Back to main page</p>
        </div>
    )
}

export default Page404;