import { Link } from "react-router-dom";
import { type Post } from "../data/posts";

export default function PostCard({ post, selected, setSelected }: { post: Post, selected: number, setSelected: any }) {
    const c = selected == post.id ? 
        'py-1 rounded-md ring-2 text-white ring-blue-500 bg-blue-500'
        :
        'py-1 rounded-md text-blue-400 ring-2 ring-blue-500 hover:bg-blue-500 hover:text-white';
    

    return (
        <Link key={post.id} to={post.id.toString()} onClick={() => setSelected(post.id)} className="grow basis-1/4 px-2">
            <div className={c}>
                <p className="text-center font-semibold">{post.title}</p>
            </div>   
        </Link>
    );
}