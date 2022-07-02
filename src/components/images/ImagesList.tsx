import useImages from './useImages';
import {
    useTheme,
    Stack,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
} from '@mui/material';
const ImagesList = () => {
    const theme = useTheme();
    const { images, loading, error, lastImageElementRef } = useImages();


    return (
        <>

            <Typography variant='h3' textAlign="center" margin="50px 0" color={theme.palette.secondary.main}>
                {' '}
                Images List With Infinte Scrolling
            </Typography>

            <Stack alignItems='center' spacing={5} width="100%" sx={{
                padding: '0 30%',
                [theme.breakpoints.down('md')]: {
                    padding: '0 10%',

                }
            }}>

                {images.map((image, index) => {
                    if (images.length === index + 1) {
                        return (
                            <Card sx={{ width: '100%', }} ref={lastImageElementRef}>
                                <CardMedia
                                    component='img'
                                    height='140'
                                    image={image.url}
                                    alt={image.title}
                                    loading='lazy'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div' textAlign="center">
                                        {image.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    } else {
                        return (
                            <Card sx={{ width: '100%', }}>
                                <CardMedia
                                    component='img'
                                    height='140'
                                    image={image.url}
                                    alt={image.title}
                                    loading='lazy'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div' textAlign="center">
                                        {image.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    }
                })}

            </Stack>
            {loading && (
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                    sx={{ margin: '50px 0 !important' }}
                >
                    <CircularProgress color='success' />
                </Stack>
            )}

            {error && (
                <Typography textAlign='center' color={theme.palette.error.main}>
                    Error
                </Typography>
            )}
        </>
    );
}

export default ImagesList