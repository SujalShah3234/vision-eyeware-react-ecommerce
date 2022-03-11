import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Snackbar,
  Skeleton,
  Alert,
  Slide,
  CardActionArea,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { addItem } from '../../redux/cart/cart.actions';
import styles from './collection-item.module.css';
import { useNavigate } from 'react-router-dom';

export const CollectionItem = ({ item }) => {
  const [state, setState] = useState(false);
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  setTimeout(() => {
    setItems(item);
  }, 2000);

  const TransitionLeft = (props) => {
    return <Slide {...props} direction='left' />;
  };

  const onAddItem = () => {
    dispatch(addItem(item));
    setState(true);
  };

  const handleClose = () => {
    setState(false);
  };

  const handleViewMoreDetails = () => {
    console.log(item);
    navigate(`${item.id}`, item);
  };

  return (
    <>
      <Card className={styles['item-card']} variant='outlined'>
        <CardActionArea onClick={handleViewMoreDetails}>
          {items ? (
            <CardMedia
              component='img'
              width='100%'
              image={items.imageUrl}
              alt={items.name}
            />
          ) : (
            <Skeleton
              className={styles['item-card-media']}
              animation='wave'
              variant='rectangular'
            />
          )}
          <CardContent>
            {items ? (
              <>
                <Typography gutterBottom variant='h5' component='div'>
                  {items.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {new Intl.NumberFormat('en-IN', {
                    currency: 'INR',
                    style: 'currency',
                    maximumFractionDigits: 0,
                  }).format(items.price) + '/-'}
                </Typography>
              </>
            ) : (
              <>
                <Skeleton
                  animation='wave'
                  height={10}
                  className={styles['skeleton-text']}
                />
                <Skeleton animation='wave' height={10} width='80%' />
              </>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          {items ? (
            <Button
              className={styles['add-to-cart']}
              onClick={onAddItem}
              size='small'
              fullWidth
              color='secondary'
              variant='outlined'
              startIcon={<AddShoppingCartIcon />}
            >
              Add to cart
            </Button>
          ) : (
            <Skeleton
              variant='rectangular'
              animation='wave'
              height={22}
              width={109}
              className={styles['skeleton-button']}
            />
          )}
        </CardActions>
      </Card>
      <Snackbar
        autoHideDuration={2000}
        open={state}
        onClose={handleClose}
        key={Math.random()}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='success'>1 item added to cart.</Alert>
      </Snackbar>
    </>
  );
};

export default CollectionItem;
