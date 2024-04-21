import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { addAddress, getLoggedUserAddresses, removeAddress } from '../controllers/address.contorllers';
import { addAddressValidator, removeAddressValidator } from '../validations/address.validator';
const router = Router();

router.use(authenticate, authorize('user'));

router.route('/').post(addAddressValidator, addAddress).get(getLoggedUserAddresses);
router.delete('/:addressId', removeAddressValidator, removeAddress);

export default router;
