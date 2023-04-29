
test('add', () => {
 let url = new URL("C:\\Users\\neo\\Desktop\\workspace\\index#\\widget?param1=test&param2=test");
 console.log(url.hash)
})

test('SearchParams', () => {
    const searchParams = new URLSearchParams();
    searchParams.append("id", "1234");
    searchParams.append("name", "package");
    searchParams.append("package", "com.example");
    console.log(`${searchParams}`);
})
