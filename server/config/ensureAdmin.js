import User from '../models/User.js';
import { hashPassword } from '../utils/hash.js';

/**
 * Makes the configured administrator available on a new database without
 * changing an existing account (including its password or role).
 */
const ensureAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || 'Library Admin';

  if (!email || !password) {
    console.warn(' Admin account was not initialized: ADMIN_EMAIL or ADMIN_PASSWORD is missing.');
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return;

  await User.create({
    name,
    email,
    password: await hashPassword(password),
    role: 'admin',
    isVerified: true
  });

  console.log(` Admin account created for ${email}`);
};

export default ensureAdmin;
