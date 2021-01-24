import app from './src/app'; 

const server = app.listen(app.get('port'), () => {
    console.log(
        `App is running on http://localhost:${app.get('port')}`,
    );
});

export default server;
