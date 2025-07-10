import { posts } from "../data/posts";
import PostCard from "../components/PostCard";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Posts(){
    const [selected, setSelected] = useState(0)

    return (
        <>
        <div className="flex flex-row flex-wrap w-[50vw] mx-auto mt-8">
            {posts.map(post => (<PostCard post={post} selected={selected} setSelected={setSelected} />))}
        </div>

        <Outlet />
        </>
    );
}