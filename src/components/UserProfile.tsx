import { RepositoryOwner} from "../types/interfaces.ts";

type RepositoryOwnerProps = {
    owner: RepositoryOwner;
};
/**
 * UserProfile component displays GitHub user information
 *
 * @param {object} props - component props <br/>
 * @param {RepositoryOwner} props.owner - GitHub repository owner information including avatar and username <br/>
 */
const UserProfile = ({ owner }: RepositoryOwnerProps) => {

    return (

        <div className="user-profile">
            <img
                src={owner?.avatar_url}
                alt="GitHub avatar"
                className="avatar"
            />
            <div>
                <h2>{owner?.login}</h2>

            </div>
        </div>
    );
};
export default UserProfile;