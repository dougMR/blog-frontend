import {useSearchParams} from 'react-router-dom';

const SetPassword = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const resetToken = queryParams.get("token");
    return (
        <div>
            <h1>Set Password</h1>
            {resetToken}
        </div>
    )
}

export default SetPassword;