import express from 'express';
import appRoutes from './routes';
import AppError from './utils/AppError';
import handleErrors from './middlewares/error.middleware';
import httpLoggerMiddleware from './middlewares/logger.middleware';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// serve static files
app.use(express.static(`${__dirname}/../public`));
app.use(express.static(`${__dirname}/../uploads`));

// set the view engine to Pug
// app.set('view engine', 'pug');
// app.set('views', `${__dirname}/views`);

const allowedOrigins = ['http://localhost:5173', 'https://www.dandrepairshop.com', 'https://dandrepairshop.com'];
const corsOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middlewares
// Set security HTTP headers
app.use(helmet());

// Limit requests from same IP
const limiter = rateLimit({
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many Requests from this IP, please try again in an hour!',
});
app.use(limiter);

// Body, Cookie parser, reading data from request into req.body, req.cookies
app.use(express.json({ limit: '300kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS, make sure this comes before any routes
app.use(xss());

// Prevent parameter pollution by removing duplicate query strings. NOTE: it will accept the last query of the duplicate ones
app.use(
  hpp({
    whitelist: ['price'], // allowed query stings to be duplicated
  }),
);

// Logger
app.use(httpLoggerMiddleware);

// Routes
app.use('/', appRoutes);

//404 Not-Found Routes
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(handleErrors);

export default app;
