interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  profileImg?: string;
  role: 'user' | 'admin';
  active: boolean | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  emailVerificationToken: string | undefined;
  refreshToken: string | undefined;
  passwordChangedAt: Date | number;
  passwordResetToken: string | undefined;
  passwordResetTokenExpires: Date | undefined;
  __v: number | undefined;
  comparePassword(plain: string, hashed: string): Promise<boolean>;
  passwordChangedAfter(jwtTimestamp: number): boolean;
  createPasswordResetToken(): Promise<string>;
}

export default User;
