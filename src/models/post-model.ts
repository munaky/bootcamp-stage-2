export interface Post{
    id: number,
    title: string,
    content: string,
}

export let posts: Post[] = [
    {
        id: 1,
        title: 'judul1',
        content: 'content1'
    },
    {
        id: 2,
        title: 'judul2',
        content: 'content2'
    }
];