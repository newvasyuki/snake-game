import { UserTheme } from '../../../../db/models/userTheme';

export const setThemeForUser = async (
  themeId: number,
  themeDescription: string,
  userId: number,
) => {
  return UserTheme.upsert({
    id: themeId,
    theme: themeDescription,
    ownerId: userId,
  });
};

export const getThemeForUser = async (userId: number) => {
  try {
    const theme = await UserTheme.findAll({
      where: {
        ownerId: userId,
      },
    });
    if (theme.length !== 1) {
      throw new Error('No themes or more than one theme is found for a user');
    }
    return theme[0].id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
