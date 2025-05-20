import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/common/enums/roles.enum';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: String,
  })
  username: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;
  @Prop({
    required: false,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({ type: String, default: null })
  refreshToken: string | null;

  @Prop({ type: String, default: null })
  sessionId: string | null;

  // can use timestamp: true in Schema decorator to auto create created_at and updated_at
  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now, onUpdate: Date.now })
  updated_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});
