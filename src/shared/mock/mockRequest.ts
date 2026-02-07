export const mockRequest = async <T>(
  data: T,
  delay = 1500,
): Promise<{ status: string; message: string; data: T }> => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  return {
    status: 'success',
    message: 'Mock response success',
    data: data,
  };
};
