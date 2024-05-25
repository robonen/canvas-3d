/*
* Matrix multiplication
* C = A * B
*/
void matrix_mul(double *A, double *B, double *C, unsigned m, unsigned n, unsigned p)
{
    unsigned i, j, k;

    for (i = 0; i < m; i++)
    {
        for (j = 0; j < p; j++)
        {
            C[i * p + j] = 0;

            for (k = 0; k < n; k++)
            {
                C[i * p + j] += A[i * n + k] * B[k * p + j];
            }
        }
    }
}
