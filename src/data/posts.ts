export interface Post{
    id: number;
    title: string;
    content: string;
    image: string;
}

export const posts = [
    {id: 1, title: 'Post1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.', image: '/example.png'},
    {id: 2, title: 'Post2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.', image: '/example.png'},
    {id: 3, title: 'Post3', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.', image: '/example.png'},
    {id: 4, title: 'Post4', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum ullamcorper nunc, sed aliquet enim tincidunt vel. Curabitur dictum quis metus vitae imperdiet. Sed quis massa ipsum. Mauris volutpat elit eu quam consectetur, et condimentum felis tincidunt. Integer a nunc augue. Nunc id est placerat, dignissim metus at, laoreet lorem. Morbi in consequat lorem, at blandit eros.', image: '/example.png'},
];