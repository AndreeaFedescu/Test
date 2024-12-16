<?php
class ValidationProduct
{
    const MANDATORY_PARAMETERS = [
        'name',
        'price',
        'description',
        'category_id'
    ];

    const NUMBER_PARAMETERS = [
        'price'
    ];

    private $errors = [];

    /**
     * @param array $data
     * @return bool
     */
    public function isValid(array $data): bool
    {
        $isValid = true;
        foreach (self::MANDATORY_PARAMETERS as $parameter) {
            if ($this->isRequired($data, $parameter) == false) {
                $this->errors[] = 'Missing parameter ' . $parameter.'.';
                $isValid = false;
            }
        }

        foreach (self::NUMBER_PARAMETERS as $parameter) {
            //$this->errors[] = 'a:'.$this->isNumeric($data, $parameter).':a';

            if($this->isNumeric($data, $parameter) == false) {
                $this->errors[] = 'Invalid price for parameter '.$parameter.'.';
                $isValid = false;
            }
       }

        return $isValid;
    }

    /**
     * @return array
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * @param array $data
     * @param $field
     * @return bool
     */
    private function isRequired(array $data, $field): bool
    {
        return isset($data[$field]) && trim($data[$field]) !== '';
    }

    /**
     * @param array $data
     * @param $field
     * @return bool
     */
    private function isNumeric(array $data, $field): bool
    {
        if (empty($data[$field])) {
            return false;
        }

        return filter_var($data[$field], FILTER_VALIDATE_FLOAT);
    }
}


