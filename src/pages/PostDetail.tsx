import { useParams } from "react-router-dom";
import { posts } from "../data/posts";

export default function PostDetail() {
    const { id } = useParams();
    const post = posts.find(post => post.id == Number(id))

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg ">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{post?.title}</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{post?.content}</p>
                </div>
            </div>
        </div>

    );
}