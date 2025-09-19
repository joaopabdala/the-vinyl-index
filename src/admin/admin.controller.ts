import { UseGuards, Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('admin') // Agrupa no Swagger
@ApiBearerAuth('Authorization') // Informa que precisa de Bearer Token
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // Protege todas as rotas com JWT e Roles
export class AdminController {
  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obtém dados administrativos' })
  @ApiResponse({
    status: 200,
    description: 'Acesso autorizado como administrador',
  })
  @ApiResponse({ status: 401, description: 'Token ausente ou inválido' })
  @ApiResponse({
    status: 403,
    description: 'Acesso negado - usuário não é administrador',
  })
  getAdminData() {
    return { message: 'Bem-vindo, Admin!' };
  }
}
