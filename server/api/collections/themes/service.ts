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
    const theme = await UserTheme.findOne({
      where: {
        ownerId: userId,
      },
    });
    return theme.id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
