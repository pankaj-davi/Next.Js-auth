import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

export interface ProductType {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const ProductCard = ({ id, title, price, thumbnail }: ProductType) => {

    return (
        <Card key={id} sx={{ maxWidth: 250, borderRadius: 2, boxShadow: 3, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={thumbnail}
                    alt={title}
                    sx={{ borderRadius: '15px 15px 0 0', width: '100%' }}
                />
                <CardContent sx={{ textAlign: 'center', padding: '10px 15px' }}>
                    <Typography variant="h6" component="div" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                        {title.length < 20 ? title : `${title.slice(0, 17)}...`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Price: <strong>${price}</strong>
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            View More
                        </Button>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductCard;
