import mongoose from 'mongoose';
import moment from 'dayjs';

const Schema = mongoose.Schema;

const SignRecordSchema = new Schema({
  uid: { type: String, ref: 'users' },
  created: { type: Date },
  favs: { type: Number, default: 0 }
});

SignRecordSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss');
  next();
});

SignRecordSchema.statics = {
  findByUid: function (uid) {
    return this.findOne({ uid }).sort({ created: -1 });
  }
};

const SignRecord = mongoose.model('sign_record', SignRecordSchema);

export default SignRecord;
