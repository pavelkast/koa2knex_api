/* global User */

export default {
  async getByFullName(ctx) {
    const params = ctx.query;

    const firstName = params.first_name;
    const lastName = params.last_name;

    if (_.isNil(firstName) || _.isNil(lastName)) {
      ctx.body = { success : false };
      return;
    }

    let result = await User.findOneByFullName(firstName, lastName);
    if (_.isNil(result)) result = { success : false };
    ctx.body = result;
  }
}
